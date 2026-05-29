import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks, type Bookmark as B } from "@/lib/bookmarks";

export function BookmarkButton({
  post,
  variant = "icon",
  className = "",
}: {
  post: Omit<B, "savedAt">;
  variant?: "icon" | "full";
  className?: string;
}) {
  const { isSaved, toggle } = useBookmarks();
  const saved = isSaved(post.slug);

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(post);
  };

  if (variant === "full") {
    return (
      <button
        onClick={handle}
        aria-pressed={saved}
        aria-label={saved ? "Remove bookmark" : "Save article"}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
          saved
            ? "bg-primary text-primary-foreground border-primary"
            : "border-border hover:border-primary"
        } ${className}`}
      >
        {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      aria-pressed={saved}
      aria-label={saved ? "Remove bookmark" : "Save article"}
      className={`h-9 w-9 rounded-md inline-flex items-center justify-center transition-colors ${
        saved
          ? "bg-primary text-primary-foreground"
          : "bg-muted hover:bg-primary hover:text-primary-foreground"
      } ${className}`}
    >
      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
    </button>
  );
}
