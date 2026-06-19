import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  component: Disclaimer,
  head: () => ({
    meta: [
      { title: "Disclaimer — StudyAI Hub" },
      { name: "description", content: "Affiliate link disclosure, editorial independence policy, and important notices for StudyAI Hub readers." },
      { property: "og:title", content: "Disclaimer — StudyAI Hub" },
      { property: "og:description", content: "How StudyAI Hub handles affiliate links, editorial reviews, and AI-generated content." },
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
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 19, 2026</p>

      <div className="prose-article mt-8">
        <p>
          Please read this Disclaimer carefully before relying on any content published on StudyAI Hub (
          <a href="https://studyaihub.tech" className="text-primary underline">
            studyaihub.tech
          </a>
          ). By using this website, you acknowledge and agree to the following disclosures.
        </p>

        <h2>1. Independent Student-Run Blog</h2>
        <p>
          StudyAI Hub is an independent educational blog operated by Ahmed Raza, a BBA student at the University of
          Karachi, Pakistan. This website is <strong>not affiliated with, endorsed by, or sponsored by</strong> any
          university, academic institution, government body, or technology company, unless explicitly stated in a
          specific article.
        </p>
        <p>
          All content on this site reflects the personal opinions, research, and experiences of the author. University
          policies, AI tool pricing, and educational regulations change frequently — always verify important details
          directly with your institution or the relevant service provider.
        </p>

        <h2>2. Affiliate Link Disclosure</h2>
        <p>
          Some links on StudyAI Hub are <strong>affiliate links</strong>. This means that if you click on one of these
          links and subsequently sign up for a service, make a purchase, or complete a qualifying action, StudyAI Hub
          may receive a small commission or referral credit at{" "}
          <strong>absolutely no extra cost to you</strong>.
        </p>
        <p>
          Affiliate revenue helps us keep this site free, updated, and free of paywalls. You will never pay more for
          a product or service by clicking our affiliate links — in some cases you may receive a discount exclusive to
          our readers.
        </p>
        <p>
          We will always clearly label affiliate links where we are aware of them. We do our best to only recommend
          tools and services we have personally tested and genuinely believe are useful to students.
        </p>

        <h2>3. Editorial Independence</h2>
        <p>
          Our editorial process is fully independent. No brand, company, or individual can pay to receive a positive
          review on StudyAI Hub. The following principles guide every article we publish:
        </p>
        <ul>
          <li>
            <strong>We only recommend what we've tested.</strong> Every AI tool, app, or service mentioned positively
            on this site has been personally used by the author in real academic tasks. We test free tiers before
            recommending paid plans.
          </li>
          <li>
            <strong>Affiliate links follow the recommendation, not the other way around.</strong> We first decide
            whether a tool is worth recommending, and only then look for an affiliate programme. If a tool is
            excellent but has no affiliate programme, we will still recommend it.
          </li>
          <li>
            <strong>We disclose sponsored content explicitly.</strong> If a company has provided a free account,
            product access, or any other benefit to facilitate a review, this will be disclosed at the top of that
            article with the label "Sponsored" or "PR Sample."
          </li>
          <li>
            <strong>Negative opinions are published.</strong> If a tool disappoints us, we say so. We will not delete
            or soften a negative review because of an existing affiliate relationship.
          </li>
        </ul>

        <h2>4. No Guarantee of Academic Outcomes</h2>
        <p>
          The study tips, productivity techniques, and AI tool recommendations published on StudyAI Hub are intended
          to be helpful starting points — not guarantees of academic success. Individual results depend on many
          factors including the student's effort, learning style, course requirements, and instructor expectations.
        </p>
        <p>
          Following the advice on this site does not guarantee improved grades, exam success, or any specific academic
          outcome. StudyAI Hub and its operator accept no liability for academic results or decisions made based on
          content published here.
        </p>

        <h2>5. AI Tool Limitations</h2>
        <p>
          StudyAI Hub frequently discusses AI tools including large language models (LLMs), AI writing assistants,
          and similar technologies. Please be aware of the following:
        </p>
        <ul>
          <li>
            <strong>AI tools can produce inaccurate information.</strong> Never submit AI-generated text as your own
            academic work without thorough review and verification. Check your university's academic integrity policy
            before using AI in assignments.
          </li>
          <li>
            <strong>Pricing and features change rapidly.</strong> AI tool pricing tiers, free limits, and feature sets
            can change with little notice. Always verify current pricing directly on the tool's official website before
            subscribing.
          </li>
          <li>
            <strong>Access varies by region.</strong> Some AI tools are not available or have restricted features in
            certain countries. Our reviews reflect testing conducted in Pakistan — availability in your location may
            differ.
          </li>
        </ul>

        <h2>6. External Links</h2>
        <p>
          StudyAI Hub contains links to external websites for reference and convenience. We do not control or
          endorse the content, accuracy, or privacy practices of any third-party website. Linking to an external
          site does not imply our endorsement of its content.
        </p>

        <h2>7. Financial and Career Advice</h2>
        <p>
          Some articles on StudyAI Hub discuss topics related to personal finance, business, freelancing, and career
          planning for students. This content is for <strong>general educational purposes only</strong>. It does not
          constitute professional financial advice, legal advice, or career counselling. For significant financial or
          career decisions, please consult a qualified professional.
        </p>

        <h2>8. Corrections Policy</h2>
        <p>
          We strive for accuracy in every article. If you spot an error — whether a factual inaccuracy, an outdated
          price, or a broken link — please <Link to="/contact">let us know</Link>. We take corrections seriously and
          will update articles promptly. Significant corrections will be noted at the bottom of the relevant article
          with a date.
        </p>

        <h2>9. Contact</h2>
        <p>
          For concerns about our editorial practices, affiliate relationships, or any content on this site, please use
          our <Link to="/contact">contact form</Link> or email{" "}
          <a href="mailto:hello@studyaihub.tech" className="text-primary underline">
            hello@studyaihub.tech
          </a>
          .
        </p>
      </div>
    </div>
  );
}
