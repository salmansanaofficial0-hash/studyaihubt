import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — StudyAI Hub" },
      { name: "description", content: "How StudyAI Hub collects, uses, and protects your data — including newsletter emails, cookies, analytics, and advertising." },
      { property: "og:title", content: "Privacy Policy — StudyAI Hub" },
      { property: "og:description", content: "How StudyAI Hub handles your personal data, emails, cookies, and advertising data." },
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
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 19, 2026</p>

      <div className="prose-article mt-8">
        <p>
          StudyAI Hub ("we", "us", "our") operates the website at{" "}
          <a href="https://studyaihub.tech" className="text-primary underline">
            https://studyaihub.tech
          </a>
          . This Privacy Policy explains what information we collect, how we use it, who we share it with, and your
          rights regarding your personal data. By using StudyAI Hub, you agree to the practices described in this
          policy.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect only the information necessary to operate this website and serve our readers. This includes:</p>

        <h3>a) Information You Provide Directly</h3>
        <ul>
          <li>
            <strong>Email address</strong> — when you subscribe to our newsletter, we store your email address so we
            can send you our weekly content digest.
          </li>
          <li>
            <strong>Name, email, and message</strong> — when you submit a contact form or post a comment on an article,
            we collect the information you provide.
          </li>
        </ul>

        <h3>b) Information Collected Automatically</h3>
        <ul>
          <li>
            <strong>Usage analytics</strong> — we use Google Analytics (GA4) to understand which pages are most popular,
            how long visitors spend reading, what device and country they are in, and how they navigate the site. Google
            Analytics collects IP addresses but we have configured IP anonymization. No personally identifiable
            information is collected through analytics.
          </li>
          <li>
            <strong>Cookies</strong> — see the Cookies section below for a full explanation of what cookies we set and
            why.
          </li>
        </ul>

        <h2>2. Cookies</h2>
        <p>
          Cookies are small text files stored in your browser. StudyAI Hub uses the following types of cookies:
        </p>
        <ul>
          <li>
            <strong>Functional cookies</strong> — used to remember your bookmarks, theme preference (light/dark), and
            AI chat history. These are stored locally in your browser and are not sent to our servers.
          </li>
          <li>
            <strong>Analytics cookies</strong> — set by Google Analytics (GA4) to understand site usage. These
            cookies collect anonymised data about page views, session duration, and traffic sources. You can opt out
            of Google Analytics by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </li>
          <li>
            <strong>Advertising cookies (future)</strong> — if we are approved for and activate Google AdSense, Google
            may set cookies to show you relevant advertisements based on your browsing history across websites. Google's
            use of advertising cookies is governed by the{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Advertising Policies
            </a>
            . You can manage your ad personalisation settings at{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Ad Settings
            </a>
            .
          </li>
        </ul>
        <p>
          You can clear or block cookies at any time in your browser settings. Blocking functional cookies may affect
          bookmarks and preferences, but will not prevent you from reading any content.
        </p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To send the weekly newsletter you subscribed to (email subscribers only)</li>
          <li>To reply to messages you send through our contact form</li>
          <li>To review, moderate, and publish approved comments on articles</li>
          <li>To understand which articles and topics are most useful to our readers</li>
          <li>To improve site performance and user experience</li>
          <li>
            To display relevant advertisements through Google AdSense (once activated), which helps us keep the site
            free
          </li>
        </ul>

        <h2>4. Third-Party Services We Use</h2>
        <p>We use the following third-party services to operate StudyAI Hub:</p>
        <ul>
          <li>
            <strong>Supabase</strong> — our backend database, hosted in Frankfurt (EU) data centres. It stores newsletter
            subscriber emails, contact form submissions, article data, and approved comments.{" "}
            <a
              href="https://supabase.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Supabase Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics (GA4)</strong> — collects anonymised usage data to help us understand our
            audience. Data is processed by Google in the United States.{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Google AdSense</strong> — once activated, Google AdSense will display advertisements and may collect
            information about your interests to show relevant ads. Google's data collection is governed by the{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Cloudflare</strong> — our site is deployed on Cloudflare's global CDN. Cloudflare may process your
            IP address for security and performance optimisation.{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Cloudflare Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Google Fonts</strong> — we load fonts from Google's CDN. Google may collect your IP address when
            serving fonts.
          </li>
        </ul>

        <h2>5. What We Will Never Do</h2>
        <ul>
          <li>Sell, rent, or share your email address or personal data with any third party for their marketing purposes</li>
          <li>Send you emails unrelated to the newsletter you subscribed to without your consent</li>
          <li>Track your activity across other websites (beyond what Google Analytics collects)</li>
          <li>Use your data for any purpose not described in this Privacy Policy</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>
          Newsletter subscriber emails are retained until you unsubscribe or request deletion. Contact form messages are
          retained for up to 12 months and then deleted. Analytics data is retained for 26 months as per Google
          Analytics default settings.
        </p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li>
            <strong>Right to access</strong> — you can request a copy of the personal information we hold about you.
          </li>
          <li>
            <strong>Right to deletion</strong> — you can request that we delete your personal data (e.g., your email
            subscription or contact form submission). We will action deletion requests within 7 business days.
          </li>
          <li>
            <strong>Right to unsubscribe</strong> — every newsletter email contains an unsubscribe link. You can also
            request removal by contacting us directly.
          </li>
          <li>
            <strong>Right to opt out of advertising</strong> — you can manage Google's use of advertising data through{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Ad Settings
            </a>
            .
          </li>
        </ul>

        <h2>8. Children's Privacy</h2>
        <p>
          StudyAI Hub is intended for university students and adults aged 16 and above. We do not knowingly collect
          personal information from children under 13. If you believe a child has submitted personal information to us,
          please contact us and we will delete it promptly.
        </p>

        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we make changes, we will update the "Last updated"
          date at the top of this page. We encourage you to review this page periodically. Continued use of StudyAI Hub
          after any changes constitutes your acceptance of the revised policy.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          For privacy-related questions, data deletion requests, or concerns about this policy, please contact us via
          our <Link to="/contact">contact form</Link> or email:{" "}
          <a href="mailto:hello@studyaihub.tech" className="text-primary underline">
            hello@studyaihub.tech
          </a>
          . We aim to respond within 48 hours.
        </p>
      </div>
    </div>
  );
}
