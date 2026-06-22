import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, Eye, ChevronRight, Twitter, Facebook, Linkedin, Link as LinkIcon, ThumbsUp, ThumbsDown, MessageCircle, ArrowLeft } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ArticleBody, TableOfContents, extractHeadings } from "@/components/Article";
import { ReadingProgress } from "@/components/ReadingProgress";
import { PostCard } from "@/components/PostCard";
import { Toast, useToast } from "@/components/Toast";
import { AIAssistant } from "@/components/AIAssistant";
import { BookmarkButton } from "@/components/BookmarkButton";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { PostSidebarNewsletter } from "@/components/PostSidebarNewsletter";
import {
  getPostBySlug,
  getAllPosts,
  incrementPostView,
  submitReaction,
  getReactionCounts,
  submitComment,
  getApprovedComments,
} from "@/lib/posts.functions";
import type { Post } from "@/lib/posts-types";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }): Promise<{ post: Post; allPosts: Post[] }> => {
    const [post, allPosts] = await Promise.all([
      getPostBySlug({ data: { slug: params.slug } }),
      getAllPosts(),
    ]);
    if (!post) throw notFound();
    return { post, allPosts };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    const ogImage = "https://studyaihub.tech/og-image.svg";
    const shortTitle = `${p.title} | StudyAI Hub`;
    const excerptDesc = p.excerpt && p.excerpt.length > 155 ? p.excerpt.substring(0, 152) + "..." : p.excerpt;
    return {
      meta: [
        { title: shortTitle },
        { name: "description", content: excerptDesc },
        { property: "og:title", content: shortTitle },
        { property: "og:description", content: excerptDesc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://studyaihub.tech/blog/${p.slug}` },
        { property: "og:image", content: ogImage },
        { property: "article:author", content: p.author },
        { property: "article:published_time", content: p.date },
        { property: "article:section", content: p.category },
        ...p.tags.map(tag => ({ property: "article:tag", content: tag })),
        { name: "twitter:title", content: shortTitle },
        { name: "twitter:description", content: excerptDesc },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: `https://studyaihub.tech/blog/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: excerptDesc,
            image: [ogImage],
            datePublished: p.date,
            dateModified: p.date,
            inLanguage: "en",
            mainEntityOfPage: `https://studyaihub.tech/blog/${p.slug}`,
            articleSection: p.category,
            keywords: p.tags.join(", "),
            author: {
              "@type": "Person",
              name: p.author,
            },
            publisher: { "@id": "https://studyaihub.tech/#organization" },
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

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr-placeholder-id";
  let id = localStorage.getItem("studyai_sid");
  if (!id) {
    id = crypto.randomUUID().replace(/-/g, "");
    localStorage.setItem("studyai_sid", id);
  }
  return id;
}

type CommentRow = { id: string; name: string; message: string; created_at: string };

function BlogPost() {
  const { post, allPosts } = Route.useLoaderData() as { post: Post; allPosts: Post[] };
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);
  const { msg, show } = useToast();
  const related = allPosts.filter((p) => p.categorySlug === post.categorySlug && p.id !== post.id).slice(0, 3);
  const sidebarPopular = allPosts.filter((p) => p.categorySlug === post.categorySlug && p.id !== post.id).slice(0, 4);
  const alsoRead = allPosts
    .filter((p) => p.id !== post.id && p.categorySlug !== post.categorySlug)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);
  const url = typeof window !== "undefined" ? window.location.href : `/blog/${post.slug}`;

  const incView = useServerFn(incrementPostView);
  const react = useServerFn(submitReaction);
  const fetchReactions = useServerFn(getReactionCounts);
  const postComment = useServerFn(submitComment);
  const fetchComments = useServerFn(getApprovedComments);

  const [counts, setCounts] = useState<{ yes: number; no: number }>({ yes: 0, no: 0 });
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cMsg, setCMsg] = useState("");
  const [cSubmitting, setCSubmitting] = useState(false);

  useEffect(() => {
    incView({ data: { postId: post.id } }).catch(() => {});
    fetchReactions({ data: { postId: post.id } }).then(setCounts).catch(() => {});
    fetchComments({ data: { postId: post.id } }).then((rows) => setComments(rows as CommentRow[])).catch(() => {});
    const stored = typeof window !== "undefined" ? localStorage.getItem(`vote:${post.id}`) : null;
    if (stored === "yes" || stored === "no") setVoted(stored);
  }, [post.id, incView, fetchReactions, fetchComments]);

  async function vote(kind: "yes" | "no") {
    if (voted) return;
    setVoted(kind);
    setCounts((c) => ({ ...c, [kind]: c[kind] + 1 }));
    if (typeof window !== "undefined") localStorage.setItem(`vote:${post.id}`, kind);
    try {
      await react({ data: { postId: post.id, reaction: kind === "yes" ? "helpful" : "not_helpful", sessionId: getSessionId() } });
    } catch { /* ignore */ }
  }

  async function onSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    setCSubmitting(true);
    try {
      await postComment({ data: { postId: post.id, name: cName, email: cEmail, message: cMsg } });
      show("Comment submitted! It'll appear after review.");
      setCName(""); setCEmail(""); setCMsg("");
    } catch (err) {
      show(err instanceof Error ? err.message : "Couldn't post comment");
    } finally {
      setCSubmitting(false);
    }
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(url); show("Link copied!"); } catch { show("Couldn't copy"); }
  };

  return (
    <>
      <ReadingProgress />
      <article className="pt-20 md:pt-24 relative">
        <div
          className="absolute top-0 inset-x-0 h-[420px] -z-10 pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${post.categoryColor}22 0%, transparent 100%)` }}
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
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
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${post.categoryColor}22`, color: post.categoryColor }}>
                {post.category}
              </span>
              <DifficultyBadge level={post.difficulty} size="md" />
            </div>
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
              <UpdatedBadge updatedAt={post.updatedAt} createdAt={post.date} />
            </div>

            <div className="mt-6 flex gap-2">
              <ShareBtn href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`} I={Twitter} label="Twitter" />
              <ShareBtn href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} I={Facebook} label="Facebook" />
              <ShareBtn href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} I={Linkedin} label="LinkedIn" />
              <ShareBtn href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + url)}`} I={MessageCircle} label="WhatsApp" />
              <button onClick={copy} className="h-9 w-9 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center transition-colors" aria-label="Copy link">
                <LinkIcon className="h-4 w-4" />
              </button>
              <BookmarkButton
                post={{
                  slug: post.slug,
                  title: post.title,
                  excerpt: post.excerpt,
                  emoji: post.emoji,
                  category: post.category,
                  categorySlug: post.categorySlug,
                  categoryColor: post.categoryColor,
                }}
              />
            </div>
          </header>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            <div>
              <div className="aspect-[16/8] rounded-2xl flex items-center justify-center text-8xl mb-10" style={{ backgroundImage: `linear-gradient(135deg, ${post.categoryColor}33, ${post.categoryColor}11)` }}>
                {post.emoji}
              </div>

              <KeyTakeaways content={post.content} />
              <ArticleBody content={post.content} />

              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs bg-muted font-mono">#{t}</span>
                ))}
              </div>

              <AIAssistant title={post.title} content={post.content} />



              <div className="mt-10 p-6 rounded-2xl bg-card border border-border">
                <p className="font-semibold">Was this helpful?</p>
                <div className="mt-3 flex gap-3">
                  <button
                    disabled={!!voted}
                    onClick={() => vote("yes")}
                    className={`px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 border ${voted === "yes" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                  >
                    <ThumbsUp className="h-4 w-4" /> Yes · {counts.yes}
                  </button>
                  <button
                    disabled={!!voted}
                    onClick={() => vote("no")}
                    className={`px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 border ${voted === "no" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                  >
                    <ThumbsDown className="h-4 w-4" /> No · {counts.no}
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
                </div>
              </div>

              <section className="mt-10">
                <h2 className="text-xl font-extrabold tracking-tight">Comments ({comments.length})</h2>
                <form onSubmit={onSubmitComment} className="mt-4 p-5 rounded-2xl border border-border bg-card space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input required maxLength={100} value={cName} onChange={(e) => setCName(e.target.value)} placeholder="Your name" className="px-3 py-2 rounded-md bg-muted text-sm outline-none focus:ring-2 ring-primary" />
                    <input required type="email" maxLength={255} value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder="your@email.com" className="px-3 py-2 rounded-md bg-muted text-sm outline-none focus:ring-2 ring-primary" />
                  </div>
                  <textarea required maxLength={2000} value={cMsg} onChange={(e) => setCMsg(e.target.value)} placeholder="Share your thoughts..." rows={3} className="w-full px-3 py-2 rounded-md bg-muted text-sm outline-none focus:ring-2 ring-primary" />
                  <button disabled={cSubmitting} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-70">
                    {cSubmitting ? "Posting..." : "Post comment"}
                  </button>
                  <p className="text-xs text-muted-foreground">Comments are reviewed before publishing.</p>
                </form>

                <ul className="mt-6 space-y-4">
                  {comments.map((c) => (
                    <li key={c.id} className="p-4 rounded-xl border border-border">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{c.name}</p>
                        <span className="text-xs text-muted-foreground">{formatDate(c.created_at)}</span>
                      </div>
                      <p className="mt-2 text-sm whitespace-pre-wrap">{c.message}</p>
                    </li>
                  ))}
                  {comments.length === 0 && <p className="text-sm text-muted-foreground">Be the first to comment.</p>}
                </ul>
              </section>
            </div>

            <aside className="space-y-8 lg:sticky lg:top-24 self-start">
              <TableOfContents headings={headings} />

              <PostSidebarNewsletter slug={post.slug} />

              <div>
                <p className="text-sm font-semibold mb-3">Popular in {post.category}</p>
                <ul className="space-y-3">
                  {sidebarPopular.map((p) => (
                    <li key={p.id}>
                      <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-sm hover:text-primary line-clamp-2">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
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

          {alsoRead.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-extrabold tracking-tight mb-6">Students Also Read</h2>
              <div className="flex gap-5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-3 snap-x snap-mandatory">
                {alsoRead.map((p) => (
                  <div key={p.id} className="snap-start shrink-0 w-[280px] sm:w-[300px]">
                    <PostCard post={p} />
                  </div>
                ))}
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
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`} className="h-9 w-9 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center transition-colors">
      <I className="h-4 w-4" />
    </a>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function UpdatedBadge({ updatedAt, createdAt }: { updatedAt: string; createdAt: string }) {
  const iso = updatedAt || createdAt;
  const daysSince = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  const isRecent = daysSince <= 14;
  const cls = isRecent
    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    : "border-border bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs border ${cls}`}>
      🔄 Updated {formatDate(iso)}
    </span>
  );
}
