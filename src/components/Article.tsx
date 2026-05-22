import { useEffect, useMemo, useState } from "react";

export type Heading = { id: string; text: string; level: number };

export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const out: Heading[] = [];
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (m) {
      const text = m[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      out.push({ id, text, level: m[1].length });
    }
  }
  return out;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);

  useEffect(() => {
    const onScroll = () => {
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  if (!headings.length) return null;
  return (
    <nav className="text-sm">
      <p className="font-semibold mb-3">On this page</p>
      <ul className="space-y-2 border-l border-border">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? 16 : 0 }}>
            <a
              href={`#${h.id}`}
              className={`block pl-3 -ml-px border-l-2 transition-colors ${
                active === h.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Render simple markdown-lite article content (## h2, ### h3, paragraphs, - lists, > quotes, `code`). */
export function ArticleBody({ content }: { content: string }) {
  const blocks = useMemo(() => parseBlocks(content), [content]);
  return (
    <div className="prose-article">
      {blocks.map((b, i) => {
        if (b.type === "h2")
          return (
            <h2 key={i} id={slug(b.text)}>
              {b.text}
            </h2>
          );
        if (b.type === "h3")
          return (
            <h3 key={i} id={slug(b.text)}>
              {b.text}
            </h3>
          );
        if (b.type === "ul")
          return (
            <ul key={i}>
              {b.items.map((it, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: inline(it) }} />
              ))}
            </ul>
          );
        if (b.type === "ol")
          return (
            <ol key={i}>
              {b.items.map((it, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: inline(it) }} />
              ))}
            </ol>
          );
        if (b.type === "quote") return <blockquote key={i}>{b.text}</blockquote>;
        if (b.type === "p") return <p key={i} dangerouslySetInnerHTML={{ __html: inline(b.text) }} />;
        return null;
      })}
    </div>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] };

function parseBlocks(content: string): Block[] {
  const lines = content.split("\n");
  const out: Block[] = [];
  let buf: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: string[] = [];

  const flushPara = () => {
    if (buf.length) {
      out.push({ type: "p", text: buf.join(" ").trim() });
      buf = [];
    }
  };
  const flushList = () => {
    if (listType) {
      out.push({ type: listType, items: listItems });
      listType = null;
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    const ul = /^[-*]\s+(.+)$/.exec(line);
    const ol = /^\d+\.\s+(.+)$/.exec(line);
    const q = /^>\s+(.+)$/.exec(line);
    if (h2) {
      flushPara();
      flushList();
      out.push({ type: "h2", text: h2[1] });
    } else if (h3) {
      flushPara();
      flushList();
      out.push({ type: "h3", text: h3[1] });
    } else if (ul) {
      flushPara();
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(ul[1]);
    } else if (ol) {
      flushPara();
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(ol[1]);
    } else if (q) {
      flushPara();
      flushList();
      out.push({ type: "quote", text: q[1] });
    } else {
      flushList();
      buf.push(line);
    }
  }
  flushPara();
  flushList();
  return out;
}

function inline(s: string) {
  // escape HTML, then apply inline code
  const esc = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return esc.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}
