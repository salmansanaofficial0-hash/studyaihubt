import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  component: Disclaimer,
  head: () => ({
    meta: [
      { title: "Disclaimer — StudyAI Hub" },
      { name: "description", content: "Affiliate marketing transparency and editorial independence at StudyAI Hub." },
      { property: "og:title", content: "Disclaimer — StudyAI Hub" },
      { property: "og:description", content: "How we handle affiliate links and editorial reviews." },
      { property: "og:url", content: "https://studyaihub.tech/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihub.tech/disclaimer" }],
  }),
});

function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-sm text-primary font-medium">Legal</p>
      <h1 className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">Disclaimer</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>

      <div className="prose-article mt-8">
        <h2>Affiliate links</h2>
        <p>Some links on StudyAI Hub are affiliate links. If you click one and sign up or buy something, we may earn a small commission — at <strong>no extra cost to you</strong>. This helps us keep the site free for students.</p>

        <h2>Editorial independence</h2>
        <p>We only recommend tools we have personally tested and use. A brand cannot pay us to write a positive review. If a recommendation includes an affiliate link, it is because we already liked the product, not the other way around.</p>

        <h2>Educational content only</h2>
        <p>Articles on StudyAI Hub are for educational and informational purposes. We are not professional financial, legal, medical, or career advisors. Always double-check important decisions with a qualified expert.</p>

        <h2>AI-generated content</h2>
        <p>We use AI tools (like ChatGPT and Claude) to help research and draft articles, but every post is reviewed, edited, and fact-checked by a human author before publishing.</p>

        <h2>Accuracy</h2>
        <p>Tools, prices, and features change quickly. We update articles regularly, but please verify pricing and features on the official tool's website before subscribing.</p>

        <h2>Contact</h2>
        <p>Spot an error or have a concern? <Link to="/contact">Let us know</Link> — we fix things fast.</p>
      </div>
    </div>
  );
}
