import { Link } from "@tanstack/react-router";
import { ArrowRight, Trophy, Star } from "lucide-react";

export function ToolOfTheWeek() {
  const tool = {
    name: "Google NotebookLM",
    emoji: "📓",
    description:
      "Upload your lecture notes and textbooks, then chat with them like ChatGPT. The most underused free AI tool for university students in 2025.",
    url: "https://notebooklm.google.com",
    category: "Research & Study",
    stats: [
      { label: "Price", value: "Free" },
      { label: "Best for", value: "Exam prep" },
      { label: "Rating", value: "4.9 / 5" },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-sm text-primary font-medium">Featured this week</p>
          <h2 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">Tool of the Week</h2>
        </div>
        <Link to="/ai-tools" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          See all tools <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-12">
        <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold shadow">
          <Trophy className="h-3.5 w-3.5" /> Editor's Pick
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-brand text-white inline-flex items-center justify-center text-5xl shrink-0">
            {tool.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl md:text-3xl font-extrabold">{tool.name}</h3>
            <p className="text-sm text-primary font-medium mt-1">{tool.category}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">{tool.description}</p>

            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
              {tool.stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-background/60 border border-border p-3 text-center">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{s.label}</p>
                  <p className="mt-1 font-bold text-sm inline-flex items-center justify-center gap-1">
                    {s.label === "Rating" && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-transform"
              >
                Try Free <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/ai-tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border font-semibold hover:bg-muted transition-colors"
              >
                More Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
