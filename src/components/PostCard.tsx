import { memo } from "react";
import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/posts-types";
import { Clock, Eye, Flame, Sparkles, Zap } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DifficultyBadge } from "@/components/DifficultyBadge";


function isNewPost(iso: string) {
  const ts = new Date(iso).getTime();
  if (!ts) return false;
  return Date.now() - ts <= 14 * 24 * 60 * 60 * 1000;
}

function PostCardImpl({ post, size = "md" }: { post: Post; size?: "sm" | "md" | "lg" }) {
  const trending = post.views > 2000;
  const fresh = isNewPost(post.date);
  const quickRead = post.readingMinutes > 0 && post.readingMinutes <= 5;

  return (
    <article className="group relative rounded-2xl bg-card border border-border overflow-hidden hover-lift">
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {trending && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow">
            <Flame className="h-3 w-3" /> Trending
          </span>
        )}
        {fresh && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow">
            <Sparkles className="h-3 w-3" /> New
          </span>
        )}
        {quickRead && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow">
            <Zap className="h-3 w-3" /> Quick Read
          </span>
        )}
      </div>
      <div className="absolute top-3 right-3 z-10">
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
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="block"
        aria-label={`Read: ${post.title}`}
      >
        <div
          className="aspect-[16/9] flex items-center justify-center text-6xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${post.categoryColor}33, ${post.categoryColor}11)`,
          }}
          role="img"
          aria-label={`${post.category} article illustration`}
        >
          <span aria-hidden>{post.emoji}</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
              style={{ backgroundColor: `${post.categoryColor}22`, color: post.categoryColor }}
            >
              {post.category}
            </span>
            <DifficultyBadge level={post.difficulty} />
          </div>
          <h3 className={`mt-3 font-bold leading-snug group-hover:text-primary transition-colors ${size === "lg" ? "text-xl" : "text-base"}`}>
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-gradient-brand text-[10px] text-white inline-flex items-center justify-center font-semibold">
                {post.authorAvatar}
              </span>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime}</span>
              <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{formatViews(post.views)}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export const PostCard = memo(PostCardImpl);

export function formatViews(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k views";
  return n + " views";
}
