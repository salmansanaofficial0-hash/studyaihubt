import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from "@/data/posts";
import { subscribeToNewsletter } from "@/lib/newsletter";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <footer className="mt-24 border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              StudyAI <span className="text-gradient-brand">Hub</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Study Smarter. Not Harder. The honest guide to AI tools and productivity for university students.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setErr(null);
                setLoading(true);
                const res = await subscribeToNewsletter(email, "footer");
                setLoading(false);
                if (res.ok) {
                  setDone(true);
                  setEmail("");
                  setTimeout(() => setDone(false), 4000);
                } else {
                  setErr(res.error || "Something went wrong.");
                }
              }}
              className="mt-5 flex gap-2 max-w-sm"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="flex-1 px-3 py-2 rounded-md bg-muted text-sm outline-none focus:ring-2 ring-primary"
              />
              <button disabled={loading} className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-60">
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
            {done && <p className="mt-2 text-xs text-accent">🎉 You're in! Check your inbox.</p>}
            {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
          </div>

          <FooterCol title="Quick Links">
            <FLink to="/">Home</FLink>
            <FLink to="/blog">Blog</FLink>
            <FLink to="/ai-tools">AI Tools</FLink>
            <FLink to="/about">About</FLink>
            <FLink to="/contact">Contact</FLink>
          </FooterCol>

          <FooterCol title="Categories">
            {CATEGORIES.slice(0, 5).map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Connect">
            <div className="flex gap-2">
              {[
                { I: Twitter, l: "Twitter", href: "https://twitter.com/studyaihub" },
                { I: Instagram, l: "Instagram", href: "https://instagram.com/studyaihub" },
                { I: Youtube, l: "YouTube", href: "https://youtube.com/@studyaihub" },
                { I: Linkedin, l: "LinkedIn", href: "https://linkedin.com/company/studyaihub" },
              ].map(({ I, l, href }) => (
                <a
                  key={l}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${l}`}
                  className="h-9 w-9 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center transition-colors"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </FooterCol>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground flex flex-wrap gap-2 justify-between">
          <p>© 2025 StudyAI Hub. Made for students, by students.</p>
          <p>Built with ☕ in Karachi.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold mb-3">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
      {children}
    </Link>
  );
}
