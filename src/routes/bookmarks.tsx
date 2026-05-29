import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark as BookmarkIcon, Trash2 } from "lucide-react";
import { useBookmarks } from "@/lib/bookmarks";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Saved Articles | StudyAI Hub" },
      { name: "description", content: "Your bookmarked StudyAI Hub articles — saved on this device for later reading." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const { items, remove } = useBookmarks();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-medium">
          <BookmarkIcon className="h-3.5 w-3.5" /> Saved on this device
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">Your Saved Articles</h1>
        <p className="mt-2 text-muted-foreground">
          Bookmarks are stored locally in your browser. Clear browser data and they're gone.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <BookmarkIcon className="h-10 w-10 mx-auto text-muted-foreground" />
          <p className="mt-4 font-semibold">No saved articles yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Tap the bookmark icon on any article to save it here.</p>
          <Link to="/blog" className="mt-6 inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
            Browse articles
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map((b) => (
            <li key={b.slug} className="group p-5 rounded-2xl border border-border bg-card flex gap-4 items-start">
              <div
                className="h-16 w-16 rounded-xl flex items-center justify-center text-3xl shrink-0"
                style={{ backgroundImage: `linear-gradient(135deg, ${b.categoryColor}33, ${b.categoryColor}11)` }}
              >
                {b.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                  style={{ backgroundColor: `${b.categoryColor}22`, color: b.categoryColor }}
                >
                  {b.category}
                </span>
                <Link
                  to="/blog/$slug"
                  params={{ slug: b.slug }}
                  className="mt-2 block font-bold hover:text-primary line-clamp-2"
                >
                  {b.title}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Saved {new Date(b.savedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => remove(b.slug)}
                aria-label="Remove bookmark"
                className="h-9 w-9 rounded-md bg-muted hover:bg-destructive hover:text-destructive-foreground inline-flex items-center justify-center transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
