import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Shield, Tag, Trash2, Plus, Users, Loader2, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type Profile = { id: string; email: string | null; display_name: string | null };
type UserRole = { id: string; user_id: string; role: string };
type TagEntry = { id: string; name: string; category: string | null };

const SettingsPage = () => {
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [emailDigest, setEmailDigest] = useState(true);

  // Role management
  const [profiles, setProfiles] = useState<(Profile & { roles: string[] })[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  // Tag management
  const [tags, setTags] = useState<TagEntry[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newTagCategory, setNewTagCategory] = useState("");
  const [loadingTags, setLoadingTags] = useState(false);

  const fetchProfiles = async () => {
    if (!isAdmin) return;
    setLoadingProfiles(true);
    const { data: profs } = await supabase.from("profiles").select("*");
    const { data: roles } = await supabase.from("user_roles").select("*");
    const merged = (profs || []).map((p: Profile) => ({
      ...p,
      roles: (roles || []).filter((r: UserRole) => r.user_id === p.id).map((r: UserRole) => r.role),
    }));
    setProfiles(merged);
    setLoadingProfiles(false);
  };

  const fetchTags = async () => {
    setLoadingTags(true);
    const { data } = await supabase.from("tag_vocabulary").select("*").order("name");
    setTags((data as TagEntry[]) || []);
    setLoadingTags(false);
  };

  useEffect(() => {
    fetchProfiles();
    fetchTags();
    // Load email digest preference
    if (user) {
      supabase.from("profiles").select("email_digest").eq("id", user.id).single()
        .then(({ data }) => { if (data) setEmailDigest(data.email_digest ?? true); });
    }
  }, [isAdmin, user]);

  const setRole = async (userId: string, role: string) => {
    // Remove existing roles then add new one
    await supabase.from("user_roles").delete().eq("user_id", userId);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: role as any });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Role updated" }); fetchProfiles(); }
  };

  const addTag = async () => {
    if (!newTag.trim()) return;
    const { error } = await supabase.from("tag_vocabulary").insert({ name: newTag.toLowerCase().trim(), category: newTagCategory || null });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { setNewTag(""); setNewTagCategory(""); fetchTags(); }
  };

  const deleteTag = async (id: string) => {
    const { error } = await supabase.from("tag_vocabulary").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchTags();
  };

  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content space-y-space-8">
      <PageHeader title="Settings" description="User management, roles, tags, and system configuration." />

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h3 font-display flex items-center gap-2"><Shield className="h-4 w-4" strokeWidth={1.5} />Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm font-body text-muted-foreground">Signed in as <strong>{user?.email}</strong></p>
          <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} /> Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* Role Management — Admin only */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="text-h3 font-display flex items-center gap-2"><Users className="h-4 w-4" strokeWidth={1.5} />User Roles</CardTitle>
            <CardDescription className="text-xs">Manage who can edit, approve, or just view the design system.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingProfiles ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
            ) : (
              <div className="space-y-3">
                {profiles.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 py-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-medium truncate">{p.display_name || p.email}</p>
                      <p className="text-[10px] text-muted-foreground font-body">{p.email}</p>
                    </div>
                    <Select
                      value={p.roles[0] || "viewer"}
                      onValueChange={(role) => setRole(p.id, role)}
                    >
                      <SelectTrigger className="w-[120px] text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge variant="bronze" className="text-[10px] font-mono">{p.roles[0] || "no role"}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Tag Vocabulary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h3 font-display flex items-center gap-2"><Tag className="h-4 w-4" strokeWidth={1.5} />Tag Vocabulary</CardTitle>
          <CardDescription className="text-xs">Manage the controlled vocabulary for tagging library entries.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add tag */}
          <div className="flex gap-2">
            <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Tag name" className="text-sm flex-1" />
            <Input value={newTagCategory} onChange={(e) => setNewTagCategory(e.target.value)} placeholder="Category (optional)" className="text-sm w-40" />
            <Button size="sm" onClick={addTag} className="gap-1"><Plus className="h-3.5 w-3.5" /> Add</Button>
          </div>

          {/* Tag list */}
          {loadingTags ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /></div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-1 bg-muted rounded px-2 py-1">
                  <span className="text-xs font-mono text-foreground">{tag.name}</span>
                  {tag.category && <span className="text-[10px] text-muted-foreground">({tag.category})</span>}
                  {isAdmin && (
                    <button onClick={() => deleteTag(tag.id)} className="ml-1 text-destructive/50 hover:text-destructive">
                      <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Email Digest */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Mail className="h-4 w-4" strokeWidth={1.5} />Weekly Digest</CardTitle>
          <CardDescription className="text-xs">Receive a weekly summary of design system activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="digest" className="text-sm font-body">Email digest</Label>
            <Switch
              id="digest"
              checked={emailDigest}
              onCheckedChange={async (checked) => {
                setEmailDigest(checked);
                if (user) {
                  await supabase.from("profiles").update({ email_digest: checked }).eq("id", user.id);
                  toast({ title: checked ? "Digest enabled" : "Digest disabled" });
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
