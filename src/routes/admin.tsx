import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Glamupbykirthi" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Message = {
  id: string; name: string; email: string; phone: string | null;
  service: string | null; message: string; created_at: string;
};

function AdminPage() {
  const [session, setSession] = useState<unknown>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) {
        supabase.from("user_roles").select("role").eq("user_id", s.user.id).eq("role", "admin").maybeSingle()
          .then(({ data }) => setIsAdmin(!!data));
      } else { setIsAdmin(false); }
    });
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        else setMessages((data ?? []) as Message[]);
      });
  }, [isAdmin]);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
  }

  async function logout() { await supabase.auth.signOut(); }

  if (loading) return <div className="p-10 text-center text-muted-foreground">Loading…</div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-soft px-5">
        <form onSubmit={login} className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-luxury space-y-4">
          <h1 className="font-display text-3xl text-center"><span className="text-gradient-gold">Admin</span> Login</h1>
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
          <input name="password" type="password" required placeholder="Password" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
          <button className="w-full rounded-full bg-gradient-luxury px-6 py-3 text-sm text-primary-foreground">Sign in</button>
          <p className="text-xs text-muted-foreground text-center">Admin access only.</p>
        </form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-10 text-center">
        <p>Your account doesn't have admin access.</p>
        <button onClick={logout} className="rounded-full bg-gradient-luxury px-6 py-2 text-sm text-primary-foreground">Sign out</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <h1 className="font-display text-2xl"><span className="text-gradient-gold">Glamupbykirthi</span> Admin</h1>
          <button onClick={logout} className="text-sm text-primary hover:underline">Sign out</button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="font-display text-3xl">Inquiries ({messages.length})</h2>
        <div className="mt-6 space-y-3">
          {messages.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
          {messages.map((m) => (
            <article key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="font-medium">{m.name} <span className="text-muted-foreground">· {m.email}</span></div>
                  {m.phone && <div className="text-sm text-muted-foreground">{m.phone}</div>}
                </div>
                <div className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
              </div>
              {m.service && <div className="mt-1 text-xs uppercase tracking-widest text-primary">{m.service}</div>}
              <p className="mt-3 text-sm whitespace-pre-wrap">{m.message}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
