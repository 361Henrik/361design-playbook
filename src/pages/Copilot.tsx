import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useAuth } from "@/hooks/useAuth";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Plus, Send, Sparkles, MessageSquare, FileText } from "lucide-react";
import { ReviewUploadDialog } from "@/components/copilot/ReviewUploadDialog";
import { ReviewProgress } from "@/components/copilot/ReviewProgress";
import ReactMarkdown from "react-markdown";
import { toast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };
type Session = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  session_type?: string;
  source_id?: string | null;
};

const COPILOT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/design-copilot`;
const REVIEW_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/design-review`;
const EXTRACT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/extract-source`;

export default function CopilotPage() {
  const { activeWorkspace } = useWorkspace();
  const { user } = useAuth();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [reviewSourceId, setReviewSourceId] = useState<string | null>(null);
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);
  const [reviewSource, setReviewSource] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const workspaceId = activeWorkspace?.id;
  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const isReviewSession = activeSession?.session_type === "review";

  // Load sessions
  useEffect(() => {
    if (!workspaceId) return;
    setLoadingSessions(true);
    supabase
      .from("chat_sessions")
      .select("id, title, created_at, updated_at, session_type, source_id")
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

  // Poll source status for review sessions
  useEffect(() => {
    if (!reviewSourceId) {
      if (pollingRef.current) clearInterval(pollingRef.current);
      return;
    }

    const poll = async () => {
      const { data } = await supabase
        .from("sources")
        .select("status, pages_processed, total_pages, error_message")
        .eq("id", reviewSourceId)
        .single();

      if (!data) return;
      setReviewSource(data);
      setReviewStatus(data.status);

      if (data.status === "completed") {
        // Extraction done — run review audit
        if (pollingRef.current) clearInterval(pollingRef.current);
        setReviewStatus("reviewing");
        await runReviewAudit(reviewSourceId);
      } else if (data.status === "partial") {
        // Auto-continue chunking
        const session = await supabase.auth.getSession();
        const accessToken = session.data.session?.access_token;
        await fetch(EXTRACT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            source_id: reviewSourceId,
            continue_from: (data.pages_processed || 0) * 8000,
          }),
        });
      } else if (data.status === "failed" || data.status === "not_relevant") {
        if (pollingRef.current) clearInterval(pollingRef.current);
      }
    };

    pollingRef.current = setInterval(poll, 2000);
    poll();

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [reviewSourceId]);

  const runReviewAudit = async (sourceId: string) => {
    try {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      const resp = await fetch(REVIEW_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          source_id: sourceId,
          session_id: activeSessionId,
          workspace_id: workspaceId,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Review failed" }));
        toast({ title: "Review failed", description: err.error, variant: "destructive" });
      }

      // Reload messages to show the review result
      setReviewSourceId(null);
      setReviewStatus(null);
      if (activeSessionId) {
        const { data } = await supabase
          .from("chat_messages")
          .select("role, content")
          .eq("session_id", activeSessionId)
          .order("created_at", { ascending: true });
        setMessages((data as Msg[]) || []);
      }
    } catch (e) {
      console.error("Review audit error:", e);
      toast({ title: "Review error", description: "Failed to run review audit.", variant: "destructive" });
      setReviewSourceId(null);
      setReviewStatus(null);
    }
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startNewSession = useCallback(() => {
    setActiveSessionId(null);
    setMessages([]);
    setInput("");
    setReviewSourceId(null);
    setReviewStatus(null);
    textareaRef.current?.focus();
  }, []);

  const handleReviewUpload = async (title: string, file: File) => {
    if (!workspaceId || !user) return;

    // 1. Upload file to sources bucket
    const filePath = `${workspaceId}/${Date.now()}_${file.name}`;
    const { error: uploadErr } = await supabase.storage.from("sources").upload(filePath, file);
    if (uploadErr) {
      toast({ title: "Upload failed", description: uploadErr.message, variant: "destructive" });
      throw uploadErr;
    }

    // 2. Create sources row
    const fileType = file.name.endsWith(".pdf") ? "pdf" : file.name.endsWith(".md") || file.name.endsWith(".markdown") ? "markdown" : "text";
    const { data: source, error: sourceErr } = await supabase
      .from("sources")
      .insert({
        title,
        file_type: fileType,
        file_url: filePath,
        workspace_id: workspaceId,
        uploaded_by: user.id,
        status: "pending",
      })
      .select("id")
      .single();
    if (sourceErr || !source) {
      toast({ title: "Error", description: "Failed to create source record.", variant: "destructive" });
      throw sourceErr;
    }

    // 3. Create review chat session
    const { data: newSession, error: sessionErr } = await supabase
      .from("chat_sessions")
      .insert({
        workspace_id: workspaceId,
        user_id: user.id,
        title: `Review: ${title}`,
        session_type: "review",
        source_id: source.id,
      } as any)
      .select("id, title, created_at, updated_at, session_type, source_id")
      .single();

    if (sessionErr || !newSession) {
      toast({ title: "Error", description: "Failed to create review session.", variant: "destructive" });
      throw sessionErr;
    }

    setSessions((prev) => [newSession as Session, ...prev]);
    setActiveSessionId(newSession.id);
    setReviewSourceId(source.id);
    setReviewStatus("pending");

    // 4. Kick off extraction
    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;
    fetch(EXTRACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: JSON.stringify({ source_id: source.id }),
    });
  };

  const handleRetry = async () => {
    if (!reviewSourceId) return;
    setReviewStatus("pending");
    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;
    fetch(EXTRACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: JSON.stringify({ source_id: reviewSourceId }),
    });
    // Re-enable polling
    setReviewSourceId((prev) => {
      // Force re-trigger the effect
      return prev;
    });
  };

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

            if (parsed.session_id && !receivedSessionId) {
              receivedSessionId = parsed.session_id;
              if (!activeSessionId) {
                setActiveSessionId(receivedSessionId);
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

  // Determine if we should show the review progress overlay
  const showReviewProgress = isReviewSession && reviewStatus && reviewStatus !== "completed" && messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <PageHeader
        title="Design Copilot"
        description="Ask design questions — answers grounded in your tokens, components, and guidelines."
      />

      <div className="flex flex-1 min-h-0 gap-0 border border-border rounded-lg overflow-hidden mt-4">
        {/* Session sidebar */}
        <div className="w-64 shrink-0 border-r border-border bg-muted/30 flex flex-col">
          <div className="p-3 border-b border-border space-y-2">
            <Button onClick={startNewSession} variant="outline" size="sm" className="w-full gap-2">
              <Plus className="h-3.5 w-3.5" /> New Chat
            </Button>
            <Button onClick={() => setShowUpload(true)} variant="outline" size="sm" className="w-full gap-2">
              <FileText className="h-3.5 w-3.5" /> Review Document
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
                    onClick={() => {
                      setActiveSessionId(s.id);
                      setReviewSourceId(null);
                      setReviewStatus(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-body truncate transition-colors ${
                      activeSessionId === s.id
                        ? "bg-primary/10 text-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {s.session_type === "review" ? (
                      <FileText className="h-3 w-3 inline-block mr-2 shrink-0" />
                    ) : (
                      <MessageSquare className="h-3 w-3 inline-block mr-2 shrink-0" />
                    )}
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
            {showReviewProgress ? (
              <ReviewProgress
                status={reviewStatus!}
                pagesProcessed={reviewSource?.pages_processed}
                totalPages={reviewSource?.total_pages}
                errorMessage={reviewSource?.error_message}
                onRetry={handleRetry}
                onForceExtract={() => {
                  // Force extraction by calling extract-source again
                  handleRetry();
                }}
              />
            ) : messages.length === 0 ? (
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
                placeholder={isReviewSession ? "Ask follow-up questions about this review…" : "Ask about your design system…"}
                className="min-h-[44px] max-h-32 resize-none"
                rows={1}
                disabled={isStreaming || !!showReviewProgress}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming || !!showReviewProgress}
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

      <ReviewUploadDialog
        open={showUpload}
        onOpenChange={setShowUpload}
        onSubmit={handleReviewUpload}
      />
    </div>
  );
}
