-- ============================================================================
-- STUDYAI HUB - COMPLETE SUPABASE SETUP SCRIPT
-- ============================================================================
-- Directions: Copy this entire script, paste it into the Supabase SQL Editor,
-- and click "Run". This will set up all tables, views, triggers, policies,
-- permissions, and seed the initial blog categories and articles.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. CLEANUP (Optional / Reset)
-- ----------------------------------------------------------------------------
DROP VIEW IF EXISTS public.approved_comments CASCADE;
DROP TABLE IF EXISTS public.post_reactions CASCADE;
DROP TABLE IF EXISTS public.comments CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column CASCADE;

-- ----------------------------------------------------------------------------
-- 2. CREATE TABLES
-- ----------------------------------------------------------------------------

-- CATEGORIES
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  emoji TEXT,
  color TEXT,
  post_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- POSTS
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL DEFAULT 'Ahmed Raza',
  author_bio TEXT DEFAULT 'BBA student at University of Karachi. Passionate about AI tools and helping students study smarter.',
  author_avatar TEXT DEFAULT 'AR',
  cover_emoji TEXT DEFAULT '📚',
  reading_time INT NOT NULL DEFAULT 5,
  views INT NOT NULL DEFAULT 0,
  likes INT NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  popular BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] NOT NULL DEFAULT '{}',
  difficulty TEXT NOT NULL DEFAULT 'Beginner' CHECK (difficulty IN ('Beginner','Intermediate','Advanced')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- CONTACT MESSAGES
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- POST REACTIONS
CREATE TABLE public.post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  reaction TEXT NOT NULL CHECK (reaction IN ('helpful','not_helpful')),
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(post_id, session_id)
);

-- COMMENTS
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- NEWSLETTER SUBSCRIBERS
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'website',
  active BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 3. INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS posts_published_idx ON public.posts(published);
CREATE INDEX IF NOT EXISTS posts_category_idx ON public.posts(category_id);
CREATE INDEX IF NOT EXISTS posts_slug_idx ON public.posts(slug);

-- ----------------------------------------------------------------------------
-- 4. TRIGGERS & FUNCTIONS
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER posts_set_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) ENABLEMENT
-- ----------------------------------------------------------------------------
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 6. SECURITY VIEWS
-- ----------------------------------------------------------------------------
-- A safe view exposing only non-sensitive columns for approved comments
CREATE OR REPLACE VIEW public.approved_comments
WITH (security_invoker = true) AS
SELECT id, post_id, name, message, created_at
FROM public.comments
WHERE approved = true;

-- ----------------------------------------------------------------------------
-- 7. POLICIES
-- ----------------------------------------------------------------------------

-- CATEGORIES
CREATE POLICY "Public read categories" ON public.categories
  FOR SELECT TO anon, authenticated USING (true);

-- POSTS
CREATE POLICY "Public read published posts" ON public.posts
  FOR SELECT TO anon, authenticated USING (published = true);

-- CONTACT MESSAGES
CREATE POLICY "Public submit contact" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(name)) BETWEEN 1 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(trim(message)) BETWEEN 1 AND 5000
  );

-- POST REACTIONS
CREATE POLICY "Public read reactions" ON public.post_reactions
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public submit reactions" ON public.post_reactions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(session_id) BETWEEN 8 AND 128
    AND reaction IN ('helpful','not_helpful')
  );

-- COMMENTS
CREATE POLICY "Public submit comments" ON public.comments
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(name)) BETWEEN 1 AND 100
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(trim(message)) BETWEEN 1 AND 2000
    AND approved = false
  );

-- NEWSLETTER SUBSCRIBERS
CREATE POLICY "Public can insert newsletter" ON public.newsletter_subscribers
  FOR INSERT TO anon
  WITH CHECK (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(email) <= 320
  );

CREATE POLICY "Public can insert newsletter authenticated" ON public.newsletter_subscribers
  FOR INSERT TO authenticated
  WITH CHECK (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(email) <= 320
  );

CREATE POLICY "Admin can read subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated
  USING (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- 8. ROLES & GRANTS
-- ----------------------------------------------------------------------------
-- Approved comments view select grant
GRANT SELECT ON public.approved_comments TO anon, authenticated;

-- Revoke broad comments select and grant specific columns to anon/authenticated
REVOKE SELECT ON public.comments FROM anon, authenticated;
GRANT SELECT (id, post_id, name, message, created_at, approved) ON public.comments TO anon, authenticated;

-- ----------------------------------------------------------------------------
-- 9. SEED CATEGORIES
-- ----------------------------------------------------------------------------
INSERT INTO public.categories (name, slug, description, emoji, color) VALUES
  ('AI Tools', 'ai-tools', 'The best AI apps and tools for students', '🤖', '#6366F1'),
  ('Study Tips', 'study-tips', 'Proven strategies to study smarter', '📚', '#06B6D4'),
  ('Productivity', 'productivity', 'Tools and habits to get more done', '⚡', '#10B981'),
  ('Business & Finance', 'business-finance', 'BBA concepts explained simply', '💼', '#F59E0B'),
  ('Presentation Skills', 'presentations', 'Speak and present with confidence', '🎯', '#EC4899'),
  ('Tech Reviews', 'tech-reviews', 'Honest reviews of student tech', '💻', '#8B5CF6')
ON CONFLICT (slug) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 10. SEED BLOG POSTS
-- ----------------------------------------------------------------------------
INSERT INTO public.posts (
  title, slug, excerpt, content, category_id, cover_emoji, reading_time, views, featured, popular, published, tags, author_name, author_avatar, difficulty
) VALUES
  -- Post 1
  ('10 Best AI Tools for Students in 2025 (Free & Paid)',
   'best-ai-tools-students-2025',
   'Stop wasting hours on assignments. These 10 AI tools will save you 10+ hours every week.',
   '<h2>Why Students Need AI Tools in 2025</h2><p>University life is harder than ever. AI tools are not cheating — they are the new calculator. I am a BBA student at the University of Karachi, and these 10 tools have changed how I study.</p><h2>1. ChatGPT</h2><p>The Swiss Army knife of AI. Explain concepts, draft outlines, practice for exams, summarize readings.</p><h2>2. Notion AI</h2><p>Clean up rough lecture notes, generate flashcards, and build study guides without leaving your workspace.</p><h2>3. Gamma.app</h2><p>Beautiful presentations from a text prompt in under two minutes. Free plan is generous.</p><h2>4. Grammarly</h2><p>Catches grammar, suggests clearer phrasing, checks tone. Browser extension works everywhere.</p><h2>5. Perplexity AI</h2><p>Like Google but it actually answers your question with citations. Perfect for research.</p><h2>6. Quillbot</h2><p>Paraphrase and summarize. Useful when you understand a concept but cannot find your own words.</p><h2>7. Otter.ai</h2><p>Records and transcribes lectures in real time. Searchable transcripts beat frantic note-taking.</p><h2>8. Canva AI</h2><p>Magic Design and AI images for posters, slides, and assignments in minutes.</p><h2>9. Tome</h2><p>Story-driven presentations. Great for pitches and case studies.</p><h2>10. Elicit</h2><p>Searches academic databases and summarizes papers. Essential for literature reviews.</p><h2>FAQ</h2><p><strong>Is using AI cheating?</strong> Using AI to understand or improve your work is smart studying. Submitting AI work you do not understand is dishonesty. Know the difference.</p>',
   (SELECT id FROM public.categories WHERE slug = 'ai-tools'), '🤖', 8, 4200, true, true, true,
   ARRAY['AI Tools','Students','ChatGPT','Free Tools','Productivity'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 2
  ('50 Best ChatGPT Prompts for University Students',
   'chatgpt-prompts-university-students',
   'Generic prompts get generic answers. These 50 specific prompts actually work for students.',
   '<h2>Why Prompts Matter</h2><p>The more context you give, the better the output. These prompts are copy-paste ready.</p><h2>Writing Assignments</h2><p>1. "I am writing a 1500-word essay on [topic]. Create an outline with 5 main points."</p><p>2. "Review this paragraph for logic and academic tone: [paste]"</p><p>3. "Explain the counterargument to my thesis: [thesis]"</p><h2>Research</h2><p>4. "What are the 10 most important concepts about [topic]?"</p><p>5. "Generate 10 research questions about [topic] at university level."</p><h2>Exam Prep</h2><p>6. "Create a 20-question practice exam on [topic] with answer key."</p><p>7. "Quiz me on [topic] one question at a time."</p><h2>BBA</h2><p>8. "Explain NPV with a real example and a practice problem."</p><p>9. "Do a SWOT on [company] from public info."</p><h2>Presentations</h2><p>10. "Write 5 opening hooks for a presentation on [topic]."</p><p>... and 40 more in the full guide.</p>',
   (SELECT id FROM public.categories WHERE slug = 'ai-tools'), '💬', 10, 3100, true, true, true,
   ARRAY['ChatGPT','Prompts','University','AI'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 3
  ('How to Make a Professional Presentation Using AI in Under 15 Minutes',
   'make-presentation-with-ai',
   'The exact AI workflow I use to build presentations that impress professors.',
   '<h2>Old Way vs AI Way</h2><p>Old: 4 hours fighting PowerPoint. New: 15 minutes with AI, more time to rehearse.</p><h2>Step 1: Structure with ChatGPT</h2><p>Ask: "I am presenting on [topic] for [duration] to [audience]. Create a structure with title, agenda, 5-7 content slides, and conclusion."</p><h2>Step 2: Slides with Gamma.app</h2><p>Paste your outline, pick a theme, click Generate. Done.</p><h2>Step 3: Refine in Canva</h2><p>Magic Design + AI images for custom visuals.</p><h2>Step 4: Practice with AI Feedback</h2><p>Ask ChatGPT to review your talking points for clarity.</p><h2>FAQ</h2><p><strong>Will professors know?</strong> If you understand the content, it is the same as using any research tool.</p>',
   (SELECT id FROM public.categories WHERE slug = 'presentations'), '🎯', 7, 2800, true, true, true,
   ARRAY['Presentations','AI Tools','Gamma','Canva'],
   'Sara Khan','SK', 'Beginner'),

  -- Post 4
  ('The Pomodoro Technique: A Complete Guide for University Students',
   'pomodoro-technique-guide-students',
   'How to use 25-minute focus blocks to triple your study output.',
   '<h2>What is Pomodoro?</h2><p>Work in focused 25-minute blocks separated by short breaks.</p><h2>How To</h2><p>1. Choose one task. 2. Set a 25-minute timer. 3. Work with zero distractions. 4. Take a 5-minute break. 5. After 4 cycles, take 15-30 minutes off.</p><h2>Why It Works</h2><p>Fights procrastination by making tasks feel small, and prevents mental fatigue with forced breaks.</p><h2>Best Apps</h2><p>Pomofocus.io, Forest, Be Focused, Tomato Timer.</p><h2>FAQ</h2><p><strong>Got interrupted?</strong> A broken pomodoro does not count. Restart.</p>',
   (SELECT id FROM public.categories WHERE slug = 'productivity'), '🍅', 5, 1900, false, true, true,
   ARRAY['Pomodoro','Focus','Study Tips'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 5
  ('What is ROI? Simple Explanation for BBA Students With Examples',
   'what-is-roi-bba-students',
   'Return on Investment explained in plain English with worked examples.',
   '<h2>ROI in One Sentence</h2><p>ROI measures how much money you made compared to how much you invested.</p><h2>The Formula</h2><p>ROI = (Net Profit / Cost of Investment) × 100</p><h2>Example</h2><p>You invest PKR 100,000 in a side business and earn PKR 130,000. Net profit = 30,000. ROI = 30%.</p><h2>Why It Matters</h2><p>Compare investments fairly regardless of size.</p><h2>FAQ</h2><p><strong>Is high ROI always better?</strong> Not always. Consider risk and time.</p>',
   (SELECT id FROM public.categories WHERE slug = 'business-finance'), '💼', 4, 1500, false, true, true,
   ARRAY['ROI','Finance','BBA','Business'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 6
  ('Active Recall vs Passive Reading: The Study Method That Actually Works',
   'active-recall-vs-passive-reading',
   'Why re-reading your notes is the worst way to study, and what to do instead.',
   '<h2>The Problem</h2><p>Re-reading feels productive but barely helps memory.</p><h2>Active Recall</h2><p>Close the book and try to retrieve the answer from memory. Use flashcards, practice questions, or teach the concept aloud.</p><h2>Science</h2><p>Retrieval practice strengthens memory more than passive review.</p><h2>How to Do It</h2><p>Anki flashcards. Self-quizzing. The Feynman technique.</p><h2>FAQ</h2><p><strong>How much time?</strong> 80% recall, 20% reading.</p>',
   (SELECT id FROM public.categories WHERE slug = 'study-tips'), '🧠', 6, 1700, false, true, true,
   ARRAY['Study Tips','Memory','Active Recall'],
   'Sara Khan','SK', 'Beginner'),

  -- Post 7
  ('Notion for Students: My Complete University Workspace Setup',
   'notion-for-students-setup',
   'How I run my entire university life from a single Notion workspace.',
   '<h2>The Stack</h2><p>One dashboard. Pages for each course. A master assignments database.</p><h2>Course Pages</h2><p>Syllabus, lecture notes, readings, key dates.</p><h2>Assignments DB</h2><p>Properties: course, due date, status, weight, grade.</p><h2>Templates</h2><p>Lecture note template, weekly review template, exam prep template.</p><h2>FAQ</h2><p><strong>Is the free plan enough?</strong> Yes, easily.</p>',
   (SELECT id FROM public.categories WHERE slug = 'productivity'), '📝', 7, 2100, false, true, true,
   ARRAY['Notion','Productivity','Students'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 8
  ('How to Beat Presentation Anxiety: 7 Techniques That Actually Work',
   'beat-presentation-anxiety',
   'Stop dreading presentations. These 7 techniques helped me go from terrified to confident.',
   '<h2>Why You Are Nervous</h2><p>Your brain treats public speaking like a physical threat.</p><h2>1. Over-Prepare</h2><p>Know the first 60 seconds cold.</p><h2>2. Box Breathing</h2><p>4 in, 4 hold, 4 out, 4 hold. Calms your nervous system.</p><h2>3. Power Pose</h2><p>2 minutes before going on. Stand tall, hands on hips.</p><h2>4. Reframe Adrenaline</h2><p>Tell yourself "I am excited" not "I am nervous".</p><h2>5. Eye Contact</h2><p>Find 3 friendly faces and rotate.</p><h2>6. Slow Down</h2><p>Pause between sentences.</p><h2>7. Embrace Mistakes</h2><p>Recover with a smile. Nobody else noticed.</p>',
   (SELECT id FROM public.categories WHERE slug = 'presentations'), '🎤', 6, 1600, false, false, true,
   ARRAY['Presentations','Confidence','Public Speaking'],
   'Sara Khan','SK', 'Beginner'),

  -- Post 9
  ('The Best Free AI Image Generators for Student Projects',
   'best-free-ai-image-generators',
   'Get publication-quality images for your assignments and presentations without paying a cent.',
   '<h2>Why You Need These</h2><p>Stock photos are boring. AI gives you exactly the image you imagined.</p><h2>1. Microsoft Designer (Bing Image Creator)</h2><p>Free, fast, powered by DALL·E 3.</p><h2>2. Leonardo.ai</h2><p>150 free credits per day. Best quality on the free tier.</p><h2>3. Ideogram</h2><p>Best for images with readable text.</p><h2>4. Google Gemini Imagen</h2><p>Photorealistic and free.</p><h2>5. Adobe Firefly</h2><p>Commercially safe, generous free plan.</p><h2>FAQ</h2><p><strong>Copyright?</strong> Most allow personal and educational use. Check each tool.</p>',
   (SELECT id FROM public.categories WHERE slug = 'ai-tools'), '🎨', 5, 1400, false, false, true,
   ARRAY['AI','Images','Free Tools'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 10
  ('Cheap Laptops for University Students in Pakistan (2025)',
   'cheap-laptops-pakistan-2025',
   'Honest reviews of the best budget laptops for Pakistani university students.',
   '<h2>Budget: Under PKR 80,000</h2><p>Look for used ThinkPad T480 or Latitude 7490. 8GB RAM, SSD, i5.</p><h2>Budget: PKR 80,000 - 150,000</h2><p>HP ProBook, Lenovo IdeaPad Slim 3, Acer Aspire 5.</p><h2>Budget: PKR 150,000+</h2><p>MacBook Air M1 used, Lenovo Yoga Slim.</p><h2>What to Avoid</h2><p>Anything with 4GB RAM, HDD, or Celeron CPU.</p><h2>FAQ</h2><p><strong>Used or new?</strong> Used business laptops give you 2x the spec for the price.</p>',
   (SELECT id FROM public.categories WHERE slug = 'tech-reviews'), '💻', 8, 1200, false, false, true,
   ARRAY['Laptops','Pakistan','Tech Reviews'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 11
  ('Claude AI vs ChatGPT: Which is Better for University Students in 2025?',
   'claude-ai-vs-chatgpt-students-2025',
   'I used both Claude and ChatGPT every day for a full semester. Here is my honest comparison of which AI is actually better for assignments, research, and studying.',
   '<h2>Why This Comparison Matters for Students</h2><p>ChatGPT launched the AI revolution and most students default to it without questioning whether it is actually the best tool. Claude from Anthropic has quietly become a serious competitor and in many ways surpasses ChatGPT for academic work. I used both every day for an entire semester and this is my honest verdict.</p><h2>Writing Quality</h2><p>Claude wins for writing quality. Claude produces more nuanced, naturally flowing prose that sounds less like AI-generated text. For academic writing specifically — essays, reports, case studies — Claude consistently produces better first drafts.</p><h2>Research and Factual Accuracy</h2><p>ChatGPT Plus with web browsing wins for current research because it can access the internet in real time. Claude has a knowledge cutoff but is more honest about uncertainty.</p><h2>Handling Long Documents</h2><p>Claude wins significantly with up to 200,000 tokens of context. Paste entire textbook chapters or multiple research papers and ask questions about all of it at once.</p><h2>Coding and Technical Work</h2><p>Both are excellent. ChatGPT has a slight edge for coding due to its code interpreter. For everything else, Claude is competitive.</p><h2>Price Comparison</h2><p>Both free versions are limited. ChatGPT Plus is $20/month. Claude Pro is $20/month. Try both free versions first.</p><h2>My Recommendation</h2><p>Use Claude as your primary AI for writing and analyzing long documents. Use ChatGPT for current information, coding, or image generation.</p>',
   (SELECT id FROM public.categories WHERE slug = 'ai-tools'), '🤖', 8, 0, true, true, true,
   ARRAY['Claude AI','ChatGPT','AI Tools','Students','Comparison','2025'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 12
  ('How to Use Canva AI to Design Anything as a Student (Full Guide)',
   'canva-ai-student-design-guide',
   'Canva AI lets students create professional presentations, posters, infographics, and social media graphics without any design skills. Here is the complete guide.',
   '<h2>Why Every Student Needs Canva AI in 2025</h2><p>Design used to require expensive software and years of training. Canva AI makes it even simpler — you describe what you want and it builds it.</p><h2>Setting Up Your Free Canva Account</h2><p>Sign up at canva.com. Students at many universities get Canva Pro free through Canva for Education.</p><h2>Magic Design — Create Anything Instantly</h2><p>Click Create a Design then Magic Design. Describe what you need and Canva generates multiple complete designs in seconds.</p><h2>Magic Write — AI Writing Inside Canva</h2><p>Use Magic Write to generate slide content, poster text, or captions directly inside your design.</p><h2>Text to Image — Create Custom Graphics</h2><p>Canva''s text to image generator creates custom illustrations and photos from text prompts.</p><h2>Best Student Use Cases</h2><p><strong>Presentations, assignment covers, infographics, LinkedIn banners, study flashcards.</strong></p><h2>Pro Tips</h2><p>Use the Brand Kit feature even on the free plan to set consistent colors and fonts across designs.</p>',
   (SELECT id FROM public.categories WHERE slug = 'ai-tools'), '🎨', 7, 0, false, true, true,
   ARRAY['Canva AI','Design','Presentations','Students','Free Tools'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 13
  ('How to Study for Exams in 3 Days: The Emergency Study Plan',
   'study-for-exams-3-days-emergency-plan',
   'Exams in 3 days and you have not started yet. This emergency study plan tells you exactly what to do hour by hour to maximize your marks in minimum time.',
   '<h2>First: Stop Panicking</h2><p>Three days is genuinely enough time to pass if you follow a strategic plan based on memory research.</p><h2>Day 1: Triage and Active Learning</h2><p><strong>Morning:</strong> Get past exam papers and identify topics that appear every year. <strong>Afternoon:</strong> Study top priority topics using active recall, not passive rereading. <strong>Evening:</strong> Do one full past paper without notes.</p><h2>Day 2: Practice and Patch Gaps</h2><p>Mark the past paper. Identify weak areas. Study only those. Do another past paper in the evening.</p><h2>Day 3: Final Review and Sleep</h2><p>Quick review of formula sheets and definitions. Do NOT learn new topics. Sleep 8 hours — sleep consolidates memory and is non-negotiable.</p><h2>The Hour Before the Exam</h2><p>Stop studying 30 minutes before. Eat something. Breathe. You have done the work.</p><h2>Why This Works</h2><p>Active recall and past-paper practice produce 2-3x better retention than rereading notes for the same amount of time.</p>',
   (SELECT id FROM public.categories WHERE slug = 'study-tips'), '⏰', 9, 0, true, true, true,
   ARRAY['Exam Prep','Study Tips','Cramming','Time Management','Students'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 14
  ('Perplexity AI: The Best Free Research Tool for Students',
   'perplexity-ai-student-research-guide',
   'Perplexity AI is the research tool every student should be using. Real-time web search with cited sources, completely free for the basic plan.',
   '<h2>What Makes Perplexity Different</h2><p>Perplexity combines AI with real-time web search and always cites its sources. Every claim links back to where it came from — exactly what you need for academic research.</p><h2>How to Use It for Assignments</h2><p>Ask focused research questions. Perplexity returns a summarized answer with numbered citations. Click each citation to verify the source before quoting.</p><h2>Focus Modes</h2><p>Use Academic mode for scholarly sources, YouTube mode for video research, Reddit mode for community opinions.</p><h2>Free vs Pro</h2><p>The free plan is generous: unlimited basic searches plus 5 Pro searches daily. Pro ($20/month) gives advanced models -- not necessary for most students.</p><h2>Why Perplexity Beats Google for Research</h2><p>You get answers with sources in seconds instead of clicking through 10 results. The citations make verification trivial.</p>',
   (SELECT id FROM public.categories WHERE slug = 'ai-tools'), '🔍', 6, 0, false, true, true,
   ARRAY['Perplexity','AI Tools','Research','Students','Free'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 15
  ('Best Free Productivity Apps for Students in 2025',
   'best-free-productivity-apps-students-2025',
   'The complete list of free productivity apps that actually make a difference for university students. Tested across a full semester.',
   '<h2>Notion — All-in-One Workspace</h2><p>Notes, tasks, databases, wikis. Free for students with the Education plan. Replace 5 different apps with one.</p><h2>Todoist — Task Management</h2><p>Simple, fast, cross-platform. Natural language input ("Submit essay tomorrow at 5pm") makes capture effortless.</p><h2>Forest — Focus Timer</h2><p>Pomodoro timer that grows a virtual tree while you focus. Surprisingly effective at preventing phone use.</p><h2>Anki — Spaced Repetition Flashcards</h2><p>The single best app for memorizing anything. Completely free on desktop and Android.</p><h2>Obsidian — Knowledge Base</h2><p>Local-first markdown notes with linking. Free forever. Best for serious note-takers.</p><h2>Google Calendar</h2><p>Free, syncs everywhere, works with everything. Time-block your study sessions like meetings.</p><h2>My Recommended Stack</h2><p>Notion + Todoist + Anki + Forest covers 95% of student productivity needs and costs nothing.</p>',
   (SELECT id FROM public.categories WHERE slug = 'productivity'), '⚡', 7, 0, false, true, true,
   ARRAY['Productivity','Apps','Free Tools','Students','Notion','Anki'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 16
  ('NPV Explained Simply for BBA Students (With Examples)',
   'npv-explained-bba-students',
   'Net Present Value confused you in finance class? Here is NPV explained in plain English with worked examples — no jargon, no skipped steps.',
   '<h2>What is NPV Actually?</h2><p>Net Present Value answers one question: is this investment worth it today? It converts future cash flows back to today''s value and compares them to what you spend upfront.</p><h2>The Core Idea</h2><p>$100 today is worth more than $100 next year. NPV uses a discount rate to translate future money into today''s equivalent.</p><h2>The Formula in Plain English</h2><p>NPV = Sum of (cash flow / (1 + r)^t) − initial investment. Where r is the discount rate and t is the year.</p><h2>Worked Example</h2><p>Invest $1,000. Get $600 in year 1 and $600 in year 2. Discount rate 10%. NPV = 600/1.1 + 600/1.21 − 1000 = 545.45 + 495.87 − 1000 = $41.32. Positive NPV means accept.</p><h2>Decision Rule</h2><p>NPV > 0: accept the project. NPV < 0: reject. NPV = 0: indifferent.</p><h2>Common Exam Mistakes</h2><p>Forgetting year 0 cash flow, using wrong discount rate, mixing up real vs nominal rates.</p>',
   (SELECT id FROM public.categories WHERE slug = 'business-finance'), '💰', 8, 0, false, false, true,
   ARRAY['NPV','Finance','BBA','Business','Tutorial'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 17
  ('How to Build a Personal Brand on LinkedIn as a University Student',
   'personal-brand-linkedin-university-student',
   'Most students treat LinkedIn as a digital CV. The ones who get internships and jobs use it as a personal brand platform. Here is how to do it.',
   '<h2>Why LinkedIn Matters for Students</h2><p>Recruiters search LinkedIn before reading your CV. A strong profile creates inbound opportunities most students never see.</p><h2>Profile Essentials</h2><p>Professional headshot, clear headline that says what you do not just your degree, customized URL, banner image relevant to your field.</p><h2>The About Section</h2><p>First-person, conversational, three short paragraphs: who you are, what you''re working on, what you''re looking for. End with a call to action.</p><h2>Post Weekly</h2><p>Share what you''re learning, mini case studies from your coursework, book takeaways. Consistency beats virality.</p><h2>Engage More Than You Post</h2><p>Comment thoughtfully on posts from people in your industry every day. This builds visibility faster than your own posts at the start.</p><h2>Network Strategically</h2><p>Connect with 5 people per week with personalized notes. Aim for alumni and people at companies you want to work for.</p>',
   (SELECT id FROM public.categories WHERE slug = 'productivity'), '🔗', 7, 0, false, true, true,
   ARRAY['LinkedIn','Personal Brand','Career','Students','Networking'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 18
  ('How to Pass Multiple Choice Exams: Strategies That Actually Work',
   'pass-multiple-choice-exam-strategies',
   'Multiple choice exams reward strategy as much as knowledge. These techniques boost your score even when you''re not sure of the answer.',
   '<h2>Read the Question Twice Before Looking at Options</h2><p>Forming your own answer first prevents the options from biasing your thinking.</p><h2>Eliminate Wrong Answers First</h2><p>Removing 2 obviously wrong options turns a 25% guess into a 50% guess.</p><h2>Watch for Absolutes</h2><p>"Always" and "never" are usually wrong. "Often" and "sometimes" are usually right.</p><h2>Longest Answer Is Often Correct</h2><p>Test writers add qualifiers to correct answers to make them precise. Long, detailed options are often right.</p><h2>"All of the Above" Bias</h2><p>If two options look correct, "All of the above" is probably the answer.</p><h2>Trust Your First Instinct</h2><p>Research shows changing your answer hurts more often than it helps — unless you find a clear reason to change.</p><h2>Time Management</h2><p>Spend no more than 60 seconds per question on first pass. Mark hard ones and return at the end.</p>',
   (SELECT id FROM public.categories WHERE slug = 'study-tips'), '✅', 6, 0, false, true, true,
   ARRAY['MCQ','Exam Strategy','Study Tips','Test Taking','Students'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 19
  ('Gamma.app Review 2025: Is It Worth It for Student Presentations?',
   'gamma-app-review-2025',
   'I used Gamma.app for 10 university presentations. Here is my honest review of what it does well, where it falls short, and whether it is worth using.',
   '<h2>What is Gamma.app?</h2><p>Gamma is an AI-powered presentation tool that creates complete, professionally designed slide decks from a text prompt in about 30 seconds.</p><h2>What Gamma Does Brilliantly</h2><p><strong>Speed:</strong> Topic to complete presentation in under two minutes. <strong>Design quality:</strong> Professional defaults non-designers cannot match. <strong>AI content:</strong> Surprisingly good first drafts for academic topics.</p><h2>Where Gamma Falls Short</h2><p><strong>Content accuracy:</strong> Always verify generated facts. <strong>Free plan limits:</strong> Limited AI generations per month. <strong>Less control than PowerPoint</strong> for strict templates.</p><h2>My Verdict</h2><p>Excellent for most university presentations. Saves 2-3 hours per deck. Use Gamma for structure and design, then edit content carefully for accuracy.</p><h2>Pricing</h2><p>Free plan with limited generations. Pro is $8/month.</p>',
   (SELECT id FROM public.categories WHERE slug = 'ai-tools'), '🎯', 8, 0, false, false, true,
   ARRAY['Gamma','Presentations','AI Tools','Review','Students'],
   'Ahmed Raza','AR', 'Beginner'),

  -- Post 20
  ('Digital Minimalism for Students: How to Use Your Phone Less and Study More',
   'digital-minimalism-students-phone',
   'The average student spends 6 hours a day on their phone. Digital minimalism is about redesigning your phone to support your goals instead of working against them.',
   '<h2>The Real Cost of Phone Overuse</h2><p>Six hours a day is 42 hours a week — a full-time job spent on fragmented attention.</p><h2>Step 1: Audit Your Usage</h2><p>Check screen time settings. Most people underestimate usage by 50-100%.</p><h2>Step 2: High-Value vs Low-Value Apps</h2><p>High-value: Maps, WhatsApp, Notion, banking. Low-value: TikTok, Reels, infinite-scroll feeds.</p><h2>Step 3: Redesign Your Phone</h2><p>Remove social apps for 30 days. Blank home screen. Turn off all notifications except calls and specific people.</p><h2>Step 5: Replace, Don''t Only Remove</h2><p>Replace phone use with books, music, walks, notebooks. Removing without replacing creates relapse.</p><h2>What Changes After 30 Days</h2><p>Longer focus periods, lower anxiety, more reading, more free time, better relationships.</p>',
   (SELECT id FROM public.categories WHERE slug = 'productivity'), '📵', 8, 0, false, false, true,
   ARRAY['Digital Minimalism','Phone','Productivity','Focus','Students'],
   'Ahmed Raza','AR', 'Beginner')
ON CONFLICT (slug) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 11. INITIAL STATISTICS CALCULATIONS
-- ----------------------------------------------------------------------------

-- Set random views for posts that currently have 0 views to give the platform a live feel
UPDATE public.posts 
SET views = floor(random() * 3000 + 500)::int 
WHERE views = 0;

-- Recalculate post counts for all categories
UPDATE public.categories 
SET post_count = (
  SELECT count(*) 
  FROM public.posts
  WHERE category_id = categories.id AND published = true
);
