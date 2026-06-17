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
      { title: "StudyAI Hub — Study Smarter With AI, Not Harder" },
      { name: "description", content: "The honest guide to AI tools, study strategies, and productivity hacks for university students." },
      { name: "author", content: "StudyAI Hub" },
      { name: "theme-color", content: "#6366F1" },
      { property: "og:site_name", content: "StudyAI Hub" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "StudyAI Hub — Study Smarter With AI, Not Harder" },
      { property: "og:description", content: "The honest guide to AI tools, study strategies, and productivity hacks for university students." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@StudyAIHub" },
      { name: "twitter:title", content: "StudyAI Hub — Study Smarter With AI, Not Harder" },
      { name: "twitter:description", content: "The honest guide to AI tools, study strategies, and productivity hacks for university students." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8f61bf2a-369c-48e5-aba4-d3c305533035/id-preview-4718dce1--844a243d-3c7e-4168-b4d1-c35480effa4a.lovable.app-1779430450090.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8f61bf2a-369c-48e5-aba4-d3c305533035/id-preview-4718dce1--844a243d-3c7e-4168-b4d1-c35480effa4a.lovable.app-1779430450090.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
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
