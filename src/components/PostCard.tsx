import { Link } from "@tanstack/react-router";
import type { Post } from "@/data/posts";
import { Clock, Eye } from "lucide-react";

export function PostCard({ post, size = "md" }: { post: Post; size?: "sm" | "md" | "lg" }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block rounded-2xl bg-card border border-border overflow-hidden hover-lift"
    >
      <div
        className="aspect-[16/9] flex items-center justify-center text-6xl"
        style={{
          backgroundImage: `linear-gradient(135deg, ${post.categoryColor}33, ${post.categoryColor}11)`,
        }}
        aria-hidden
      >
        <span>{post.emoji}</span>
      </div>
      <div className="p-5">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
          style={{ backgroundColor: `${post.categoryColor}22`, color: post.categoryColor }}
        >
          {post.category}
        </span>
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
  );
}

export function formatViews(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k views";
  return n + " views";
}
