import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 md:bottom-6 right-6 z-40 h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
