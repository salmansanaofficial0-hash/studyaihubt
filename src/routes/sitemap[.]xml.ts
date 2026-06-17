import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const BASE_URL = "https://studyaihub.tech";
        const supabase = createClient(
          process.env.SUPABASE_URL ?? "",
          process.env.SUPABASE_PUBLISHABLE_KEY ?? "",
          { auth: { persistSession: false } },
        );
        const [{ data: posts }, { data: cats }] = await Promise.all([
          supabase.from("posts").select("slug, updated_at").eq("published", true),
          supabase.from("categories").select("slug"),
        ]);
        const staticPaths = ["/", "/blog", "/ai-tools", "/about", "/contact"];
        const blog = (posts ?? []).map((p) => `/blog/${p.slug}`);
        const catPaths = (cats ?? []).map((c) => `/category/${c.slug}`);
        const all = [...staticPaths, ...blog, ...catPaths];
        const urls = all
          .map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`)
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
