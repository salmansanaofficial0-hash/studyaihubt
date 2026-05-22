import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, POSTS } from "@/data/posts";
import { PostCard } from "@/components/PostCard";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "All Articles — StudyAI Hub" },
      { name: "description", content: "Browse every article on StudyAI Hub: AI tools, study tips, productivity, business, and tech." },
      { property: "og:title", content: "All Articles — StudyAI Hub" },
      { property: "og:description", content: "Articles on AI tools, study tips and productivity for students." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
});

const SORT = ["Latest", "Most Popular", "Reading Time"] as const;
type Sort = (typeof SORT)[number];

function BlogPage() {
  const [tab, setTab] = useState<string>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("Latest");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    let list = [...POSTS];
    if (tab !== "All") list = list.filter((p) => p.category === tab);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.excerpt.toLowerCase().includes(s) ||
          p.tags.some((t) => t.toLowerCase().includes(s)),
      );
    }
    if (sort === "Latest") list.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "Most Popular") list.sort((a, b) => b.views - a.views);
    if (sort === "Reading Time") list.sort((a, b) => parseInt(a.readingTime) - parseInt(b.readingTime));
    return list;
  }, [tab, q, sort]);

  const tabs = ["All", ...CATEGORIES.map((c) => c.name)];
  const shown = filtered.slice(0, visible);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <p className="text-sm text-primary font-medium">Articles</p>
        <h1 className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">All Articles</h1>
        <p className="mt-2 text-muted-foreground">Everything we've written for students who actually want results.</p>
      </header>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary text-sm"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="px-3 py-2.5 rounded-lg bg-muted text-sm outline-none focus:ring-2 ring-primary"
        >
          {SORT.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setVisible(6); }}
            className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
              tab === t
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border hover:border-primary/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((p) => <PostCard key={p.id} post={p} />)}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-16">No articles match your search.</p>
      )}

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisible((v) => v + 6)}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
