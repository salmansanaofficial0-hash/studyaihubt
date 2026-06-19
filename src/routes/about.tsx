import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Layers, Mail } from "lucide-react";
import { getAllPosts, getCategories } from "@/lib/posts.functions";
import type { Post, Category } from "@/lib/posts-types";
import founderImg from "@/assets/founder.png";

export const Route = createFileRoute("/about")({
  loader: async (): Promise<{ posts: Post[]; categories: Category[] }> => ({
    posts: await getAllPosts(),
    categories: await getCategories(),
  }),
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About StudyAI Hub | Ahmed Raza — BBA Student, University of Karachi" },
      { name: "description", content: "StudyAI Hub is run by Ahmed Raza, a BBA student at the University of Karachi. Honest AI tool reviews and study guides written from real student experience." },
      { property: "og:title", content: "About StudyAI Hub | Ahmed Raza" },
      { property: "og:description", content: "A blog built by a real BBA student in Karachi — honest AI tool reviews and study guides that actually work." },
      { property: "og:url", content: "https://studyaihub.tech/about" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihub.tech/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ahmed Raza",
          url: "https://studyaihub.tech/about",
          jobTitle: "BBA Student & Content Creator",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "University of Karachi",
          },
          worksFor: {
            "@type": "Organization",
            name: "StudyAI Hub",
            url: "https://studyaihub.tech",
          },
          description:
            "BBA student at the University of Karachi who runs StudyAI Hub — a blog covering AI tools, study strategies, and productivity for university students.",
          sameAs: ["https://twitter.com/studyaihub"],
        }),
      },
    ],
  }),
});

function AboutPage() {
  const { posts, categories } = Route.useLoaderData() as { posts: Post[]; categories: Category[] };
  const startHere = posts.filter((p) => p.featured).slice(0, 5);
  const publishedCount = posts.length;
  const categoryCount = categories.length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-sm text-primary font-medium">About</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
        Built by a student,{" "}
        <span className="text-gradient-brand">for students.</span>
      </h1>

      {/* Profile Section */}
      <div className="mt-10 flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-gradient-brand p-1 overflow-hidden shadow-lg">
              <img
                src={founderImg}
                alt="Ahmed Raza — founder of StudyAI Hub"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-extrabold">Ahmed Raza</h2>
          <p className="text-lg text-primary font-semibold mt-1">BBA Student · University of Karachi</p>
          <p className="text-muted-foreground mt-3 max-w-lg">
            I'm a BBA student in Karachi who got tired of productivity advice written by people who've never sat
            through a three-hour exam. So I started writing the guides I actually needed.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 mb-3">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-extrabold text-gradient-brand">{publishedCount}+</p>
          <p className="text-sm text-muted-foreground mt-1">Published articles</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 mb-3">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-extrabold text-gradient-brand">{categoryCount}</p>
          <p className="text-sm text-muted-foreground mt-1">Topic categories</p>
        </div>
      </div>

      <div className="prose-article mt-10">
        <p>
          Hi — I'm Ahmed Raza. I'm currently studying Business Administration at the University of Karachi, and I
          started StudyAI Hub in 2024 because I was genuinely frustrated. Every "student productivity" blog I read was
          either written by someone who hadn't been a student in 20 years, or was basically a sponsored ad dressed up
          as advice.
        </p>
        <p>
          I wanted something honest. Something that would tell me which AI tools actually save time in real
          assignments — not just which ones have the slickest landing page. Something that would give me study
          strategies that work for a BBA student balancing marketing cases, finance calculations, and six subjects at
          once. Something written by someone who knows what it's like to have an exam at 8am and not have started
          studying yet.
        </p>
        <p>
          That's StudyAI Hub. I test every tool I write about in actual coursework. I write every study guide from
          methods I've tried myself. When something doesn't work, I say so.
        </p>

        <h2>Our Mission</h2>
        <p>
          Help university students in Pakistan (and everywhere else) study smarter without burning out. We test AI
          tools in real assignments, write study guides we wish we'd had in first year, and break down complex
          concepts in plain English — not textbook language.
        </p>

        <h2>What We Cover</h2>
        <ul>
          <li>
            <strong>AI Tools</strong> — honest comparisons of ChatGPT, Claude, Perplexity, NotebookLM, and more.
            What's free, what's worth paying for, and what's overhyped.
          </li>
          <li>
            <strong>Study Techniques</strong> — Pomodoro, active recall, spaced repetition, the Cornell method.
            Tested, not just copied from Wikipedia.
          </li>
          <li>
            <strong>Business & Finance</strong> — financial ratios, strategy frameworks, economics concepts explained
            for BBA students who just need it to make sense.
          </li>
          <li>
            <strong>Productivity</strong> — time management, beating procrastination, building a study schedule that
            doesn't collapse after week two.
          </li>
          <li>
            <strong>Presentation Skills</strong> — how to build slides that don't embarrass you, and how to present
            when your hands are shaking.
          </li>
          <li>
            <strong>Tech Reviews</strong> — laptops, apps, and gear that are actually worth the money for students.
          </li>
        </ul>

        <h2>The Promise</h2>
        <p>
          No fluff. No generic advice. No sponsored content disguised as honest reviews. If a tool disappoints me,
          I'll say so even if I have an affiliate link for it. If a study method only works for certain subjects, I'll
          tell you that. If something is complicated for Pakistani students because of payment restrictions or limited
          access — I'll address that directly.
        </p>
        <p>
          I update the site regularly because AI tools change every few months and advice gets stale fast. Check
          the "Last updated" date on every article — if it's more than six months old, I'm either reviewing it or
          it covers something that genuinely hasn't changed.
        </p>

        <h2>Get in Touch</h2>
        <p>
          I genuinely read every message I receive. If you want to suggest a topic, point out an error, ask about a
          tool I haven't covered, or just say hello — use the{" "}
          <Link to="/contact" className="text-primary underline">
            contact form
          </Link>{" "}
          or email{" "}
          <a href="mailto:hello@studyaihub.tech" className="text-primary underline">
            hello@studyaihub.tech
          </a>
          .
        </p>
      </div>

      {startHere.length > 0 && (
        <>
          <h2 className="mt-14 text-2xl font-extrabold">Start here — top reads</h2>
          <p className="text-muted-foreground mt-2">New here? These articles will give you the biggest wins fastest.</p>
          <div className="mt-6 space-y-3">
            {startHere.map((p, i) => (
              <Link
                key={p.id}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-card transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-extrabold text-muted-foreground w-6">{i + 1}</span>
                  <div>
                    <p className="font-semibold group-hover:text-primary transition-colors">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.category} · {p.readingTime}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="mt-14 p-8 rounded-2xl bg-gradient-brand text-white text-center">
        <Mail className="h-8 w-8 mx-auto mb-3 opacity-90" />
        <h3 className="text-xl font-extrabold">Got questions or feedback?</h3>
        <p className="mt-2 text-white/85 text-sm">I read every message. Promise.</p>
        <Link
          to="/contact"
          className="mt-5 inline-flex px-5 py-2.5 rounded-lg bg-white text-primary font-semibold hover:scale-[1.02] transition-transform"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
