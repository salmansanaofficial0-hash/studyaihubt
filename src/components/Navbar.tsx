import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Moon, Sun, Search, Menu, X, Sparkles } from "lucide-react";
import { POSTS } from "@/data/posts";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/ai-tools", label: "AI Tools" },
  { to: "/bookmarks", label: "Saved" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefers = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsub = router.subscribe("onResolved", () => {
      setOpen(false);
      setSearchOpen(false);
    });
    return unsub;
  }, [router]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const results = q.trim()
    ? POSTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(q.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())),
      ).slice(0, 6)
    : [];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>
            StudyAI <span className="text-gradient-brand">Hub</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Toggle dark mode"
            onClick={toggleDark}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((s) => !s)}
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-t border-border bg-surface/95 backdrop-blur">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles, tools, topics..."
              className="w-full bg-muted/50 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 ring-primary"
            />
            {results.length > 0 && (
              <ul className="mt-2 divide-y divide-border rounded-lg overflow-hidden bg-surface border border-border">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="block px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <p className="text-sm font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.category} · {p.readingTime}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {open && (
        <div className="md:hidden border-t border-border bg-surface animate-in slide-in-from-top">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2.5 rounded-md hover:bg-muted text-sm font-medium"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
