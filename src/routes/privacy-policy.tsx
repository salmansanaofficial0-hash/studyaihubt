import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — StudyAI Hub" },
      { name: "description", content: "How StudyAI Hub collects and uses your data, including newsletter emails and cookies." },
      { property: "og:title", content: "Privacy Policy — StudyAI Hub" },
      { property: "og:description", content: "How StudyAI Hub handles your data, emails, and cookies." },
      { property: "og:url", content: "https://studyaihub.tech/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihub.tech/privacy-policy" }],
  }),
});

function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-sm text-primary font-medium">Legal</p>
      <h1 className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>

      <div className="prose-article mt-8">
        <h2>What we collect</h2>
        <p>StudyAI Hub collects only the information needed to deliver our content and improve your experience.</p>
        <ul>
          <li><strong>Email address</strong> — if you subscribe to our newsletter or submit a comment</li>
          <li><strong>Name and message</strong> — if you contact us or comment on a post</li>
          <li><strong>Basic analytics</strong> — page views, device type, country (no personally identifiable data)</li>
          <li><strong>Cookies</strong> — small files used to remember your bookmarks, theme preference, and chatbot history</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To send the weekly newsletter you subscribed to</li>
          <li>To reply to your messages</li>
          <li>To moderate and display approved comments</li>
          <li>To understand which articles students find helpful</li>
        </ul>

        <h2>What we never do</h2>
        <ul>
          <li>Sell, rent, or share your email with third parties</li>
          <li>Send marketing for unrelated products</li>
          <li>Track you across other websites</li>
        </ul>

        <h2>Cookies</h2>
        <p>We use only first-party cookies for functional features (saving your bookmarks, remembering chat history, theme). You can clear them anytime from your browser settings without losing access to the site.</p>

        <h2>Your rights</h2>
        <p>You can unsubscribe from the newsletter via any email we send, or contact us to delete your data. We honour deletion requests within 7 days.</p>

        <h2>Contact</h2>
        <p>Questions? Reach us via the <Link to="/contact">contact page</Link>.</p>
      </div>
    </div>
  );
}
