import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Search, Sparkles, Star, Users, BookOpen, Clock, Eye } from "lucide-react";
import { TOOLS } from "@/data/tools";
import { PostCard, formatViews } from "@/components/PostCard";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { getAllPosts, getCategories } from "@/lib/posts.functions";
import type { Post, Category } from "@/lib/posts-types";

export const Route = createFileRoute("/")({
  loader: async (): Promise<{ posts: Post[]; categories: Category[] }> => {
    const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
    return { posts, categories };
  },
  component: HomePage,
  head: () => ({
    meta: [
      { title: "AI Tools & Study Tips for University Students | StudyAI Hub" },
      { name: "description", content: "Discover the best AI tools, study strategies, and productivity hacks built for university students. Honest reviews, real workflows, no hype." },
      { property: "og:title", content: "AI Tools & Study Tips for University Students" },
      { property: "og:description", content: "Honest reviews of ChatGPT, Claude, Gemini and Perplexity — plus study workflows that actually work." },
      { property: "og:url", content: "https://studyaihubt.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihubt.lovable.app/" }],
  }),
  errorComponent: ({ error }) => (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Couldn't load the homepage</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function HomePage() {
  const { posts, categories } = Route.useLoaderData();
  return (
    <>
      <Hero categories={categories} />
      <Stats />
      <FeaturedCategories categories={categories} posts={posts} />
      <FeaturedPosts posts={posts} />
      <PopularPosts posts={posts} />
      <ToolsSpotlight />
      <NewsletterCTA />
      <Testimonials />
    </>
  );
}

function Hero({ categories }: { categories: Category[] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-brand animate-gradient-shift opacity-90" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" /> New: 10 best AI tools of 2025
        </div>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-4xl">
          Study Smarter With AI — <span className="text-white/90 italic">Not Harder.</span>
        </h1>
        <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl">
          Discover the best AI tools, study strategies, and productivity hacks built for university students.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/ai-tools" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-primary font-semibold hover:scale-[1.02] transition-transform">
            Explore AI Tools <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/40 hover:bg-white/10 font-semibold transition-colors">
            Read Latest Posts
          </Link>
        </div>
        <HeroSearch />
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.slice(0, 4).map((c) => (
            <a key={c.slug} href="#categories" className="px-3 py-1.5 rounded-full text-sm bg-white/15 hover:bg-white/25 backdrop-blur transition-colors">
              {c.emoji} {c.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const v = q.trim();
        if (v) navigate({ to: "/blog", search: { search: v } as never });
      }}
      className="mt-8 flex items-center gap-2 max-w-xl bg-white/15 backdrop-blur border border-white/25 rounded-full pl-4 pr-1.5 py-1.5"
      role="search"
    >
      <Search className="h-4 w-4 text-white/80" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search articles, tools, study tips..."
        aria-label="Search articles"
        className="flex-1 bg-transparent outline-none text-white placeholder:text-white/70 text-sm py-2"
      />
      <button type="submit" className="px-4 py-2 rounded-full bg-white text-primary text-sm font-semibold hover:scale-[1.02] transition-transform">
        Search
      </button>
    </form>
  );
}


function Stats() {
  const items = [
    { I: Sparkles, label: "AI Tools Reviewed", value: "50+" },
    { I: Users, label: "Students Helped", value: "10,000+" },
    { I: BookOpen, label: "Study Guides", value: "100+" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.label} className="glass rounded-2xl p-5 flex items-center gap-4">
            <span className="h-12 w-12 rounded-xl bg-gradient-brand text-white inline-flex items-center justify-center">
              <it.I className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-bold">{it.value}</p>
              <p className="text-xs text-muted-foreground">{it.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedCategories({ categories, posts }: { categories: Category[]; posts: Post[] }) {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <SectionHeader title="What Do You Need Help With?" subtitle="Browse by topic" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => {
          const count = posts.filter((p) => p.categorySlug === c.slug).length;
          return (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group rounded-2xl bg-card border border-border p-6 hover-lift">
              <div className="flex items-start justify-between">
                <span className="h-12 w-12 rounded-xl inline-flex items-center justify-center text-2xl" style={{ backgroundColor: `${c.color}22` }}>
                  {c.emoji}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{count} posts</span>
              </div>
              <h3 className="mt-4 font-bold group-hover:text-primary transition-colors">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedPosts({ posts }: { posts: Post[] }) {
  const featured = posts.filter((p) => p.featured).slice(0, 3);
  if (featured.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <SectionHeader title="Fresh From the Blog" subtitle="Our latest deep dives" linkTo="/blog" linkLabel="All posts" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((p) => <PostCard key={p.id} post={p} size="lg" />)}
      </div>
    </section>
  );
}

function PopularPosts({ posts }: { posts: Post[] }) {
  const popular = posts.filter((p) => p.popular).slice(0, 4);
  if (popular.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <SectionHeader title="Students Are Reading This" subtitle="Most popular this month" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {popular.map((p) => (
          <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="flex gap-4 rounded-2xl bg-card border border-border p-4 hover-lift">
            <div className="shrink-0 h-24 w-24 rounded-xl flex items-center justify-center text-4xl" style={{ backgroundImage: `linear-gradient(135deg, ${p.categoryColor}33, ${p.categoryColor}11)` }}>
              {p.emoji}
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-medium" style={{ color: p.categoryColor }}>{p.category}</span>
              <h3 className="font-semibold leading-snug line-clamp-2">{p.title}</h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{formatViews(p.views)}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.readingTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ToolsSpotlight() {
  const top = TOOLS.slice(0, 8);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <SectionHeader title="Top AI Tools This Week" subtitle="Tested by real students" linkTo="/ai-tools" linkLabel="See all tools" />
      <div className="flex overflow-x-auto gap-4 no-scrollbar -mx-4 px-4 pb-2 snap-x snap-mandatory">
        {top.map((t) => (
          <div key={t.name} className="snap-start shrink-0 w-72 rounded-2xl bg-card border border-border p-5 hover-lift">
            <div className="flex items-center gap-3">
              <span className="h-11 w-11 rounded-xl bg-muted inline-flex items-center justify-center text-2xl">{t.emoji}</span>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.category} · {t.pricing}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{t.description}</p>
            <a href={t.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Try Free <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <section className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-brand text-white p-8 md:p-14 overflow-hidden relative">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-extrabold">Get Weekly AI Tools & Study Tips — Free</h2>
            <p className="mt-3 text-white/85">Join 10,000+ students getting smarter every week.</p>
            {ok ? (
              <p className="mt-6 text-lg font-medium">🎉 You're in! Check your inbox.</p>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setErr(null);
                  setLoading(true);
                  const res = await subscribeToNewsletter(email, "home_cta");
                  setLoading(false);
                  if (res.ok) { setOk(true); setEmail(""); }
                  else setErr(res.error || "Something went wrong.");
                }}
                className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg"
              >
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-lg bg-white/15 backdrop-blur text-white placeholder:text-white/70 outline-none focus:ring-2 ring-white" />
                <button disabled={loading} className="px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:scale-[1.02] transition-transform disabled:opacity-70">
                  {loading ? "Subscribing..." : "Subscribe Free"}
                </button>
              </form>
            )}
            {err && <p className="mt-3 text-sm text-white">{err}</p>}
            <p className="mt-3 text-xs text-white/70">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Mahnoor Iqbal", role: "BBA, IBA Karachi", initials: "MI", color: "#EC4899", quote: "These guides genuinely changed my finals strategy. The Pomodoro article alone saved my semester." },
    { name: "Hassan Raza", role: "CS, FAST NUCES", initials: "HR", color: "#6366F1", quote: "The AI tools roundup is the most honest one I've read — no sponsored fluff. Notion AI workflow is gold." },
    { name: "Areeba Tariq", role: "MBBS, Aga Khan University", initials: "AT", color: "#10B981", quote: "I forwarded the time-management article to my whole study group. Simple, real, no productivity-bro nonsense." },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <SectionHeader title="Loved by Students Across Campuses" subtitle="Real words, real students" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((t) => (
          <div key={t.name} className="rounded-2xl bg-card border border-border p-6">
            <div className="flex gap-0.5 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="h-10 w-10 rounded-full text-white inline-flex items-center justify-center font-bold text-sm" style={{ background: t.color }}>
                {t.initials}
              </span>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle, linkTo, linkLabel }: { title: string; subtitle?: string; linkTo?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {subtitle && <p className="text-sm text-primary font-medium">{subtitle}</p>}
        <h2 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
      </div>
      {linkTo && (
        <Link to={linkTo} className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
