import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Clock } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { getAllPosts, getCategories } from "@/lib/posts.functions";
import type { Post, Category } from "@/lib/posts-types";

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>) => ({
    search: typeof search.search === "string" ? search.search : "",
  }),
  loader: async (): Promise<{ posts: Post[]; categories: Category[] }> => {
    const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
    return { posts, categories };
  },
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "All Articles — StudyAI Hub" },
      { name: "description", content: "Browse every article on StudyAI Hub: AI tools, study tips, productivity, business, and tech." },
      { property: "og:title", content: "All Articles — StudyAI Hub" },
      { property: "og:description", content: "Articles on AI tools, study tips and productivity for students." },
      { property: "og:url", content: "https://studyaihub.tech/blog" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihub.tech/blog" }],
  }),
  errorComponent: ({ error }) => (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Couldn't load articles</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

const SORT = ["Latest", "Most Popular", "Reading Time"] as const;
type Sort = (typeof SORT)[number];

function BlogPage() {
  const { posts, categories } = Route.useLoaderData() as { posts: Post[]; categories: Category[] };
  const { search: searchParam } = Route.useSearch();
  const [tab, setTab] = useState<string>("All");
  const [q, setQ] = useState(searchParam || "");
  const [sort, setSort] = useState<Sort>("Latest");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    let list = [...posts];
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
    if (sort === "Reading Time") list.sort((a, b) => a.readingMinutes - b.readingMinutes);
    return list;
  }, [posts, tab, q, sort]);

  const tabs = ["All", ...categories.map((c) => c.name)];
  const shown = filtered.slice(0, visible);
  const avgRead = posts.length
    ? Math.round(posts.reduce((s, p) => s + p.readingMinutes, 0) / posts.length)
    : 0;
  const SUGGESTIONS = [
    "ChatGPT prompts", "SWOT analysis", "Pomodoro", "time management",
    "Excel tips", "presentation skills", "exam preparation", "AI tools free",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-sm text-primary font-medium">Articles</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">All Articles</h1>
          <p className="mt-2 text-muted-foreground">Everything we've written for students who actually want results.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground self-start md:self-end">
          <Clock className="h-3.5 w-3.5" /> {posts.length} articles · avg {avgRead} min read
        </div>
      </header>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary text-sm" />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="px-3 py-2.5 rounded-lg bg-muted text-sm outline-none focus:ring-2 ring-primary">
          {SORT.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setVisible(6); }}
            className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
              tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
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
        <div className="text-center py-20 max-w-md mx-auto">
          <div className="text-7xl mb-4" aria-hidden>🔍</div>
          <h2 className="text-xl font-bold">No posts found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find articles matching <span className="font-medium text-foreground">"{q}"</span>.
            Try a broader keyword like <button onClick={() => setQ("AI")} className="text-primary underline">"AI"</button>,
            <button onClick={() => setQ("study")} className="text-primary underline ml-1">"study"</button>, or
            <button onClick={() => setQ("productivity")} className="text-primary underline ml-1">"productivity"</button>.
          </p>
          <button
            onClick={() => { setQ(""); setTab("All"); }}
            className="mt-6 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button onClick={() => setVisible((v) => v + 6)} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
