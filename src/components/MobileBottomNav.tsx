import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Sparkles, Bookmark, Menu } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", I: Home, exact: true },
  { to: "/blog", label: "Blog", I: BookOpen, exact: false },
  { to: "/ai-tools", label: "Tools", I: Sparkles, exact: false },
  { to: "/bookmarks", label: "Saved", I: Bookmark, exact: false },
  { to: "/contact", label: "More", I: Menu, exact: false },
];

export function MobileBottomNav() {
  const { location } = useRouterState();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass-strong border-t border-border">
      <div className="grid grid-cols-5">
        {ITEMS.map(({ to, label, I, exact }) => {
          const active = exact ? location.pathname === to : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <I className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
