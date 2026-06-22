import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Admin | StudyAI Hub" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
  source: string | null;
  active: boolean | null;
};

function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setSubscribers([]);
      return;
    }

    async function loadSubscribers() {
      setFetchLoading(true);
      setFetchError(null);
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("id, email, subscribed_at, source, active")
        .order("subscribed_at", { ascending: false });

      if (error) {
        setFetchError(error.message);
        setSubscribers([]);
      } else {
        setSubscribers(data ?? []);
      }
      setFetchLoading(false);
    }

    loadSubscribers();
  }, [user]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setAuthLoading(false);
    if (error) setAuthError(error.message);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSubscribers([]);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-muted-foreground">Loading admin...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in with your Supabase admin account.</p>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background"
            />
          </div>
          {authError && <p className="text-sm text-destructive">{authError}</p>}
          <button
            type="submit"
            disabled={authLoading}
            className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-60"
          >
            {authLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Signed in as {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md border border-border text-sm hover:bg-muted"
        >
          Sign out
        </button>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-4">
          <div>
            <h2 className="text-lg font-semibold">Subscribers</h2>
            <p className="text-sm text-muted-foreground">
              Total: <span className="font-semibold text-foreground">{subscribers.length}</span>
            </p>
          </div>
        </div>

        {fetchLoading && <p className="text-sm text-muted-foreground">Loading subscribers...</p>}
        {fetchError && <p className="text-sm text-destructive">{fetchError}</p>}

        {!fetchLoading && !fetchError && (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium">Subscribed</th>
                  <th className="text-left px-4 py-3 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                      No subscribers yet.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((s) => (
                    <tr key={s.id} className="border-t border-border">
                      <td className="px-4 py-3">{s.email}</td>
                      <td className="px-4 py-3">{formatDate(s.subscribed_at)}</td>
                      <td className="px-4 py-3">{s.source || "website"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
