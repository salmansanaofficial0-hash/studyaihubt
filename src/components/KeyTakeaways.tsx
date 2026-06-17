import { Pin } from "lucide-react";

export function KeyTakeaways({ content }: { content: string }) {
  const headings: string[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const m = /^##\s+(.+)$/.exec(line.trim());
    if (m) {
      headings.push(m[1].trim());
      if (headings.length >= 3) break;
    }
  }
  if (headings.length < 2) return null;

  return (
    <div className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <Pin className="h-4 w-4 text-primary" />
        <p className="font-semibold">Key Takeaways</p>
      </div>
      <ul className="space-y-2">
        {headings.map((h, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="text-primary font-bold">{i + 1}.</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
