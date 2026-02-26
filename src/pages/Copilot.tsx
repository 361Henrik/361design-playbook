import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useAuth } from "@/hooks/useAuth";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Loader2, Plus, Send, Sparkles, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };
type Session = { id: string; title: string; created_at: string; updated_at: string };

const COPILOT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/design-copilot`;

export default function CopilotPage() {
  const { activeWorkspace } = useWorkspace();
  const { user } = useAuth();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const workspaceId = activeWorkspace?.id;

  // Load sessions
  useEffect(() => {
    if (!workspaceId) return;
    setLoadingSessions(true);
    supabase
      .from("chat_sessions")
      .select("id, title, created_at, updated_at")
      .eq("workspace_id", workspaceId)
      .order("updated_at", { ascending: false })
      .then(({ data }) => {
        setSessions((data as Session[]) || []);
        setLoadingSessions(false);
      });
  }, [workspaceId]);

  // Load messages for active session
  useEffect(() => {
    if (!activeSessionId) {
      setMessages([]);
      return;
    }
    supabase
      .from("chat_messages")
      .select("role, content")
      .eq("session_id", activeSessionId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setMessages((data as Msg[]) || []);
      });
  }, [activeSessionId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startNewSession = useCallback(() => {
    setActiveSessionId(null);
    setMessages([]);
    setInput("");
    textareaRef.current?.focus();
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || !workspaceId || isStreaming) return;

    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    let assistantContent = "";
    const upsertAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      const resp = await fetch(COPILOT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          session_id: activeSessionId,
          message: text,
          workspace_id: workspaceId,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Unknown error" }));
        upsertAssistant(`⚠️ Error: ${err.error || "Failed to get response"}`);
        setIsStreaming(false);
        return;
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let receivedSessionId: string | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(jsonStr);

            // Check for session_id event
            if (parsed.session_id && !receivedSessionId) {
              receivedSessionId = parsed.session_id;
              if (!activeSessionId) {
                setActiveSessionId(receivedSessionId);
                // Add to sessions list
                setSessions((prev) => [
                  { id: receivedSessionId!, title: text.slice(0, 60), created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
                  ...prev,
                ]);
              }
              continue;
            }

            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            // partial JSON
          }
        }
      }
    } catch (err) {
      console.error("Copilot stream error:", err);
      upsertAssistant("⚠️ Connection error. Please try again.");
    } finally {
      setIsStreaming(false);
    }
  }, [input, workspaceId, activeSessionId, isStreaming]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <PageHeader
        title="Design Copilot"
        description="Ask design questions — answers grounded in your tokens, components, and guidelines."
      />

      <div className="flex flex-1 min-h-0 gap-0 border border-border rounded-lg overflow-hidden mt-4">
        {/* Session sidebar */}
        <div className="w-64 shrink-0 border-r border-border bg-muted/30 flex flex-col">
          <div className="p-3 border-b border-border">
            <Button onClick={startNewSession} variant="outline" size="sm" className="w-full gap-2">
              <Plus className="h-3.5 w-3.5" /> New Chat
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {loadingSessions ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              ) : sessions.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-8 px-2">
                  No conversations yet. Start a new chat!
                </p>
              ) : (
                sessions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-body truncate transition-colors ${
                      activeSessionId === s.id
                        ? "bg-primary/10 text-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <MessageSquare className="h-3 w-3 inline-block mr-2 shrink-0" />
                    {s.title}
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                  Design Copilot
                </h3>
                <p className="text-sm font-body text-muted-foreground max-w-md leading-relaxed">
                  Ask about your design system — colors, typography, components, guidelines.
                  Every answer is grounded in your workspace's actual tokens and rules.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
                  {[
                    "What color should I use for a CTA button?",
                    "Which font is used for headlines?",
                    "Can I use a gradient background?",
                    "How should I pair cards in a layout?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        textareaRef.current?.focus();
                      }}
                      className="text-left text-xs font-body text-muted-foreground border border-border rounded-md px-3 py-2 hover:bg-muted transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-3xl mx-auto">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 text-sm font-body ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-foreground"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-code:text-accent prose-code:bg-muted prose-code:px-1 prose-code:rounded">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isStreaming && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-border rounded-lg px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="max-w-3xl mx-auto flex gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your design system…"
                className="min-h-[44px] max-h-32 resize-none"
                rows={1}
                disabled={isStreaming}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                size="icon"
                className="shrink-0 h-11 w-11"
              >
                {isStreaming ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
