import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { Category, Post } from "./posts-types";

type DbPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  author_name: string;
  author_bio: string | null;
  author_avatar: string | null;
  cover_emoji: string | null;
  reading_time: number;
  views: number;
  likes: number;
  featured: boolean;
  popular: boolean;
  tags: string[];
  created_at: string;
  categories: { name: string; slug: string; color: string | null; emoji: string | null } | null;
};

function normalize(p: DbPost): Post {
  const cat = p.categories;
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    content: p.content ?? "",
    category: cat?.name ?? "General",
    categorySlug: cat?.slug ?? "general",
    categoryColor: cat?.color ?? "#6366F1",
    author: p.author_name,
    authorBio: p.author_bio ?? "",
    authorAvatar: p.author_avatar ?? p.author_name.slice(0, 2).toUpperCase(),
    date: p.created_at,
    readingTime: `${p.reading_time} min read`,
    readingMinutes: p.reading_time,
    views: p.views,
    likes: p.likes,
    tags: p.tags ?? [],
    featured: p.featured,
    popular: p.popular,
    emoji: p.cover_emoji ?? "📚",
  };
}

const POST_SELECT =
  "id, slug, title, excerpt, content, author_name, author_bio, author_avatar, cover_emoji, reading_time, views, likes, featured, popular, tags, created_at, categories(name, slug, color, emoji)";

export const getAllPosts = createServerFn({ method: "GET" }).handler(async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as unknown as DbPost[]).map(normalize);
});

export const getCategories = createServerFn({ method: "GET" }).handler(async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, emoji, color")
    .order("name");
  if (error) throw new Error(error.message);
  return (data ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description ?? "",
    emoji: c.emoji ?? "📁",
    color: c.color ?? "#6366F1",
  }));
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }): Promise<Post | null> => {
    const { data: row, error } = await supabase
      .from("posts")
      .select(POST_SELECT)
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;
    return normalize(row as unknown as DbPost);
  });

export const getPostsByCategorySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1).max(100) }).parse(input))
  .handler(async ({ data }): Promise<{ category: Category | null; posts: Post[] }> => {
    const { data: cat } = await supabase
      .from("categories")
      .select("id, name, slug, description, emoji, color")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!cat) return { category: null, posts: [] };

    const { data: rows, error } = await supabase
      .from("posts")
      .select(POST_SELECT)
      .eq("published", true)
      .eq("category_id", cat.id)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return {
      category: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description ?? "",
        emoji: cat.emoji ?? "📁",
        color: cat.color ?? "#6366F1",
      },
      posts: (rows as unknown as DbPost[]).map(normalize),
    };
  });

// ---- Mutations ----

export const incrementPostView = createServerFn({ method: "POST" })
  .inputValidator((input: { postId: string }) => z.object({ postId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
    const { data: cur } = await admin.from("posts").select("views").eq("id", data.postId).maybeSingle();
    if (!cur) return { ok: false };
    await admin.from("posts").update({ views: (cur.views ?? 0) + 1 }).eq("id", data.postId);
    return { ok: true };
  });

export const submitReaction = createServerFn({ method: "POST" })
  .inputValidator((input: { postId: string; reaction: "helpful" | "not_helpful"; sessionId: string }) =>
    z.object({
      postId: z.string().uuid(),
      reaction: z.enum(["helpful", "not_helpful"]),
      sessionId: z.string().min(8).max(128),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("post_reactions")
      .insert({ post_id: data.postId, reaction: data.reaction, session_id: data.sessionId });
    if (error && (error as { code?: string }).code !== "23505") throw new Error(error.message);
    return { ok: true };
  });

export const getReactionCounts = createServerFn({ method: "GET" })
  .inputValidator((input: { postId: string }) => z.object({ postId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabase
      .from("post_reactions")
      .select("reaction")
      .eq("post_id", data.postId);
    if (error) throw new Error(error.message);
    let yes = 0, no = 0;
    for (const r of rows ?? []) {
      if (r.reaction === "helpful") yes++;
      else if (r.reaction === "not_helpful") no++;
    }
    return { yes, no };
  });

export const submitComment = createServerFn({ method: "POST" })
  .inputValidator((input: { postId: string; name: string; email: string; message: string }) =>
    z.object({
      postId: z.string().uuid(),
      name: z.string().trim().min(1).max(100),
      email: z.string().trim().email().max(255),
      message: z.string().trim().min(1).max(2000),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { error } = await supabase.from("comments").insert({
      post_id: data.postId,
      name: data.name,
      email: data.email.toLowerCase(),
      message: data.message,
      approved: false,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getApprovedComments = createServerFn({ method: "GET" })
  .inputValidator((input: { postId: string }) => z.object({ postId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabase
      .from("comments")
      .select("id, name, message, created_at")
      .eq("post_id", data.postId)
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });
