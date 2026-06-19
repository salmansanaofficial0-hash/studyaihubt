import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { FloatingChat } from "@/components/FloatingChat";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { StickyNewsletterBar } from "@/components/StickyNewsletterBar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gradient-brand">404</h1>
        <p className="mt-4 text-lg">This page wandered off to study.</p>
        <a href="/" className="mt-6 inline-flex px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
          Back home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
          >Try again</button>
          <a href="/" className="px-4 py-2 rounded-md border border-border text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "StudyAI Hub — AI Tools and Study Tips for University Students 2025" },
      { name: "description", content: "Discover the best free AI tools study strategies and productivity hacks for university students in Pakistan. Honest reviews by a real BBA student. Updated weekly." },
      { name: "keywords", content: "AI tools for students, ChatGPT for university, study tips Pakistan, BBA study guide, student productivity 2025" },
      { name: "robots", content: "index follow" },
      { name: "author", content: "Ahmed Raza" },
      { name: "theme-color", content: "#6366F1" },
      { property: "og:site_name", content: "StudyAI Hub" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "StudyAI Hub — Study Smarter With AI" },
      { property: "og:description", content: "Discover the best free AI tools study strategies and productivity hacks for university students in Pakistan. Honest reviews by a real BBA student. Updated weekly." },
      { property: "og:url", content: "https://studyaihub.tech/" },
      { property: "og:image", content: "https://studyaihub.tech/og-image.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@StudyAIHub" },
      { name: "twitter:title", content: "StudyAI Hub — Study Smarter With AI" },
      { name: "twitter:description", content: "Discover the best free AI tools study strategies and productivity hacks for university students in Pakistan. Honest reviews by a real BBA student. Updated weekly." },
      { name: "twitter:image", content: "https://studyaihub.tech/og-image.svg" },
    ],
    links: [
      { rel: "canonical", href: "https://studyaihub.tech/" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://wcqwtuuzxheylcvkubsa.supabase.co" },
      { rel: "preload", as: "style", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://studyaihub.tech/#organization",
              name: "StudyAI Hub",
              url: "https://studyaihub.tech",
              logo: {
                "@type": "ImageObject",
                url: "https://studyaihub.tech/favicon.ico",
              },
              description: "AI tools and study tips for university students.",
              sameAs: [
                "https://twitter.com/StudyAIHub",
                "https://www.linkedin.com/company/studyaihub",
                "https://www.youtube.com/@StudyAIHub",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://studyaihub.tech/#website",
              name: "StudyAI Hub",
              url: "https://studyaihub.tech",
              description: "AI tools and study tips for university students.",
              inLanguage: "en",
              publisher: { "@id": "https://studyaihub.tech/#organization" },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://studyaihub.tech/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script id="usercentrics-cmp" src="https://app.usercentrics.eu/browser-ui/latest/loader.js" data-settings-id="Wy5uV3RmEYRB3y" async></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-25L1S1BCX4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-25L1S1BCX4');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { location } = useRouterState();
  const isPost = location.pathname.startsWith("/blog/") && location.pathname.length > 6;
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className={`flex-1 ${isPost ? "" : "pt-16"} pb-20 md:pb-0`}>
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
        <MobileBottomNav />
        <FloatingChat />
        <NewsletterPopup />
        <StickyNewsletterBar />
      </div>
    </QueryClientProvider>
  );
}
