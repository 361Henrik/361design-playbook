import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const [forgotMode, setForgotMode] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName || email.split("@")[0] },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created", description: "Check your email to confirm, then sign in." });
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: "Enter your email", description: "Type your email address above first.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: "Reset failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "A password reset link has been sent." });
      setForgotMode(false);
      navigate("/reset-password");
    }
    setLoading(false);
  };

  const benefits = [
    "Browse tokens and patterns with live previews",
    "Run guided reviews backed by brand guardrails",
    "Export production-ready code for any channel",
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel — Branded Intro */}
      <section
        className="
          bg-deep-green text-cream
          flex flex-col justify-center
          px-space-5 py-space-7
          md:px-space-8 md:py-space-8
          lg:w-1/2 lg:px-space-9 lg:py-space-9
          animate-in fade-in slide-in-from-left-4 duration-500
        "
      >
        {/* Logo */}
        <p className="font-display text-body-lg tracking-headline opacity-80 mb-space-5 lg:mb-space-7">
          The Curated Lens
        </p>

        {/* Headline */}
        <h1 className="font-display text-display leading-hero tracking-headline font-medium mb-space-4">
          Your Design System.
          <br className="hidden md:block" />
          {" "}Defined. Applied.
        </h1>

        {/* Subhead — hidden on mobile */}
        <p className="font-body text-body-lg leading-reading opacity-90 max-w-prose mb-space-5 lg:mb-space-7 hidden md:block">
          The single source of truth for design tokens, rules, components, and interactive guidance.
        </p>

        {/* Bronze accent line */}
        <div className="w-12 h-px bg-bronze mb-space-5 lg:mb-space-7 hidden md:block" />

        {/* Benefit bullets — hidden on mobile */}
        <ul className="space-y-space-3 hidden md:block">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-space-3 font-body text-body leading-reading text-cream/90">
              <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-bronze shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        {/* Mobile-only tagline */}
        <p className="font-body text-body-sm opacity-80 md:hidden">
          Design tokens, components &amp; guardrails — one&nbsp;place.
        </p>
      </section>

      {/* Right Panel — Auth Form */}
      <main className="flex-1 flex items-center justify-center bg-card px-space-5 py-space-8 lg:py-0 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="w-full max-w-sm">
          {/* Inner card container */}
          <div className="rounded-lg border border-border bg-background p-space-6 md:p-space-7">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-space-6">
                <TabsTrigger value="login" className="font-body text-label">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="font-body text-label">Create Account</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-space-5">
                  <div className="space-y-space-2">
                    <Label className="text-label font-body">Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" />
                  </div>
                  <div className="space-y-space-2">
                    <Label className="text-label font-body">Password</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12" />
                  </div>
                  <Button type="submit" className="w-full font-body font-medium" size="lg" disabled={loading}>
                    {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Sign In
                  </Button>
                  <div className="flex flex-col items-center gap-space-2 pt-space-2">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-caption font-body text-muted-foreground hover:text-bronze transition-colors duration-ui"
                    >
                      Forgot password?
                    </button>
                    <Link to="/help" className="text-caption font-body text-muted-foreground hover:text-bronze transition-colors duration-ui">
                      Need help?
                    </Link>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-space-5">
                  <div className="space-y-space-2">
                    <Label className="text-label font-body">Display Name</Label>
                    <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Optional" className="h-12" />
                  </div>
                  <div className="space-y-space-2">
                    <Label className="text-label font-body">Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" />
                  </div>
                  <div className="space-y-space-2">
                    <Label className="text-label font-body">Password</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-12" />
                  </div>
                  <Button type="submit" className="w-full font-body font-medium" size="lg" disabled={loading}>
                    {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Create Account
                  </Button>
                  <div className="flex justify-center pt-space-2">
                    <Link to="/help" className="text-caption font-body text-muted-foreground hover:text-bronze transition-colors duration-ui">
                      Need help?
                    </Link>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
