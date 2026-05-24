import { useState } from "react";
import { Sparkles, MessageSquare, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { summarizePost, askPostQuestion } from "@/lib/ai.functions";

export function AIAssistant({ title, content }: { title: string; content: string }) {
  const summarize = useServerFn(summarizePost);
  const ask = useServerFn(askPostQuestion);

  const [summary, setSummary] = useState<string>("");
  const [sumLoading, setSumLoading] = useState(false);
  const [sumErr, setSumErr] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [askLoading, setAskLoading] = useState(false);
  const [askErr, setAskErr] = useState<string | null>(null);

  async function doSummarize() {
    setSumLoading(true); setSumErr(null);
    try {
      const r = await summarize({ data: { title, content } });
      setSummary(r.summary);
    } catch (e) {
      setSumErr(e instanceof Error ? e.message : "Failed");
    } finally { setSumLoading(false); }
  }

  async function doAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setAskLoading(true); setAskErr(null); setAnswer("");
    try {
      const r = await ask({ data: { title, content, question: q } });
      setAnswer(r.answer);
    } catch (e) {
      setAskErr(e instanceof Error ? e.message : "Failed");
    } finally { setAskLoading(false); }
  }

  return (
    <div className="mt-10 rounded-2xl border border-border overflow-hidden">
      <div className="bg-gradient-brand text-white p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <p className="font-semibold">AI Study Assistant</p>
        </div>
        <p className="mt-1 text-xs text-white/85">Summarize this article or ask a question about it.</p>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <button
            onClick={doSummarize}
            disabled={sumLoading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-70"
          >
            {sumLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {summary ? "Re-summarize" : "Summarize with AI"}
          </button>
          {sumErr && <p className="mt-2 text-sm text-destructive">{sumErr}</p>}
          {summary && (
            <div className="mt-4 p-4 rounded-lg bg-muted text-sm whitespace-pre-wrap leading-relaxed">{summary}</div>
          )}
        </div>

        <form onSubmit={doAsk} className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Ask a question about this article
          </label>
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              maxLength={1000}
              placeholder="e.g. What's the main takeaway?"
              className="flex-1 px-3 py-2 rounded-md bg-muted text-sm outline-none focus:ring-2 ring-primary"
            />
            <button disabled={askLoading || !q.trim()} className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-70 inline-flex items-center gap-2">
              {askLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
            </button>
          </div>
          {askErr && <p className="text-sm text-destructive">{askErr}</p>}
          {answer && (
            <div className="mt-3 p-4 rounded-lg bg-muted text-sm whitespace-pre-wrap leading-relaxed">{answer}</div>
          )}
        </form>
      </div>
    </div>
  );
}
