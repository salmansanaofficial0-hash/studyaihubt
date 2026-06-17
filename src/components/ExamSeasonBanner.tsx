import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, X } from "lucide-react";

export function ExamSeasonBanner() {
  const month = new Date().getMonth();
  const isExamSeason = [4, 5, 10, 11].includes(month);
  const storageKey = `exam_banner_dismissed_${month}`;
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(storageKey);
  });

  if (!isExamSeason || dismissed) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5 flex items-center gap-4">
        <CalendarDays className="h-6 w-6 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold">Exam season is here</p>
          <p className="text-sm text-muted-foreground">Emergency study guides and AI tools to maximize your marks.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/category/$slug"
            params={{ slug: "study-tips" }}
            className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-transform"
          >
            Study Guides →
          </Link>
          <button
            onClick={() => {
              setDismissed(true);
              localStorage.setItem(storageKey, "1");
            }}
            aria-label="Dismiss banner"
            className="h-8 w-8 rounded-md inline-flex items-center justify-center text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
