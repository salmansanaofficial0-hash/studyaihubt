import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PostCard } from "@/components/PostCard";
import { getPostsByCategorySlug } from "@/lib/posts.functions";
import type { Category, Post } from "@/lib/posts-types";

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ params }): Promise<{ category: Category; posts: Post[] }> => {
    const res = await getPostsByCategorySlug({ data: { slug: params.slug } });
    if (!res.category) throw notFound();
    return { category: res.category, posts: res.posts };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    if (!c) return {};
    return {
      meta: [
        { title: `${c.name} — StudyAI Hub` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} — StudyAI Hub` },
        { property: "og:description", content: c.description },
        { property: "og:url", content: `https://studyaihub.tech/category/${c.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://studyaihub.tech/category/${c.slug}` }],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Category not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-primary underline">Browse all posts</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function CategoryPage() {
  const { category, posts } = Route.useLoaderData() as { category: Category; posts: Post[] };
  return (
    <div>
      <section
        className="relative py-16 md:py-24"
        style={{ backgroundImage: `linear-gradient(135deg, ${category.color}cc, ${category.color}66)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <nav className="text-xs flex items-center gap-1.5 text-white/80" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link to="/blog" className="hover:text-white">Categories</Link>
            <span>›</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <div className="mt-4 flex items-start gap-5">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-white/15 backdrop-blur inline-flex items-center justify-center text-4xl sm:text-5xl shrink-0">
              {category.emoji}
            </div>
            <div className="min-w-0">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{category.name}</h1>
              <p className="mt-3 max-w-2xl text-white/90">{category.description}</p>
              <span className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur text-sm font-medium">
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">No posts yet in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
