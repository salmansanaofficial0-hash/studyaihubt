import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

async function callGateway(messages: Array<{ role: string; content: string }>) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI gateway not configured");
  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model: MODEL, messages }),
  });
  if (res.status === 429) throw new Error("Rate limited — try again in a minute.");
  if (res.status === 402) throw new Error("AI credits exhausted. Please add funds.");
  if (!res.ok) throw new Error(`AI error (${res.status})`);
  const json = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
  return json.choices?.[0]?.message?.content?.trim() ?? "";
}

export const summarizePost = createServerFn({ method: "POST" })
  .inputValidator((input: { title: string; content: string }) =>
    z.object({
      title: z.string().min(1).max(300),
      content: z.string().min(1).max(50_000),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const out = await callGateway([
      { role: "system", content: "You are a helpful study assistant. Summarize articles for university students in 4-6 concise bullet points with key takeaways. Use plain text bullets starting with •." },
      { role: "user", content: `Title: ${data.title}\n\n${data.content}` },
    ]);
    return { summary: out };
  });

export const askPostQuestion = createServerFn({ method: "POST" })
  .inputValidator((input: { title: string; content: string; question: string }) =>
    z.object({
      title: z.string().min(1).max(300),
      content: z.string().min(1).max(50_000),
      question: z.string().min(1).max(1000),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const out = await callGateway([
      { role: "system", content: "You are a helpful study assistant. Answer the user's question using ONLY the provided article. If the article doesn't cover it, say so honestly. Keep answers concise (2-4 short paragraphs)." },
      { role: "user", content: `Article title: ${data.title}\n\nArticle:\n${data.content}\n\nQuestion: ${data.question}` },
    ]);
    return { answer: out };
  });
