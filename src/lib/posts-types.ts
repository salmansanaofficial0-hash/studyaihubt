// Shared post & category types used across components and server fns.

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  emoji: string;
  color: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  categoryColor: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  date: string; // ISO
  updatedAt: string; // ISO
  readingTime: string; // "8 min read"
  readingMinutes: number;
  views: number;
  likes: number;
  tags: string[];
  featured: boolean;
  popular: boolean;
  emoji: string;
};
