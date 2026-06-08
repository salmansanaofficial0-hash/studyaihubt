import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/newsletter";

const STORAGE_KEY = "studyaihub:newsletter-popup";

export function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "subscribed" || stored === "dismissed") return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 30000);

    function onMouseOut(e: MouseEvent) {
      if (!armed) return;
      if (e.clientY <= 10 && !e.relatedTarget) {
        setShow(true);
        cleanup();
      }
    }
    function onTimeoutShow() {
      // Mobile fallback: show after 60s if user hasn't dismissed
      setShow(true);
      cleanup();
    }
    const fallbackTimer = window.setTimeout(onTimeoutShow, 60000);

    function cleanup() {
      window.clearTimeout(armTimer);
      window.clearTimeout(fallbackTimer);
      document.removeEventListener("mouseout", onMouseOut);
    }

    document.addEventListener("mouseout", onMouseOut);
    return cleanup;
  }, []);

  function dismiss() {
    setShow(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "dismissed");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    const result = await subscribeToNewsletter(email, "exit-intent-popup");
    if (result.ok) {
      setStatus("success");
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, "subscribed");
        window.location.href = "/newsletter-confirmed";
      }
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong. Try again.");
    }
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 h-8 w-8 rounded-full hover:bg-muted inline-flex items-center justify-center text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-bold">You're in!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Check your inbox for a welcome email from StudyAI Hub.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-brand text-white mb-3">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 id="newsletter-popup-title" className="text-xl sm:text-2xl font-bold">
                Wait! Get free weekly AI tools
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Join 10,000+ students getting the best AI tools and study tips every week. Free forever. Unsubscribe anytime.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@university.edu"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-gradient-brand text-white font-semibold py-2.5 text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing..." : "Get Free Weekly Tips →"}
              </button>
              {status === "error" && (
                <p className="text-xs text-red-500 text-center">{errorMsg}</p>
              )}
              <button
                type="button"
                onClick={dismiss}
                className="block w-full text-center text-xs text-muted-foreground hover:text-foreground"
              >
                No thanks, I don't want free AI tips
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
