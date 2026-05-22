import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, Clock, Eye, ChevronRight, Twitter, Facebook, Linkedin, Link as LinkIcon, ThumbsUp, ThumbsDown } from "lucide-react";
import { CATEGORIES, POSTS, postBySlug } from "@/data/posts";
import { ArticleBody, TableOfContents, extractHeadings } from "@/components/Article";
import { ReadingProgress } from "@/components/ReadingProgress";
import { PostCard } from "@/components/PostCard";
import { Toast, useToast } from "@/components/Toast";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.title} | StudyAI Hub` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${p.slug}` },
        { property: "article:author", content: p.author },
        { property: "article:published_time", content: p.date },
        { property: "article:section", content: p.category },
      ],
      links: [{ rel: "canonical", href: `/blog/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            author: { "@type": "Person", name: p.author },
            keywords: p.tags.join(", "),
          }),
        },
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Post not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-primary underline">Back to blog</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Couldn't load this post</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);
  const { msg, show } = useToast();
  const [helpful, setHelpful] = useState<{ yes: number; no: number; voted: "yes" | "no" | null }>({ yes: 42, no: 3, voted: null });
  const related = POSTS.filter((p) => p.categorySlug === post.categorySlug && p.id !== post.id).slice(0, 3);
  const url = typeof window !== "undefined" ? window.location.href : `/blog/${post.slug}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(url); show("Link copied!"); } catch { show("Couldn't copy"); }
  };

  return (
    <>
      <ReadingProgress />
      <article className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/blog" className="hover:text-foreground">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/category/$slug" params={{ slug: post.categorySlug }} className="hover:text-foreground">{post.category}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate max-w-[220px]">{post.title}</span>
          </nav>

          <header className="mt-6 max-w-4xl">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${post.categoryColor}22`, color: post.categoryColor }}
            >
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-9 w-9 rounded-full bg-gradient-brand text-white inline-flex items-center justify-center text-xs font-bold">
                  {post.authorAvatar}
                </span>
                <span className="font-medium">By {post.author}</span>
              </div>
              <span className="text-muted-foreground inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(post.date)}</span>
              <span className="text-muted-foreground inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readingTime}</span>
              <span className="text-muted-foreground inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{post.views.toLocaleString()} views</span>
            </div>

            <div className="mt-6 flex gap-2">
              <ShareBtn href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`} I={Twitter} label="Twitter" />
              <ShareBtn href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} I={Facebook} label="Facebook" />
              <ShareBtn href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} I={Linkedin} label="LinkedIn" />
              <button onClick={copy} className="h-9 w-9 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center transition-colors" aria-label="Copy link">
                <LinkIcon className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            <div>
              <div
                className="aspect-[16/8] rounded-2xl flex items-center justify-center text-8xl mb-10"
                style={{ backgroundImage: `linear-gradient(135deg, ${post.categoryColor}33, ${post.categoryColor}11)` }}
              >
                {post.emoji}
              </div>

              <ArticleBody content={post.content} />

              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs bg-muted font-mono">#{t}</span>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-card border border-border">
                <p className="font-semibold">Was this helpful?</p>
                <div className="mt-3 flex gap-3">
                  <button
                    disabled={!!helpful.voted}
                    onClick={() => setHelpful((h) => ({ ...h, yes: h.yes + 1, voted: "yes" }))}
                    className={`px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 border ${helpful.voted === "yes" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                  >
                    <ThumbsUp className="h-4 w-4" /> Yes · {helpful.yes}
                  </button>
                  <button
                    disabled={!!helpful.voted}
                    onClick={() => setHelpful((h) => ({ ...h, no: h.no + 1, voted: "no" }))}
                    className={`px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 border ${helpful.voted === "no" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                  >
                    <ThumbsDown className="h-4 w-4" /> No · {helpful.no}
                  </button>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-card border border-border flex gap-4 items-start">
                <span className="h-14 w-14 rounded-full bg-gradient-brand text-white inline-flex items-center justify-center font-bold shrink-0">
                  {post.authorAvatar}
                </span>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-xs text-muted-foreground">Author</p>
                  <p className="mt-2 text-sm">{post.authorBio}</p>
                  <div className="mt-3 flex gap-2">
                    <a href="#" className="text-xs text-primary hover:underline">Twitter</a>
                    <a href="#" className="text-xs text-primary hover:underline">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-8 lg:sticky lg:top-24 self-start">
              <TableOfContents headings={headings} />

              <div className="rounded-2xl border border-border p-5 bg-gradient-brand text-white">
                <p className="font-semibold">Free weekly digest</p>
                <p className="mt-1 text-xs text-white/85">AI tools and study tips, every Friday.</p>
                <form onSubmit={(e) => { e.preventDefault(); show("Subscribed!"); }} className="mt-3 flex flex-col gap-2">
                  <input type="email" required placeholder="your@email.com" className="px-3 py-2 rounded-md bg-white/15 placeholder:text-white/70 text-white text-sm outline-none" />
                  <button className="px-3 py-2 rounded-md bg-white text-primary text-sm font-semibold">Subscribe</button>
                </form>
              </div>

              <div>
                <p className="text-sm font-semibold mb-3">Popular in {post.category}</p>
                <ul className="space-y-3">
                  {POSTS.filter((p) => p.categorySlug === post.categorySlug && p.id !== post.id).slice(0, 4).map((p) => (
                    <li key={p.id}>
                      <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-sm hover:text-primary line-clamp-2">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-dashed border-border p-6 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Advertisement</p>
                <div className="mt-3 h-40 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  AdSense slot
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-extrabold tracking-tight mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => <PostCard key={p.id} post={p} />)}
              </div>
            </section>
          )}
        </div>
      </article>
      {msg && <Toast message={msg} />}
    </>
  );
}

function ShareBtn({ href, I, label }: { href: string; I: typeof Twitter; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      className="h-9 w-9 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center transition-colors"
    >
      <I className="h-4 w-4" />
    </a>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

void CATEGORIES;
