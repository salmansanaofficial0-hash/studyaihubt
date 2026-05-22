export type Tool = {
  name: string;
  emoji: string;
  description: string;
  category: "Writing" | "Research" | "Presentations" | "Productivity";
  pricing: "Free" | "Freemium" | "Paid";
  rating: number;
  url: string;
  tags: string[];
};

export const TOOLS: Tool[] = [
  { name: "ChatGPT", emoji: "💬", description: "The all-rounder AI assistant. Great for explanations, drafts, and study prep.", category: "Writing", pricing: "Freemium", rating: 5, url: "https://chat.openai.com", tags: ["AI", "Writing"] },
  { name: "Notion AI", emoji: "🗂️", description: "AI built into your notes. Summarize, rewrite, and generate inside Notion.", category: "Productivity", pricing: "Freemium", rating: 4, url: "https://notion.so", tags: ["Notes", "Productivity"] },
  { name: "Gamma.app", emoji: "🎨", description: "Generate beautiful presentations from a prompt in under a minute.", category: "Presentations", pricing: "Freemium", rating: 5, url: "https://gamma.app", tags: ["Slides", "Design"] },
  { name: "Grammarly", emoji: "✍️", description: "Polish every assignment. Grammar, clarity, and tone suggestions.", category: "Writing", pricing: "Freemium", rating: 4, url: "https://grammarly.com", tags: ["Writing", "Editing"] },
  { name: "Perplexity AI", emoji: "🔎", description: "Search with citations. Perfect first stop for research papers.", category: "Research", pricing: "Freemium", rating: 5, url: "https://perplexity.ai", tags: ["Research", "Search"] },
  { name: "Tome", emoji: "📖", description: "Story-driven decks for pitches and case studies.", category: "Presentations", pricing: "Freemium", rating: 4, url: "https://tome.app", tags: ["Slides"] },
  { name: "Otter.ai", emoji: "🎙️", description: "Record and transcribe lectures in real time. Search the transcript later.", category: "Productivity", pricing: "Freemium", rating: 4, url: "https://otter.ai", tags: ["Lectures", "Notes"] },
  { name: "Quillbot", emoji: "🔁", description: "Paraphrase, summarize, and check grammar. Great for rewording your own drafts.", category: "Writing", pricing: "Freemium", rating: 4, url: "https://quillbot.com", tags: ["Writing"] },
  { name: "Claude", emoji: "🧠", description: "Handles huge PDFs and long readings better than most AI assistants.", category: "Research", pricing: "Freemium", rating: 5, url: "https://claude.ai", tags: ["Research", "AI"] },
  { name: "NotebookLM", emoji: "📓", description: "Upload sources and chat with them. Free from Google.", category: "Research", pricing: "Free", rating: 5, url: "https://notebooklm.google", tags: ["Research"] },
  { name: "Eleven Labs", emoji: "🔊", description: "Convert notes into natural-sounding audio for revision on the go.", category: "Productivity", pricing: "Freemium", rating: 4, url: "https://elevenlabs.io", tags: ["Audio"] },
  { name: "Pomofocus", emoji: "🍅", description: "A clean Pomodoro timer in the browser. No login required.", category: "Productivity", pricing: "Free", rating: 4, url: "https://pomofocus.io", tags: ["Timer", "Focus"] },
];
