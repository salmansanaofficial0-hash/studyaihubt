export type Category = {
  name: string;
  slug: string;
  color: string;
  emoji: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  { name: "AI Tools", slug: "ai-tools", color: "#6366F1", emoji: "🤖", description: "In-depth reviews and how-to guides for the best AI tools that help university students learn faster, write better, and research smarter." },
  { name: "Study Tips", slug: "study-tips", color: "#06B6D4", emoji: "📚", description: "Proven study strategies, memory techniques, note-taking systems, and exam-prep workflows that actually work for busy university students." },
  { name: "Productivity", slug: "productivity", color: "#10B981", emoji: "🎯", description: "Time management, focus systems, and productivity hacks for students — get more done in less time without burning out." },
  { name: "Business & Finance", slug: "business-finance", color: "#F59E0B", emoji: "💼", description: "BBA, accounting, economics, and personal finance concepts explained simply for university students and self-learners." },
  { name: "Presentations", slug: "presentations", color: "#EC4899", emoji: "🎤", description: "Design, scripting, and delivery guides to help students build presentations and pitches that genuinely wow the room." },
  { name: "Tech Reviews", slug: "tech-reviews", color: "#8B5CF6", emoji: "💻", description: "Honest, student-focused reviews of laptops, tablets, accessories, and software — what's worth your tuition-budget money." },
];

export function categoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  categoryColor: string;
  content: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  date: string;
  readingTime: string;
  views: number;
  tags: string[];
  featured: boolean;
  popular: boolean;
  emoji: string;
};

const longArticle = (intro: string, sections: { h: string; body: string }[]) => `
${intro}

${sections
  .map(
    (s) => `## ${s.h}

${s.body}`,
  )
  .join("\n\n")}
`;

export const POSTS: Post[] = [
  {
    id: 1,
    slug: "best-ai-tools-for-students-2025",
    title: "10 Best AI Tools for Students in 2025 (Free & Paid)",
    excerpt:
      "Stop wasting hours on assignments. These AI tools will save you 10+ hours every week and seriously upgrade your grades.",
    category: "AI Tools",
    categorySlug: "ai-tools",
    categoryColor: "#6366F1",
    emoji: "🤖",
    content: longArticle(
      "If you're a university student in 2025 and you're not using AI tools, you're working twice as hard for half the result. I'm a BBA student, and AI has genuinely changed how I study, write assignments, prepare presentations, and even revise for finals. In this guide I'll walk you through the 10 tools I actually use every week — what they're good at, what they're not, and how to combine them.",
      [
        {
          h: "1. ChatGPT — the all-rounder",
          body: "ChatGPT (especially GPT-5) is still the most useful general-purpose AI. I use it to break down dense readings, generate practice MCQs from lecture notes, draft outlines for assignments, and explain concepts I didn't understand in class. The trick is to write specific prompts: tell it your level, your subject, and the format you want the answer in. Free plan is enough for most students.",
        },
        {
          h: "2. Notion AI — your second brain",
          body: "Notion is where I keep notes, deadlines, and reading lists. Notion AI sits on top of all that and lets me summarize long pages, generate study guides from raw notes, and turn bullet points into proper paragraphs. If you live in Notion already, this is a no-brainer add-on.",
        },
        {
          h: "3. Perplexity AI — for research papers",
          body: "Unlike ChatGPT, Perplexity cites its sources. When I'm writing a research paper I start in Perplexity to find credible sources and quotes, then jump to Google Scholar to read the actual papers. Free tier is generous.",
        },
        {
          h: "4. Gamma.app — presentations in minutes",
          body: "Gamma turns a topic or outline into a full slide deck in under a minute. The design is genuinely good — not those ugly default PowerPoint templates. For group projects this is a lifesaver.",
        },
        {
          h: "5. Grammarly — writing polish",
          body: "Every assignment goes through Grammarly before submission. The free version catches grammar and clarity issues, paid version checks tone and rewrites awkward sentences. Worth the trial at minimum.",
        },
        {
          h: "6. Otter.ai — never miss a lecture",
          body: "Records lectures and transcribes them in real time. You can search the transcript later, which is gold for revision. Just check with your professor before recording.",
        },
        {
          h: "7. Quillbot — paraphrasing done right",
          body: "Useful for rewriting clunky sentences in your own words. Do not use it to cheat — use it to learn how the same idea can be phrased differently. The grammar checker is also surprisingly good.",
        },
        {
          h: "8. Tome — story-driven decks",
          body: "Similar to Gamma but more narrative-focused. Great for pitch decks if you're doing entrepreneurship or marketing courses.",
        },
        {
          h: "9. Claude — long documents",
          body: "Claude handles huge PDFs and long readings better than most. Upload a 50-page case study and ask it to summarize, find the key arguments, or generate exam questions.",
        },
        {
          h: "10. Eleven Labs — turn notes into audio",
          body: "Convert your notes into natural-sounding audio and listen while commuting. I've genuinely passed exams by listening to my own notes on the bus.",
        },
        {
          h: "How I actually use them together",
          body: "A typical workflow: Perplexity for sources → Claude to summarize PDFs → ChatGPT to draft → Grammarly to polish → Gamma to present. The combo is more powerful than any single tool.",
        },
      ],
    ),
    author: "Ahmed Raza",
    authorBio: "BBA student at University of Karachi. I write about AI tools and productivity for students.",
    authorAvatar: "AR",
    date: "2025-01-15",
    readingTime: "8 min read",
    views: 4200,
    tags: ["AI Tools", "Students", "ChatGPT", "Productivity"],
    featured: true,
    popular: true,
  },
  {
    id: 2,
    slug: "chatgpt-prompts-for-university-students",
    title: "30 ChatGPT Prompts Every University Student Should Steal",
    excerpt:
      "Generic prompts get generic answers. Here are 30 specific prompts I use weekly for assignments, revision, and research.",
    category: "AI Tools",
    categorySlug: "ai-tools",
    categoryColor: "#6366F1",
    emoji: "💬",
    content: longArticle(
      "The difference between a useless ChatGPT answer and a brilliant one is almost always the prompt. After two years of using it for university work, I've collected 30 prompts that consistently produce useful output. Copy them, tweak the bits in brackets, and watch your study time shrink.",
      [
        {
          h: "Prompts for understanding hard topics",
          body: "1. \"Explain [topic] like I'm a first-year university student. Use one real-world example.\"\n2. \"Summarize this PDF in 5 bullet points and 3 likely exam questions: [paste].\"\n3. \"What are the three most common misconceptions about [topic]?\"\n4. \"Give me a 30-second elevator pitch explanation of [concept].\"",
        },
        {
          h: "Prompts for assignments",
          body: "5. \"Write an outline for a 1500-word essay on [topic]. Include 4 main sections with sub-points.\"\n6. \"Suggest 10 strong thesis statements for an essay about [topic].\"\n7. \"Rewrite this paragraph in a more academic tone, but keep the meaning identical: [paste].\"\n8. \"List 5 counter-arguments to my position that [your argument].\"",
        },
        {
          h: "Prompts for exam prep",
          body: "9. \"Generate 10 MCQs with answers based on these notes: [paste].\"\n10. \"Quiz me on [topic] one question at a time. Don't show the answer until I respond.\"\n11. \"Create a comparison table of [concept A] vs [concept B].\"\n12. \"What questions am I most likely to be asked on [topic] in a viva?\"",
        },
        {
          h: "Prompts for presentations",
          body: "13. \"Suggest a strong opening hook for a 10-minute presentation on [topic].\"\n14. \"Give me 5 visual ideas for slides about [topic].\"\n15. \"What are 3 tough questions the audience might ask after this presentation?\"",
        },
        {
          h: "Prompts for productivity",
          body: "16. \"Build a 7-day study plan to learn [topic] from scratch. 2 hours a day.\"\n17. \"Help me write a cold email to a professor asking for research mentorship.\"\n18. \"Suggest 5 ways to improve my study notes on [topic].\"",
        },
        {
          h: "How to make any prompt better",
          body: "Always include: your level (\"I'm a 2nd-year BBA student\"), the format (\"bullet points\", \"table\", \"paragraph\"), the length, and one example of the style you want. Specificity beats length every time.",
        },
      ],
    ),
    author: "Ahmed Raza",
    authorBio: "BBA student at University of Karachi. I write about AI tools and productivity for students.",
    authorAvatar: "AR",
    date: "2025-01-10",
    readingTime: "6 min read",
    views: 3100,
    tags: ["ChatGPT", "Prompts", "AI Tools"],
    featured: true,
    popular: true,
  },
  {
    id: 3,
    slug: "how-to-make-presentations-with-ai",
    title: "How to Make a Killer Presentation With AI (in Under 15 Minutes)",
    excerpt:
      "Forget spending hours on PowerPoint. Here's the exact AI workflow I use to build presentations that get top marks.",
    category: "Presentations",
    categorySlug: "presentations",
    categoryColor: "#EC4899",
    emoji: "🎤",
    content: longArticle(
      "Group presentations used to take my team an entire weekend. Now we ship a 15-slide deck in under 15 minutes — and they look better than what we made manually. Here's the exact workflow.",
      [
        {
          h: "Step 1 — start with a tight outline (3 min)",
          body: "Open ChatGPT or Claude and use this prompt: \"You are a presentation coach. Give me a 10-slide outline for a [length] minute presentation on [topic] for a [course] class. Each slide should have a title and 3 bullet points.\" Iterate once or twice until the outline feels solid.",
        },
        {
          h: "Step 2 — generate the deck with Gamma (5 min)",
          body: "Paste the outline into Gamma.app. Choose a clean template (avoid the dark ones — projectors wash them out). Gamma will generate slides with images, icons, and even charts. Free plan is enough for 1 deck.",
        },
        {
          h: "Step 3 — fix the visuals (4 min)",
          body: "Swap any generic stock photos with real images relevant to your topic. Use Unsplash or generate custom images in ChatGPT (image mode) or Midjourney if your group has access.",
        },
        {
          h: "Step 4 — add a story arc",
          body: "Good presentations follow a story: problem → why it matters → solution → evidence → call to action. Rearrange slides until they follow this flow. AI-generated decks often miss this — you have to add it yourself.",
        },
        {
          h: "Step 5 — script the opening and closing",
          body: "Ask ChatGPT: \"Write a 30-second opening hook and a 20-second closing for this presentation.\" Memorize both word for word. The middle you can speak naturally.",
        },
        {
          h: "Step 6 — practice with AI",
          body: "Use ChatGPT voice mode to ask you tough questions about your topic. This is shockingly effective at preparing for Q&A.",
        },
        {
          h: "Common mistakes to avoid",
          body: "Don't read off slides. Don't use more than 6 words per bullet. Don't pick crazy fonts. Don't use ChatGPT-generated text word for word — rewrite in your voice. And please, don't include the AI emoji generation prompt on slide 11 by accident (yes, I've seen it happen in class).",
        },
      ],
    ),
    author: "Sara Khan",
    authorBio: "Final-year marketing student. Obsessed with design and decks that actually convince people.",
    authorAvatar: "SK",
    date: "2025-01-08",
    readingTime: "7 min read",
    views: 2800,
    tags: ["Presentations", "Gamma", "AI Tools"],
    featured: true,
    popular: true,
  },
  {
    id: 4,
    slug: "pomodoro-technique-complete-guide",
    title: "The Pomodoro Technique: A Complete Guide for University Students",
    excerpt:
      "25 minutes on, 5 minutes off. The simplest study method on earth — and one of the most powerful when you do it right.",
    category: "Productivity",
    categorySlug: "productivity",
    categoryColor: "#10B981",
    emoji: "🍅",
    content: longArticle(
      "The Pomodoro Technique sounds too simple to work — and that's exactly why most students dismiss it. After using it for a full semester I can tell you: it works, but only if you respect the rules.",
      [
        { h: "What it is", body: "Work for 25 minutes (one pomodoro). Take a 5-minute break. After 4 pomodoros, take a longer 15-30 minute break. Repeat." },
        { h: "Why it works", body: "It tricks your brain into starting. 25 minutes feels manageable. Once you start, momentum carries you. It also forces real breaks, which is when your brain consolidates what you just studied." },
        { h: "The right tools", body: "You don't need an app — a kitchen timer works. But I like Pomofocus.io (free, web) and Forest (mobile, gamified). Avoid timers with notifications that pull you back to your phone." },
        { h: "How to actually do it", body: "Pick ONE task per pomodoro. Phone in another room. Headphones in. No tabs open except the one you need. When the timer rings, stop — even mid-sentence. Stand up, drink water, look out the window." },
        { h: "Common mistakes", body: "Treating the break as optional, doing multiple tasks in one pomodoro, using your phone during the break, and skipping the long break after 4 cycles. Each of these kills the technique." },
        { h: "My adapted version for university", body: "For deep work like assignments I use 50/10 instead of 25/5 — 25 minutes isn't enough to get into flow for writing. For revision and flashcards, 25/5 is perfect." },
      ],
    ),
    author: "Bilal Ahmed",
    authorBio: "Engineering student who survives finals week one pomodoro at a time.",
    authorAvatar: "BA",
    date: "2025-01-05",
    readingTime: "5 min read",
    views: 1900,
    tags: ["Productivity", "Study Tips", "Time Management"],
    featured: false,
    popular: true,
  },
  {
    id: 5,
    slug: "best-free-note-taking-apps",
    title: "The 7 Best Free Note-Taking Apps for Students in 2025",
    excerpt:
      "Notion, Obsidian, OneNote — which one is actually worth your time? I tried them all for a full semester so you don't have to.",
    category: "Study Tips",
    categorySlug: "study-tips",
    categoryColor: "#06B6D4",
    emoji: "📝",
    content: longArticle(
      "Pick the wrong note app and you'll spend more time organizing than studying. Here's a no-nonsense comparison after a full semester of testing.",
      [
        { h: "1. Notion — best all-rounder", body: "Free for students with .edu email. Combines notes, tasks, databases. Steep learning curve but worth it." },
        { h: "2. Obsidian — best for deep thinkers", body: "Free. Stores notes locally as markdown. Linking notes builds a personal knowledge graph. Better for long-term study than quick lecture notes." },
        { h: "3. OneNote — best for handwriting", body: "Free. If you have an iPad or Surface, OneNote's stylus support is unmatched. Great for math and diagrams." },
        { h: "4. Apple Notes — best simple option", body: "Free on Apple devices. Search is excellent. Don't underestimate it." },
        { h: "5. Google Keep — best for quick capture", body: "Free. Sticky-note style. Great for to-dos and reminders, not full notes." },
        { h: "6. Logseq — best Obsidian alternative", body: "Free. Outliner-style. Some students prefer it over Obsidian." },
        { h: "7. GoodNotes — best for iPad users", body: "Paid but worth it for handwriting + PDF annotation." },
        { h: "My pick", body: "Notion for organization, Obsidian for deep notes, GoodNotes for lecture-day handwriting. You don't need just one." },
      ],
    ),
    author: "Hira Sheikh",
    authorBio: "Med student and note-taking nerd.",
    authorAvatar: "HS",
    date: "2025-01-03",
    readingTime: "6 min read",
    views: 1500,
    tags: ["Study Tips", "Apps", "Notion"],
    featured: false,
    popular: true,
  },
  {
    id: 6,
    slug: "what-is-roi-simple-explanation",
    title: "What is ROI? A Simple Explanation for BBA Students",
    excerpt:
      "Return on Investment in plain English. The formula, real examples, and the mistakes most students make in exams.",
    category: "Business & Finance",
    categorySlug: "business-finance",
    categoryColor: "#F59E0B",
    emoji: "📈",
    content: longArticle(
      "Every BBA student gets asked about ROI in exams, interviews, and case competitions. Here's the clearest explanation you'll find.",
      [
        { h: "The simple definition", body: "ROI tells you how much money you made compared to how much you spent. That's it." },
        { h: "The formula", body: "ROI = (Net Profit / Cost of Investment) × 100\n\nIf you invested PKR 100,000 and made PKR 130,000 back, your profit is 30,000 and your ROI is 30%." },
        { h: "Why it matters", body: "ROI lets you compare investments fairly. A project that returns 50,000 sounds great until you realize you spent 500,000 to make it (10% ROI). A different project might return only 20,000 but cost 50,000 (40% ROI) — that's the smarter investment." },
        { h: "Common mistakes in exams", body: "Forgetting to subtract costs from revenue (that's profit, not revenue). Forgetting to multiply by 100 (then your answer is 0.3 instead of 30%). Ignoring time (a 30% ROI in 1 year is great, in 10 years it's terrible)." },
        { h: "Real-world example", body: "A campus food truck spends PKR 200,000 on equipment and ingredients. In 3 months it makes PKR 320,000 in sales with PKR 80,000 in additional costs. Profit = 320,000 - 80,000 - 200,000 = 40,000. ROI = 40,000 / 200,000 × 100 = 20%." },
        { h: "ROI vs other metrics", body: "ROI is simple but ignores time. For deeper analysis you'll use NPV, IRR, and payback period — but those build on this foundation." },
      ],
    ),
    author: "Ahmed Raza",
    authorBio: "BBA student at University of Karachi. I write about AI tools and productivity for students.",
    authorAvatar: "AR",
    date: "2024-12-28",
    readingTime: "4 min read",
    views: 2400,
    tags: ["Business", "Finance", "BBA"],
    featured: false,
    popular: true,
  },
  {
    id: 7,
    slug: "how-to-avoid-procrastination",
    title: "How to Beat Procrastination as a Student (That Actually Works)",
    excerpt:
      "Stop reading more articles about procrastination. Do these 5 things instead — based on what worked for me, not generic advice.",
    category: "Productivity",
    categorySlug: "productivity",
    categoryColor: "#10B981",
    emoji: "⏰",
    content: longArticle(
      "Most articles about procrastination are written by people who don't actually procrastinate. Here's what works in real student life.",
      [
        { h: "1. Make starting embarrassingly easy", body: "If you have to write an essay, open the doc and write one sentence. That's it. Once you've started, you'll usually keep going. The hard part is opening the doc." },
        { h: "2. Use the 2-minute rule", body: "If a task takes less than 2 minutes, do it now. Emails, sending a message, finding a file — these small things pile up and become huge if you delay them." },
        { h: "3. Phone in another room", body: "Not on your desk face-down. In another room. This single change does more than any productivity app." },
        { h: "4. Body doubling", body: "Study with a friend on Zoom (cameras on, microphones off). The feeling of being watched is enough to keep you on task. Sounds weird, works incredibly well." },
        { h: "5. Schedule rest, not just work", body: "When you don't schedule rest, every minute feels like it should be productive — so you procrastinate to escape that pressure. Block off Friday night. Take Sunday off. Then it's easier to focus on Monday." },
      ],
    ),
    author: "Sara Khan",
    authorBio: "Final-year marketing student. Obsessed with design and decks that actually convince people.",
    authorAvatar: "SK",
    date: "2024-12-22",
    readingTime: "5 min read",
    views: 3300,
    tags: ["Productivity", "Mental Health", "Study Tips"],
    featured: false,
    popular: true,
  },
  {
    id: 8,
    slug: "best-budget-laptops-for-students",
    title: "Best Budget Laptops for Students in 2025 (Under PKR 150K)",
    excerpt:
      "You don't need an M3 MacBook to crush university. Here are 6 laptops that actually deliver under a tight budget.",
    category: "Tech Reviews",
    categorySlug: "tech-reviews",
    categoryColor: "#8B5CF6",
    emoji: "💻",
    content: longArticle(
      "Buying your first university laptop is stressful. Here are the 6 I'd genuinely recommend in 2025, tested or used by friends.",
      [
        { h: "What actually matters", body: "Battery life (8+ hours), keyboard, screen quality, 16GB RAM if possible, SSD. CPU benchmarks matter less than you think for typical student work." },
        { h: "1. Lenovo ThinkPad E14 (refurbished)", body: "Best keyboard at this price. Solid build, great for note-taking in lectures." },
        { h: "2. HP Pavilion 14", body: "Light, decent battery, good screen. Available widely in Pakistan." },
        { h: "3. Acer Aspire 5", body: "Most laptop for the money. Plasticky but performs above its price." },
        { h: "4. MacBook Air M1 (used)", body: "If you can find one used, M1 is still incredible. Battery alone is worth it." },
        { h: "5. Dell Inspiron 14", body: "Reliable workhorse. Easy to repair, parts are widely available." },
        { h: "6. ASUS Vivobook 15", body: "Bigger screen if you do design or coding. Good value." },
        { h: "What to avoid", body: "Anything with 4GB RAM, anything with eMMC storage (not SSD), and anything labeled \"Chromebook\" unless you exclusively use Google Docs." },
      ],
    ),
    author: "Bilal Ahmed",
    authorBio: "Engineering student who survives finals week one pomodoro at a time.",
    authorAvatar: "BA",
    date: "2024-12-18",
    readingTime: "6 min read",
    views: 4500,
    tags: ["Tech", "Laptops", "Reviews"],
    featured: true,
    popular: true,
  },
  {
    id: 9,
    slug: "time-management-tips-university",
    title: "Time Management for University Students: 8 Habits That Actually Stick",
    excerpt:
      "Time management isn't about apps or planners. It's about a few small habits that compound. Here are 8 that worked for me.",
    category: "Study Tips",
    categorySlug: "study-tips",
    categoryColor: "#06B6D4",
    emoji: "⏳",
    content: longArticle(
      "I tried every productivity system and the truth is: simple beats clever. Here are 8 habits that genuinely changed my semesters.",
      [
        { h: "1. One calendar, everything in it", body: "Classes, deadlines, gym, family events. If it's not in the calendar it doesn't exist." },
        { h: "2. Weekly review every Sunday", body: "15 minutes. Look at the week ahead. Move deadlines forward in your head. No surprises on Monday." },
        { h: "3. Theme your days", body: "Monday = readings, Tuesday = assignments, etc. Removes decision fatigue." },
        { h: "4. Two-list system", body: "One list for today (3 items max). One list for everything else. Don't mix them." },
        { h: "5. Cut commute waste", body: "Audiobooks, lecture recordings, flashcards on your phone — turn 30 minutes of commute into 30 minutes of study." },
        { h: "6. Batch similar tasks", body: "All emails at 5pm. All readings in one block. Switching costs are real." },
        { h: "7. Protect your peak hours", body: "Find your 2-3 most focused hours and never schedule meetings or classes there if you can help it." },
        { h: "8. Sleep is a productivity tool", body: "I'm serious. 7 hours of sleep makes the next day twice as productive. Trade Netflix, not sleep." },
      ],
    ),
    author: "Hira Sheikh",
    authorBio: "Med student and note-taking nerd.",
    authorAvatar: "HS",
    date: "2024-12-15",
    readingTime: "6 min read",
    views: 2100,
    tags: ["Study Tips", "Time Management", "Productivity"],
    featured: false,
    popular: false,
  },
  {
    id: 10,
    slug: "how-to-use-ai-for-research-papers",
    title: "How to Use AI for Research Papers (Without Getting Caught for Plagiarism)",
    excerpt:
      "AI can 10x your research speed if you use it right — and get you expelled if you don't. Here's the ethical workflow.",
    category: "AI Tools",
    categorySlug: "ai-tools",
    categoryColor: "#6366F1",
    emoji: "🔬",
    content: longArticle(
      "AI is brilliant for research, dangerous for writing. The key is knowing where the line is. Here's the workflow I use that's helped me ship better papers, faster, while staying on the right side of academic integrity.",
      [
        { h: "Step 1 — discovery with Perplexity", body: "Start with broad questions about your topic. Perplexity will cite real sources you can chase down. Don't copy its summary — use it as a map." },
        { h: "Step 2 — read with Claude", body: "Upload your PDFs to Claude (or use NotebookLM). Ask it to summarize, extract key arguments, and list counter-arguments. You still have to read the papers, but this triages what to read deeply." },
        { h: "Step 3 — outline with ChatGPT", body: "Once you've read enough, draft your outline yourself. Then ask ChatGPT to critique it — \"what's missing, what's weak, what would a skeptical reader question?\"" },
        { h: "Step 4 — write yourself", body: "This is the line. WRITE THE PAPER YOURSELF. Use AI to clarify sentences, suggest synonyms, or check grammar — not to generate paragraphs." },
        { h: "Step 5 — cite everything", body: "Use Zotero or Mendeley from day one. Most universities use Turnitin AI detectors now — getting caught is a real risk and the punishments are getting harsher." },
        { h: "What's allowed vs not", body: "Allowed: AI for brainstorming, summarizing your own readings, grammar checking, outlining. Not allowed: AI-generated paragraphs submitted as your own, paraphrasing AI text without disclosure, citing sources you haven't actually read." },
        { h: "How to declare AI use", body: "Most universities now have AI policies — read yours. A common standard is to add a methodology note: \"I used ChatGPT to brainstorm outlines and Perplexity to find sources. All writing and analysis is my own.\" Being transparent is almost always safe." },
      ],
    ),
    author: "Ahmed Raza",
    authorBio: "BBA student at University of Karachi. I write about AI tools and productivity for students.",
    authorAvatar: "AR",
    date: "2024-12-10",
    readingTime: "7 min read",
    views: 3700,
    tags: ["AI Tools", "Research", "Academic Integrity"],
    featured: true,
    popular: true,
  },
];

export function postBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function postsByCategory(slug: string) {
  return POSTS.filter((p) => p.categorySlug === slug);
}
