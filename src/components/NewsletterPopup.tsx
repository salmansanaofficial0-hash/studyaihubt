import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRouter, useRouterState } from "@tanstack/react-router";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate">("idle");
  const [error, setError] = useState("");
  const router = useRouter();
  const { location } = useRouterState();

  const isExcludedPage = ["/admin", "/newsletter-confirmed", "/bookmarks"].includes(location.pathname);

  useEffect(() => {
    if (isExcludedPage) {
      setIsOpen(false);
      return;
    }

    const isSubscribed = localStorage.getItem("studyai_subscribed") === "true";
    const dismissedAt = localStorage.getItem("studyai_popup_dismissed");
    
    if (isSubscribed) return;
    
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDays) {
        return;
      }
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isExcludedPage, location.pathname]);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("studyai_popup_dismissed", Date.now().toString());
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    setStatus("loading");

    try {
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({ email, source: "popup" });

      if (insertError) {
        if (insertError.code === "23505") {
          setStatus("duplicate");
          localStorage.setItem("studyai_subscribed", "true");
          setTimeout(() => {
            setIsOpen(false);
          }, 2000);
          return;
        }
        throw insertError;
      }

      setStatus("success");
      localStorage.setItem("studyai_subscribed", "true");
      
      setTimeout(() => {
        setIsOpen(false);
        router.navigate({ to: "/newsletter-confirmed" });
      }, 3000);
      
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  if (!isOpen || isExcludedPage) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={handleDismiss}>
      <div 
        className="relative w-full max-w-[480px] bg-card text-card-foreground p-8 rounded-2xl shadow-2xl border border-border flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="text-6xl mb-4">🤖</div>
        <h2 className="text-2xl font-bold mb-2 text-foreground">Wait — Get Free Weekly AI Tools</h2>
        <p className="text-muted-foreground mb-6">
          Join students getting the best AI tools and study tips every week. Free forever.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-4 animate-in fade-in zoom-in">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="font-medium text-lg text-foreground">🎉 You are in! Check your inbox.</p>
          </div>
        ) : status === "duplicate" ? (
          <div className="flex flex-col items-center justify-center py-4 animate-in fade-in zoom-in">
             <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <p className="font-medium text-lg text-foreground">You are already subscribed! 🎉</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <div>
              <input
                type="email"
                placeholder="your@university.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`w-full px-4 py-3 rounded-lg bg-background border ${error ? 'border-red-500' : 'border-input'} focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground`}
              />
              {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
            </div>
            
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
            
            <button
              type="button"
              onClick={handleDismiss}
              className="text-sm text-muted-foreground hover:text-foreground mt-2 transition-colors"
            >
              No thanks, I will figure it out myself
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
