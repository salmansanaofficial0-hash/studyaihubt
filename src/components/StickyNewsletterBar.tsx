import { useEffect, useState } from "react";
import { X, Mail } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/newsletter";

export function StickyNewsletterBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      !!localStorage.getItem("newsletter_bar_dismissed") ||
      !!localStorage.getItem("newsletter_subscribed")
    );
  });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      if (window.scrollY > 600) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const res = await subscribeToNewsletter(email, "sticky_bar");
    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
      localStorage.setItem("newsletter_subscribed", "true");
      setTimeout(() => setVisible(false), 3000);
    }
  }

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem("newsletter_bar_dismissed", "1");
  }

  if (!visible || dismissed) return null;

  return (
    <div className="fixed left-0 right-0 bottom-16 md:bottom-0 z-40 px-3 pb-3 md:pb-4">
      <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-brand text-white shadow-2xl px-4 py-3 flex items-center gap-3 flex-wrap">
        {submitted ? (
          <p className="font-medium flex-1 text-center">🎉 Subscribed! Check your inbox.</p>
        ) : (
          <>
            <Mail className="h-5 w-5 shrink-0 hidden sm:block" />
            <p className="font-semibold text-sm flex-1 min-w-0">Free weekly AI tools & study tips</p>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 min-w-[220px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-md bg-white/15 backdrop-blur placeholder:text-white/70 text-white text-sm outline-none focus:ring-2 ring-white min-w-0"
              />
              <button
                disabled={loading}
                className="px-4 py-2 rounded-md bg-white text-primary text-sm font-semibold disabled:opacity-70 whitespace-nowrap"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="h-8 w-8 rounded-md inline-flex items-center justify-center hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
