import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithStudyBot } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm StudyBot 👋 Ask me about AI tools for studying, productivity tips, exam prep, or anything else to study smarter.",
};

const STORAGE_KEY = "studybot_history_v1";

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [GREETING];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [GREETING];
      const parsed = JSON.parse(raw) as Msg[];
      if (!Array.isArray(parsed) || parsed.length === 0) return [GREETING];
      return parsed;
    } catch {
      return [GREETING];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const chat = useServerFn(chatWithStudyBot);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, open]);

  // Persist last 5 messages (plus greeting) across navigations
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const toStore = messages.length <= 6 ? messages : [GREETING, ...messages.slice(-5)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      /* ignore quota errors */
    }
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setErr(null);
    try {
      const r = await chat({ data: { messages: next.slice(-12) } });
      setMessages([...next, { role: "assistant", content: r.reply || "Sorry, I didn't catch that." }]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI chat" : "Open AI study assistant"}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 h-14 w-14 rounded-full bg-gradient-brand text-white shadow-lg hover:scale-105 active:scale-95 transition-transform inline-flex items-center justify-center"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="StudyBot AI assistant"
          className="fixed z-50 bottom-36 md:bottom-24 right-4 md:right-6 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-12rem))] rounded-2xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="bg-gradient-brand text-white p-4 flex items-center gap-3">
            <span className="h-9 w-9 rounded-full bg-white/20 inline-flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="font-semibold leading-tight">StudyBot</p>
              <p className="text-xs text-white/85">AI study assistant · always free</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 text-sm inline-flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                </div>
              </div>
            )}
            {err && <p className="text-xs text-destructive text-center">{err}</p>}
          </div>

          <form onSubmit={send} className="border-t border-border p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Ask anything about studying…"
              className="flex-1 px-3 py-2 rounded-lg bg-muted text-sm outline-none focus:ring-2 ring-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="h-10 w-10 rounded-lg bg-primary text-primary-foreground inline-flex items-center justify-center disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
