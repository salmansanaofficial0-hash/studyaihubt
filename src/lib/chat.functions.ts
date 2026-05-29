import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

const SYSTEM_PROMPT = `You are StudyBot, the friendly AI study assistant for StudyAI Hub — a site that helps university students study smarter with AI tools.

Help students with:
- Recommending AI tools (ChatGPT, Claude, Gemini, Perplexity, NotebookLM, etc.) for studying, writing, research
- Study techniques (active recall, spaced repetition, Pomodoro, Feynman method)
- Productivity, note-taking, time management, exam prep
- Honest, practical advice — not hype

Rules:
- Keep answers concise (2-4 short paragraphs max, or short bullet lists)
- Be friendly and encouraging
- If asked something off-topic (medical, legal, personal), gently redirect to studying
- Never invent fake URLs or fake citations`;

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

export const chatWithStudyBot = createServerFn({ method: "POST" })
  .inputValidator((input: { messages: Array<{ role: "user" | "assistant"; content: string }> }) =>
    z.object({
      messages: z.array(MessageSchema).min(1).max(20),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("AI assistant not configured");

    const res = await fetch(GATEWAY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (res.status === 429) throw new Error("Too many requests — try again in a minute.");
    if (res.status === 402) throw new Error("AI credits exhausted.");
    if (!res.ok) throw new Error(`AI error (${res.status})`);

    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const reply = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { reply };
  });
