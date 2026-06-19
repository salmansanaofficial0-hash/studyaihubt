import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-of-use")({
  component: TermsOfUse,
  head: () => ({
    meta: [
      { title: "Terms of Use — StudyAI Hub" },
      { name: "description", content: "The terms and conditions governing your use of StudyAI Hub and all content published on this website." },
      { property: "og:title", content: "Terms of Use — StudyAI Hub" },
      { property: "og:description", content: "Read the terms and conditions for using StudyAI Hub." },
      { property: "og:url", content: "https://studyaihub.tech/terms-of-use" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihub.tech/terms-of-use" }],
  }),
});

function TermsOfUse() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-sm text-primary font-medium">Legal</p>
      <h1 className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 19, 2026</p>

      <div className="prose-article mt-8">
        <p>
          Welcome to StudyAI Hub ("the Site"), located at{" "}
          <a href="https://studyaihub.tech" className="text-primary underline">
            https://studyaihub.tech
          </a>
          . By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree, please
          do not use the Site.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          These Terms of Use govern your access to and use of StudyAI Hub, including all content, features, and
          functionality offered on or through the Site. By visiting any page on this website, you confirm that you have
          read, understood, and agree to these terms.
        </p>

        <h2>2. Who We Are</h2>
        <p>
          StudyAI Hub is an independent student-run educational blog operated by Ahmed Raza, a BBA student at the
          University of Karachi, Pakistan. The site is not affiliated with any university, institution, or company. For
          questions, please see our <Link to="/contact">Contact page</Link>.
        </p>

        <h2>3. Acceptable Use</h2>
        <p>You agree to use StudyAI Hub only for lawful purposes. You must not:</p>
        <ul>
          <li>Copy, reproduce, or redistribute any article or content from this site without written permission</li>
          <li>Use automated bots or scrapers to harvest content in bulk</li>
          <li>Attempt to access any restricted areas of the site (e.g., the admin panel)</li>
          <li>Post comments or messages that are abusive, spam, or violate the rights of others</li>
          <li>Use the site to distribute malware or any other harmful software</li>
          <li>Misrepresent your identity or impersonate any person or entity</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All original content on StudyAI Hub — including articles, guides, graphics, and the site design — is the
          intellectual property of Ahmed Raza / StudyAI Hub and is protected under applicable copyright law.
        </p>
        <p>You may:</p>
        <ul>
          <li>
            Share a link to any article on StudyAI Hub on social media or in personal communications
          </li>
          <li>
            Quote short excerpts (up to 150 words) from articles for educational, commentary, or review purposes,
            provided you attribute StudyAI Hub and include a link to the original article
          </li>
        </ul>
        <p>You may not:</p>
        <ul>
          <li>
            Republish full articles or substantial portions of our content on any website, newsletter, or publication
            without prior written permission
          </li>
          <li>Claim our content as your own or remove attribution</li>
          <li>Use our content for commercial gain without a written licence agreement</li>
        </ul>
        <p>
          To request permission to reproduce content, please <Link to="/contact">contact us</Link>.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          StudyAI Hub is provided on an "as is" and "as available" basis. We make no warranties — express or implied —
          regarding the accuracy, completeness, reliability, or suitability of any content for any particular purpose.
          Educational content on this site is for general informational purposes only. We are not professional
          financial, legal, medical, or career advisors. Always verify important information with qualified professionals.
        </p>
        <p>
          We do not guarantee that the site will be available at all times, error-free, or free from viruses or other
          harmful components.
        </p>

        <h2>6. External Links and Third-Party Websites</h2>
        <p>
          StudyAI Hub contains links to third-party websites, including AI tools and resources we recommend. These
          links are provided for your convenience. We have no control over the content, privacy practices, or
          availability of those external sites.
        </p>
        <p>
          Linking to a third-party website does not constitute our endorsement of that site or its content. We accept
          no responsibility for any loss or damage that may arise from your use of external websites. Please read the
          terms and privacy policies of any external site you visit.
        </p>
        <p>
          Some links on this site are affiliate links. When you click an affiliate link and make a purchase or sign up,
          we may earn a small commission at no additional cost to you. See our <Link to="/disclaimer">Disclaimer</Link>{" "}
          for full details.
        </p>

        <h2>7. User-Generated Content (Comments)</h2>
        <p>
          If you submit a comment on any article, you grant StudyAI Hub a non-exclusive licence to publish, display,
          and moderate that comment. All comments are reviewed before publication. We reserve the right to reject or
          remove any comment that is offensive, spammy, or violates these terms.
        </p>
        <p>
          You are solely responsible for the content of any comment you submit. Do not include personally identifiable
          information about others, copyrighted material, or links to illegal or harmful content.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, StudyAI Hub and its operator shall not be liable for any
          direct, indirect, incidental, special, consequential, or punitive damages arising from your use of this
          website, reliance on any content published here, or your interaction with any third-party link or service
          featured on this site.
        </p>
        <p>
          This includes, without limitation, any loss of academic grades, financial loss, or data loss arising from
          following advice or using tools discussed on this site.
        </p>

        <h2>9. Privacy</h2>
        <p>
          Your use of StudyAI Hub is also governed by our <Link to="/privacy-policy">Privacy Policy</Link>, which is
          incorporated into these Terms of Use by reference. By using the site, you also consent to the data practices
          described in our Privacy Policy.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms of Use shall be governed by and construed in accordance with the laws of the Islamic Republic of
          Pakistan, without regard to its conflict of law principles. Any disputes arising from your use of this website
          shall be subject to the exclusive jurisdiction of the courts of Karachi, Pakistan.
        </p>

        <h2>11. Changes to These Terms</h2>
        <p>
          We reserve the right to update these Terms of Use at any time. When we make changes, we will update the "Last
          updated" date at the top of this page. Continued use of the site after any changes constitutes your
          acceptance of the revised terms.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          If you have questions about these Terms of Use, or to request permission to reproduce our content, please use
          our <Link to="/contact">contact form</Link> or email us at{" "}
          <a href="mailto:hello@studyaihub.tech" className="text-primary underline">
            hello@studyaihub.tech
          </a>
          .
        </p>
      </div>
    </div>
  );
}
