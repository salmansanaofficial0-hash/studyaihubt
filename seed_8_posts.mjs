const SUPABASE_URL = "https://wcqwtuuzxheylcvkubsa.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcXd0dXV6eGhleWxjdmt1YnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MTU5MTcsImV4cCI6MjA5NDk5MTkxN30.5VA6Tv5CrzockpuzqirJ8hixrTHV61vkhasQIMaatIY";

const cat_ai = "5b61c291-9f71-4b18-a7a1-b36d9e1101ae";
const cat_study = "604fdd89-4c98-42ba-a715-1c158fa70f3f";
const cat_prod = "a6847be1-9057-4d9d-b55b-34d372e73345";
const cat_bus = "4206a92b-3517-4da0-b1e5-0c35e7fcd32d";
const cat_pres = "f33c3956-2514-447e-9c20-3f26e13f9350";
const cat_tech = "e585526b-70b4-4b59-99e5-95643e26228a";

const newPosts = [
  {
    title: "Top 7 Free AI Tools Every Student Needs in 2025",
    slug: "top-7-free-ai-tools-every-student-needs-2025",
    content: `## The AI Revolution for Students
AI is moving faster than ever, and 2025 is the year where having an AI workflow is no longer optional—it's a requirement to stay competitive. In this guide, we break down the top 7 free AI tools you need to know.

### 1. Claude 3.5 Sonnet
While everyone uses ChatGPT, Claude 3.5 is the hidden gem for writing and analysis. Its context window allows you to upload entire textbooks and ask nuanced questions without hallucination.

### 2. Perplexity AI
Forget Google. Perplexity is your AI research assistant. It cites sources, reads recent web pages, and gives you a summary with footnotes. Perfect for literature reviews.

### 3. NotebookLM
Google's NotebookLM is incredible. You can drop in your lecture slides and it will generate an audio podcast of two AI hosts discussing your class material. It's surreal and amazing for auditory learners.

### 4. Gamma
Building presentations used to take hours. With Gamma, you just provide an outline and it generates a stunning slide deck in 30 seconds.

### 5. ChatPDF
For quick queries on a single paper, ChatPDF is the fastest way to extract methodology, results, and limitations without reading 40 pages of jargon.

### 6. GrammarlyGO
Grammarly's built-in generative AI is great for rephrasing clunky sentences right inside your Google Docs.

### 7. Notion AI
Notion AI seamlessly organizes your class notes, summarizes long lectures, and helps you create action items instantly.

## Conclusion
Start integrating these into your daily routine. The students who learn to leverage AI effectively will be the ones who succeed in the modern academic landscape.`,
    excerpt: "Discover the best free AI tools for 2025, from Claude 3.5 to NotebookLM, and learn how to implement them in your daily university workflow.",
    category_id: cat_ai,
    cover_emoji: "🚀",
    difficulty: "Beginner",
    reading_time: 5,
    author_name: "Salman Sana",
    author_avatar: "SS",
    author_bio: "BBA student exploring the intersection of education and technology.",
    tags: ["AI Tools", "Free", "2025"],
    published: true,
    featured: true,
    popular: true,
    views: 1250,
    likes: 45
  },
  {
    title: "How to Build a Second Brain in Notion for University",
    slug: "how-to-build-a-second-brain-in-notion",
    content: `## Why You Need a Second Brain
University throws an overwhelming amount of information at you. If you rely solely on your biological brain to remember deadlines, lecture notes, and assignment criteria, you'll burn out.

Enter the **Second Brain**—a digital system designed to store, organize, and retrieve information effortlessly.

### The PARA Method
The core of a Second Brain is the PARA method, coined by Tiago Forte. Here's how it adapts to student life:

*   **Projects:** Things with a deadline. (e.g., "Marketing Final Presentation", "Midterm Essay")
*   **Areas:** Ongoing responsibilities. (e.g., "Finance 101", "Extracurriculars", "Health")
*   **Resources:** Topics of interest. (e.g., "AI Prompts", "Job Interview Prep")
*   **Archives:** Inactive items from the above categories.

### Setting it up in Notion
Notion is the perfect tool for this because of its relational databases.
1.  **Create a Master Tasks Database:** This is where every single to-do lives.
2.  **Create a Master Classes Database:** Track your courses here.
3.  **Relate them:** Link your tasks to your classes so you can filter your to-do list by subject.

### The Capture Habit
The most important part of a Second Brain is capturing information *immediately*. Use Notion Web Clipper or the mobile app widget to save things on the go.

### Reviewing and Distilling
Every Sunday, spend 15 minutes reviewing your capture inbox. Move things to their appropriate folders, highlight key takeaways, and plan your upcoming week.

Take control of your digital life, and watch your stress levels plummet.`,
    excerpt: "A step-by-step guide to setting up a Notion Second Brain using the PARA method to organize your entire university life.",
    category_id: cat_prod,
    cover_emoji: "🧠",
    difficulty: "Intermediate",
    reading_time: 7,
    author_name: "Salman Sana",
    author_avatar: "SS",
    author_bio: "BBA student exploring the intersection of education and technology.",
    tags: ["Notion", "Productivity", "Systems"],
    published: true,
    featured: false,
    popular: true,
    views: 890,
    likes: 32
  },
  {
    title: "ChatGPT vs Claude 3: Which is Better for Academic Research?",
    slug: "chatgpt-vs-claude-academic-research",
    content: `## The Battle of the LLMs
When doing academic research, you need accuracy, nuance, and zero hallucinations. The two heavyweights right now are ChatGPT (GPT-4o) and Claude (Claude 3.5 Sonnet). But which one should you use?

### ChatGPT: The Swiss Army Knife
**Pros:**
*   **Web Browsing:** It searches the web effectively.
*   **Data Analysis:** The Advanced Data Analysis tool is incredible for plotting charts from CSV files.
*   **Voice Mode:** Great for verbal brainstorming.

**Cons:**
*   Can be overly verbose and "salesy" in its tone.
*   Sometimes ignores negative constraints (e.g., "Do not use bullet points").

### Claude 3.5: The Scholar
**Pros:**
*   **Writing Style:** Claude's writing is significantly more natural, less robotic, and better suited for academic drafting.
*   **Large Context Window:** You can upload massive PDFs, and it genuinely reads and comprehends them without forgetting the middle sections.
*   **Artifacts:** Claude can generate UI components, diagrams, and code snippets in a separate window.

**Cons:**
*   No internet browsing capabilities out-of-the-box in the free tier (without relying on integrations).

### The Verdict
For **finding sources and analyzing raw data**, use ChatGPT.
For **synthesizing large PDFs, writing literature reviews, and drafting essays**, Claude is miles ahead.

**Pro Tip:** Use Perplexity to find the sources, and Claude to analyze and synthesize them!`,
    excerpt: "An honest comparison of ChatGPT and Claude for university research, writing, and data analysis.",
    category_id: cat_ai,
    cover_emoji: "⚔️",
    difficulty: "Beginner",
    reading_time: 6,
    author_name: "Salman Sana",
    author_avatar: "SS",
    author_bio: "BBA student exploring the intersection of education and technology.",
    tags: ["ChatGPT", "Claude", "Research"],
    published: true,
    featured: true,
    popular: false,
    views: 2100,
    likes: 88
  },
  {
    title: "The Ultimate Guide to Spaced Repetition Using Anki",
    slug: "ultimate-guide-spaced-repetition-anki",
    content: `## Stop Cramming. Start Retaining.
If you're studying medicine, law, or any subject with heavy memorization, cramming won't work long-term. You need Spaced Repetition.

### What is Spaced Repetition?
It's a learning technique that incorporates increasing intervals of time between subsequent review of previously learned material. It exploits the psychological spacing effect.

### Enter Anki
Anki is a free, open-source flashcard program that uses a spaced repetition algorithm. Here’s how to use it effectively.

### 1. Make Your Own Cards
Don't just download pre-made decks. The act of creating the cards is 50% of the learning process. Phrase your cards as questions, not just definitions.

### 2. The Minimum Information Principle
Keep your cards incredibly simple. One fact per card. If a card has a paragraph on the back, you will fail it constantly.
*   **Bad:** What are the functions of the liver? (Answers: A, B, C, D, E)
*   **Good:** Does the liver produce bile? (Yes)

### 3. Use Cloze Deletions
Cloze deletions (fill-in-the-blanks) are the fastest way to make cards.
Example: The powerhouse of the cell is the {{c1::mitochondria}}.

### 4. Do Your Reviews Every Day
The algorithm only works if you trust it. If you skip 3 days of reviews, they pile up, and you'll get overwhelmed. Make it a daily habit—do them on the bus, in line for coffee, or right when you wake up.

### Conclusion
Anki has a steep learning curve, but once you master it, you essentially guarantee that you will never forget a fact again.`,
    excerpt: "Learn how to use Anki and the principles of spaced repetition to memorize anything for your university exams.",
    category_id: cat_study,
    cover_emoji: "🔁",
    difficulty: "Advanced",
    reading_time: 8,
    author_name: "Salman Sana",
    author_avatar: "SS",
    author_bio: "BBA student exploring the intersection of education and technology.",
    tags: ["Anki", "Spaced Repetition", "Exams"],
    published: true,
    featured: false,
    popular: true,
    views: 1540,
    likes: 67
  },
  {
    title: "How to Create Stunning Presentations in 10 Minutes with AI",
    slug: "create-stunning-presentations-with-ai",
    content: `## Death by PowerPoint is Over
We've all sat through terrible presentations with walls of text and generic clip art. As a student, your presentation grade often heavily depends on the visual quality of your slides.

Luckily, AI has made this process effortless. Here is the ultimate 10-minute workflow.

### Step 1: The Outline (ChatGPT/Claude) - 3 mins
Never start in PowerPoint. Start in a text editor or an AI chat.
Prompt: *"I need to create a 10-minute presentation on [Topic] for my [Class Level] class. Provide a slide-by-slide outline with bullet points for the content and speaker notes."*

### Step 2: The Design (Gamma.app) - 5 mins
Gamma is currently the best AI presentation builder.
1. Go to Gamma.app.
2. Select "Create with AI" -> "Text to Deck".
3. Paste the outline generated by ChatGPT.
4. Pick a visually appealing theme (stick to dark mode or minimalist themes for a professional look).
5. Click Generate.

### Step 3: Refine and Edit - 2 mins
AI isn't perfect. Review the slides to ensure accuracy.
*   **Less is More:** Ensure no slide has more than 5 bullet points.
*   **Visuals:** Swap out any generic AI images with high-quality Unsplash photos or clean diagrams.

### Pro Tips for Presenting
*   **Don't read the slides:** The slides are for the audience, the speaker notes are for you.
*   **Contrast:** Ensure your text contrasts heavily with the background so it's readable on a bad projector.

With this workflow, you can stop stressing about formatting and focus entirely on your delivery.`,
    excerpt: "Stop wasting hours formatting slides. Use this 10-minute AI workflow to build beautiful, A+ presentations.",
    category_id: cat_pres,
    cover_emoji: "📊",
    difficulty: "Beginner",
    reading_time: 4,
    author_name: "Salman Sana",
    author_avatar: "SS",
    author_bio: "BBA student exploring the intersection of education and technology.",
    tags: ["Presentations", "Gamma", "Workflow"],
    published: true,
    featured: false,
    popular: false,
    views: 650,
    likes: 21
  },
  {
    title: "5 Study Hacks to Ace Your Business Strategy Finals",
    slug: "5-study-hacks-business-strategy-finals",
    content: `## Conquering Business Strategy
Business strategy isn't about memorizing formulas; it's about applying frameworks to ambiguous, real-world problems. Here are 5 hacks to study effectively for strategy finals.

### 1. Master the Core Frameworks
You must know these inside and out:
*   Porter's Five Forces
*   PESTLE Analysis
*   SWOT (and more importantly, TOWS)
*   Value Chain Analysis
*   VRIO Framework

Don't just memorize the acronyms. Understand *when* to apply them.

### 2. Use AI to Generate Case Studies
The best way to practice is by doing mini-cases.
**Prompt for ChatGPT:** *"Give me a short, 3-paragraph business case about a failing retail company. Ask me to apply Porter's Five Forces to analyze their situation. Do not give me the answer until I respond."*

### 3. Focus on 'So What?'
In strategy, analyzing data is only step one. The crucial step is the recommendation. Every time you make a point, ask yourself "So what?". If your analysis doesn't lead to a strategic action, it's useless filler.

### 4. Create Concept Maps
Strategy involves seeing how different parts of a business interact. Use tools like Miro or Whimsical to map out how a change in the supply chain (Value Chain) affects the threat of new entrants (Porter's).

### 5. Study in Groups
Strategy is subjective. Argue your points with classmates. If you can defend your recommendation against someone else's critique, you are ready for the exam.

### Summary
Strategy exams reward structured thinking and bold, justified recommendations. Practice applying the frameworks to real companies, and you'll do great.`,
    excerpt: "Stop memorizing and start applying. Learn the 5 best ways to study for case-based business strategy exams.",
    category_id: cat_bus,
    cover_emoji: "📈",
    difficulty: "Intermediate",
    reading_time: 5,
    author_name: "Salman Sana",
    author_avatar: "SS",
    author_bio: "BBA student exploring the intersection of education and technology.",
    tags: ["BBA", "Strategy", "Exams"],
    published: true,
    featured: false,
    popular: false,
    views: 420,
    likes: 12
  },
  {
    title: "Are iPads Actually Worth It for University Students?",
    slug: "are-ipads-worth-it-university-students",
    content: `## The Ultimate Student Tech Question
Every year, millions of students debate whether to buy an iPad for university. After 3 years of using one as a BBA student, here is my honest review.

### The Good
1.  **Digital Notetaking is Revolutionary:** Using GoodNotes or Notability with an Apple Pencil changes the game. You can annotate lecture slides directly, erase without messy scribbles, and search your handwritten notes.
2.  **Lightweight:** Carrying a 1-pound iPad instead of 4 heavy textbooks and binders saves your back.
3.  **Battery Life:** It easily lasts a full day of classes without needing a charger.

### The Bad
1.  **It's NOT a Laptop Replacement:** Unless you only write essays and read PDFs, the iPad falls short. Excel is terrible on iPadOS. Complex formatting in Word is frustrating. Software for CS or Engineering students simply won't run.
2.  **The Price:** By the time you buy an iPad Air, an Apple Pencil, and a Magic Keyboard, you've spent the equivalent of a very capable MacBook Air.
3.  **Distractions:** It's very easy to split-screen Netflix during a boring lecture.

### The Verdict: Who Should Buy It?
**Yes, buy it if:** You study a visually heavy subject (Biology, Chemistry, Math, Art), you love hand-writing notes, and you *already* own a reliable laptop.

**No, don't buy it if:** You are on a strict budget, you study Computer Science/Engineering, or you prefer typing your notes.

If you are on a budget, get a MacBook Air M1 or M2. It is the ultimate student machine. The iPad is a luxury companion device, not a necessity.`,
    excerpt: "An honest, hype-free review of whether buying an iPad and Apple Pencil is actually a good investment for university.",
    category_id: cat_tech,
    cover_emoji: "📱",
    difficulty: "Beginner",
    reading_time: 4,
    author_name: "Salman Sana",
    author_avatar: "SS",
    author_bio: "BBA student exploring the intersection of education and technology.",
    tags: ["iPad", "Tech", "Review"],
    published: true,
    featured: false,
    popular: true,
    views: 3100,
    likes: 115
  },
  {
    title: "The 80/20 Rule: How to Maximize Grades with Minimum Effort",
    slug: "80-20-rule-maximize-grades-minimum-effort",
    content: `## Work Smarter, Not Harder
Have you ever noticed that some students spend all day in the library but get average grades, while others seem to barely study and get A's? The secret isn't genius; it's the Pareto Principle.

### What is the 80/20 Rule?
The Pareto Principle states that 80% of outcomes come from 20% of causes. In studying, **80% of your grade comes from 20% of the material.**

Your job is to identify that 20% and ignore the rest.

### How to Find the 20%
1.  **Past Papers:** This is the holy grail. Professors are lazy; they recycle concepts. If a topic has appeared in the last 3 years of past papers, it is in the 20%.
2.  **The Syllabus/Learning Objectives:** At the start of every lecture, professors list the learning objectives. This is literally them telling you what they will test.
3.  **Focus on the Big Picture:** Don't memorize the footnotes of a textbook. Understand the overarching concepts.

### What to Ignore (The 80% of fluff)
*   **Reading the textbook cover-to-cover:** A massive waste of time. Skim for bold words and chapter summaries.
*   **Making notes look pretty:** Highlighting in 14 different colors feels productive, but it's not learning.
*   **Attending useless lectures:** If the professor just reads off the slides, skip the lecture and read the slides yourself in half the time. (Use this time to study actively).

### Implementation
When you sit down to study, ask yourself: *"Is this task contributing to the 20% that will actually be on the exam?"* If the answer is no, stop doing it.

Ruthless prioritization is the key to surviving university while maintaining a social life and your sanity.`,
    excerpt: "Apply the Pareto Principle to your studies. Learn how to identify high-yield material and stop wasting time on fluff.",
    category_id: cat_study,
    cover_emoji: "⚖️",
    difficulty: "Beginner",
    reading_time: 5,
    author_name: "Salman Sana",
    author_avatar: "SS",
    author_bio: "BBA student exploring the intersection of education and technology.",
    tags: ["Productivity", "Pareto", "Study Tips"],
    published: true,
    featured: true,
    popular: true,
    views: 4500,
    likes: 210
  }
];

async function query(table, method = "GET", body = null) {
  const opts = {
    method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function run() {
  console.log("Inserting posts...");
  for (const post of newPosts) {
    try {
      const res = await query("posts", "POST", post);
      console.log(`✅ Inserted: ${post.title}`);
    } catch (err) {
      console.error(`❌ Failed to insert ${post.title}:`, err.message);
    }
  }
  console.log("Done!");
}

run().catch(console.error);
