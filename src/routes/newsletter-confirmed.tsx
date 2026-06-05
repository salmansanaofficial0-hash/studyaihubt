import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/newsletter-confirmed")({
  head: () => ({
    meta: [
      { title: "You're subscribed! | StudyAI Hub" },
      { name: "description", content: "Thanks for subscribing to the StudyAI Hub newsletter." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NewsletterConfirmed,
});

const PICKS = [
  { emoji: "🤖", title: "10 Best AI Tools for Students 2025", slug: "best-ai-tools-students-2025" },
  { emoji: "💬", title: "50 ChatGPT Prompts for University Students", slug: "chatgpt-prompts-university-students" },
  { emoji: "📅", title: "How to Study for Exams in 3 Days", slug: "study-for-exams-3-days-emergency-plan" },
];

function NewsletterConfirmed() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand text-white mb-6">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Welcome to StudyAI Hub! 🎉</h1>
      <p className="mt-4 text-muted-foreground">
        You're subscribed. Check your inbox for a welcome email with your first AI tools guide.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
        >
          Read Latest Articles <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/ai-tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border font-medium hover:bg-muted transition"
        >
          Browse AI Tools
        </Link>
      </div>

      <div className="mt-12 text-left">
        <p className="text-sm font-semibold mb-3">Start with these popular articles:</p>
        <ul className="space-y-2">
          {PICKS.map((p) => (
            <li key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary transition-colors"
              >
                <span className="text-2xl">{p.emoji}</span>
                <span className="flex-1 font-medium">{p.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
