import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { TOOLS } from "@/data/tools";

export const Route = createFileRoute("/ai-tools")({
  component: AIToolsPage,
  head: () => ({
    meta: [
      { title: "Best Free AI Tools for Students 2025 | StudyAI Hub" },
      { name: "description", content: "Curated directory of the best AI tools for university students: writing, research, presentations and productivity." },
      { property: "og:title", content: "Best Free AI Tools for Students 2025 | StudyAI Hub" },
      { property: "og:description", content: "Free and paid AI tools, reviewed for university students." },
      { property: "og:url", content: "https://studyaihub.tech/ai-tools" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihub.tech/ai-tools" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": TOOLS.slice(0, 6).map((t, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": t.name,
            "url": t.url
          }))
        }),
      },
    ],
  }),
});

const FILTERS = ["All", "Free", "Paid", "Writing", "Research", "Presentations", "Productivity"] as const;

function AIToolsPage() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");

  const tools = useMemo(() => {
    if (f === "All") return TOOLS;
    if (f === "Free") return TOOLS.filter((t) => t.pricing === "Free" || t.pricing === "Freemium");
    if (f === "Paid") return TOOLS.filter((t) => t.pricing === "Paid");
    return TOOLS.filter((t) => t.category === f);
  }, [f]);

  return (
    <div>
      <section className="bg-gradient-brand text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-sm opacity-90 font-medium">Directory</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl">
            The Best AI Tools for Students in 2025
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Hand-picked, student-tested. Filter by pricing or category to find what you need.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium backdrop-blur">
            ✨ Last updated June 2025
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((x) => (
            <button
              key={x}
              onClick={() => setF(x)}
              className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
                f === x ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
              }`}
            >
              {x}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((t) => (
            <div key={t.name} className="rounded-2xl bg-card border border-border p-5 hover-lift flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-12 w-12 rounded-xl bg-muted inline-flex items-center justify-center text-2xl">{t.emoji}</span>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.category}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  t.pricing === "Free" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" :
                  t.pricing === "Paid" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" :
                  "bg-primary/15 text-primary"
                }`}>{t.pricing}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground flex-1">{t.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "fill-current" : "opacity-30"}`} />
                  ))}
                </div>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary"
                  title={`Click to visit ${t.name}`}
                >
                  Visit Tool <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
