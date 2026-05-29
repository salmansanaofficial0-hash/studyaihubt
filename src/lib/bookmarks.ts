import { useEffect, useState, useCallback } from "react";

const KEY = "studyai_bookmarks";

export type Bookmark = {
  slug: string;
  title: string;
  excerpt: string;
  emoji: string;
  category: string;
  categorySlug: string;
  categoryColor: string;
  savedAt: string;
};

function read(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Bookmark[]) : [];
  } catch {
    return [];
  }
}

function write(list: Bookmark[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("bookmarks:changed"));
}

export function useBookmarks() {
  const [items, setItems] = useState<Bookmark[]>([]);

  useEffect(() => {
    setItems(read());
    const onChange = () => setItems(read());
    window.addEventListener("bookmarks:changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("bookmarks:changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const isSaved = useCallback((slug: string) => items.some((b) => b.slug === slug), [items]);

  const toggle = useCallback((b: Omit<Bookmark, "savedAt">) => {
    const cur = read();
    const exists = cur.some((x) => x.slug === b.slug);
    const next = exists
      ? cur.filter((x) => x.slug !== b.slug)
      : [{ ...b, savedAt: new Date().toISOString() }, ...cur];
    write(next);
    return !exists;
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((x) => x.slug !== slug));
  }, []);

  return { items, isSaved, toggle, remove };
}
