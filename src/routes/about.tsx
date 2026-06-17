import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts.functions";
import type { Post } from "@/lib/posts-types";
import founderImg from "@/assets/founder.png";

export const Route = createFileRoute("/about")({
  loader: async (): Promise<{ posts: Post[] }> => ({ posts: await getAllPosts() }),
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — StudyAI Hub" },
      { name: "description", content: "Why StudyAI Hub exists, who's behind it, and where to start reading." },
      { property: "og:title", content: "About — StudyAI Hub" },
      { property: "og:description", content: "A blog built by students, for students, about studying smarter with AI." },
      { property: "og:url", content: "https://studyaihub.tech/about" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihub.tech/about" }],
  }),
});

function AboutPage() {
  const { posts } = Route.useLoaderData() as { posts: Post[] };
  const startHere = posts.filter((p) => p.featured).slice(0, 5);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-sm text-primary font-medium">About</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
        Built by a student, <span className="text-gradient-brand">for students.</span>
      </h1>

      {/* Profile Section */}
      <div className="mt-10 flex flex-col md:flex-row items-center gap-8 mb-12">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-cyan-400 p-1 overflow-hidden shadow-lg">
              <img
                src={founderImg}
                alt="Salman Sana"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-transparent"></div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold">Salman Sana</h2>
          <p className="text-lg text-primary font-semibold mt-1">University of Turbat</p>
          <p className="text-muted-foreground mt-3 max-w-lg">
            Student at University of Turbat passionate about making education more accessible through AI and modern technology. 
            I created StudyAI Hub to help students like me study smarter, not harder.
          </p>
        </div>
      </div>

      <div className="prose-article mt-10">
        <p>
          Hi — I'm Salman Sana, a student at the University of Turbat. I started StudyAI Hub because every other "student
          productivity" blog I read either had no idea what student life is actually like, or was 90% sponsored content for
          tools nobody uses.
        </p>
        <p>
          StudyAI Hub now has <strong>25+ in-depth articles</strong> across <strong>6 categories</strong> — AI tools, study tips, productivity,
          business &amp; finance, presentation skills, and tech reviews. Every post is tested in real assignments, not just
          theory.
        </p>
        <h2>Our mission</h2>
        <p>
          Help university students study smarter without burning out. We test AI tools in real assignments, write study
          guides we wish we had in first year, and break down complex concepts in plain English.
        </p>
        <h2>What we cover</h2>
        <ul>
          <li>AI tools — what's actually useful, what's hype</li>
          <li>Study techniques — Pomodoro, active recall, spaced repetition</li>
          <li>Productivity — time management, focus, beating procrastination</li>
          <li>Learning strategies — for all fields of study</li>
          <li>Presentations — design, delivery, AI-assisted decks</li>
          <li>Tech reviews — laptops, apps, gear</li>
        </ul>
        <h2>The promise</h2>
        <p>
          No fluff. No sponsored content disguised as honest reviews. If a tool isn't worth it, we say so. If a study
          method only works for specific subjects, we'll tell you that too.
        </p>
      </div>

      <h2 className="mt-14 text-2xl font-extrabold">Start here — top 5 reads</h2>
      <p className="text-muted-foreground mt-2">If you're new, these five articles will give you the biggest wins fastest.</p>
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
                <p className="text-xs text-muted-foreground">{p.category} · {p.readingTime}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <div className="mt-14 p-8 rounded-2xl bg-gradient-brand text-white text-center">
        <h3 className="text-xl font-extrabold">Got questions or feedback?</h3>
        <p className="mt-2 text-white/85 text-sm">I read every email. Promise.</p>
        <Link to="/contact" className="mt-5 inline-flex px-5 py-2.5 rounded-lg bg-white text-primary font-semibold">
          Get in touch
        </Link>
      </div>
    </div>
  );
}
