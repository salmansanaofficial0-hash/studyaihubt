
-- CATEGORIES
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  emoji text,
  color text,
  post_count int not null default 0,
  created_at timestamptz not null default now()
);

-- POSTS
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category_id uuid references public.categories(id) on delete set null,
  author_name text not null default 'Ahmed Raza',
  author_bio text default 'BBA student at University of Karachi. Passionate about AI tools and helping students study smarter.',
  author_avatar text default 'AR',
  cover_emoji text default '📚',
  reading_time int not null default 5,
  views int not null default 0,
  likes int not null default 0,
  featured boolean not null default false,
  popular boolean not null default false,
  published boolean not null default false,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts(published);
create index if not exists posts_category_idx on public.posts(category_id);
create index if not exists posts_slug_idx on public.posts(slug);

-- CONTACT MESSAGES
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- POST REACTIONS
create table if not exists public.post_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  reaction text not null check (reaction in ('helpful','not_helpful')),
  session_id text not null,
  created_at timestamptz not null default now(),
  unique(post_id, session_id)
);

-- COMMENTS
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  name text not null,
  email text not null,
  message text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Updated_at trigger
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.update_updated_at_column();

-- RLS
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.contact_messages enable row level security;
alter table public.post_reactions enable row level security;
alter table public.comments enable row level security;

-- Categories: public read
drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories" on public.categories
  for select to anon, authenticated using (true);

-- Posts: public read published only
drop policy if exists "Public read published posts" on public.posts;
create policy "Public read published posts" on public.posts
  for select to anon, authenticated using (published = true);

-- Contact messages: public insert only (no read)
drop policy if exists "Public submit contact" on public.contact_messages;
create policy "Public submit contact" on public.contact_messages
  for insert to anon, authenticated with check (true);

-- Reactions: public read + insert
drop policy if exists "Public read reactions" on public.post_reactions;
create policy "Public read reactions" on public.post_reactions
  for select to anon, authenticated using (true);
drop policy if exists "Public submit reactions" on public.post_reactions;
create policy "Public submit reactions" on public.post_reactions
  for insert to anon, authenticated with check (true);

-- Comments: public insert + read approved
drop policy if exists "Public read approved comments" on public.comments;
create policy "Public read approved comments" on public.comments
  for select to anon, authenticated using (approved = true);
drop policy if exists "Public submit comments" on public.comments;
create policy "Public submit comments" on public.comments
  for insert to anon, authenticated with check (true);

-- SEED CATEGORIES
insert into public.categories (name, slug, description, emoji, color) values
  ('AI Tools', 'ai-tools', 'The best AI apps and tools for students', '🤖', '#6366F1'),
  ('Study Tips', 'study-tips', 'Proven strategies to study smarter', '📚', '#06B6D4'),
  ('Productivity', 'productivity', 'Tools and habits to get more done', '⚡', '#10B981'),
  ('Business & Finance', 'business-finance', 'BBA concepts explained simply', '💼', '#F59E0B'),
  ('Presentation Skills', 'presentations', 'Speak and present with confidence', '🎯', '#EC4899'),
  ('Tech Reviews', 'tech-reviews', 'Honest reviews of student tech', '💻', '#8B5CF6')
on conflict (slug) do nothing;

-- SEED POSTS
do $$
declare
  cat_ai uuid;
  cat_study uuid;
  cat_prod uuid;
  cat_biz uuid;
  cat_pres uuid;
  cat_tech uuid;
begin
  select id into cat_ai from public.categories where slug = 'ai-tools';
  select id into cat_study from public.categories where slug = 'study-tips';
  select id into cat_prod from public.categories where slug = 'productivity';
  select id into cat_biz from public.categories where slug = 'business-finance';
  select id into cat_pres from public.categories where slug = 'presentations';
  select id into cat_tech from public.categories where slug = 'tech-reviews';

  insert into public.posts (title, slug, excerpt, content, category_id, cover_emoji, reading_time, views, featured, popular, published, tags, author_name, author_avatar) values
  ('10 Best AI Tools for Students in 2025 (Free & Paid)',
   'best-ai-tools-students-2025',
   'Stop wasting hours on assignments. These 10 AI tools will save you 10+ hours every week.',
   '<h2>Why Students Need AI Tools in 2025</h2><p>University life is harder than ever. AI tools are not cheating — they are the new calculator. I am a BBA student at the University of Karachi, and these 10 tools have changed how I study.</p><h2>1. ChatGPT</h2><p>The Swiss Army knife of AI. Explain concepts, draft outlines, practice for exams, summarize readings.</p><h2>2. Notion AI</h2><p>Clean up rough lecture notes, generate flashcards, and build study guides without leaving your workspace.</p><h2>3. Gamma.app</h2><p>Beautiful presentations from a text prompt in under two minutes. Free plan is generous.</p><h2>4. Grammarly</h2><p>Catches grammar, suggests clearer phrasing, checks tone. Browser extension works everywhere.</p><h2>5. Perplexity AI</h2><p>Like Google but it actually answers your question with citations. Perfect for research.</p><h2>6. Quillbot</h2><p>Paraphrase and summarize. Useful when you understand a concept but cannot find your own words.</p><h2>7. Otter.ai</h2><p>Records and transcribes lectures in real time. Searchable transcripts beat frantic note-taking.</p><h2>8. Canva AI</h2><p>Magic Design and AI images for posters, slides, and assignments in minutes.</p><h2>9. Tome</h2><p>Story-driven presentations. Great for pitches and case studies.</p><h2>10. Elicit</h2><p>Searches academic databases and summarizes papers. Essential for literature reviews.</p><h2>FAQ</h2><p><strong>Is using AI cheating?</strong> Using AI to understand or improve your work is smart studying. Submitting AI work you do not understand is dishonesty. Know the difference.</p>',
   cat_ai, '🤖', 8, 4200, true, true, true,
   ARRAY['AI Tools','Students','ChatGPT','Free Tools','Productivity'],
   'Ahmed Raza','AR'),

  ('50 Best ChatGPT Prompts for University Students',
   'chatgpt-prompts-university-students',
   'Generic prompts get generic answers. These 50 specific prompts actually work for students.',
   '<h2>Why Prompts Matter</h2><p>The more context you give, the better the output. These prompts are copy-paste ready.</p><h2>Writing Assignments</h2><p>1. "I am writing a 1500-word essay on [topic]. Create an outline with 5 main points."</p><p>2. "Review this paragraph for logic and academic tone: [paste]"</p><p>3. "Explain the counterargument to my thesis: [thesis]"</p><h2>Research</h2><p>4. "What are the 10 most important concepts about [topic]?"</p><p>5. "Generate 10 research questions about [topic] at university level."</p><h2>Exam Prep</h2><p>6. "Create a 20-question practice exam on [topic] with answer key."</p><p>7. "Quiz me on [topic] one question at a time."</p><h2>BBA</h2><p>8. "Explain NPV with a real example and a practice problem."</p><p>9. "Do a SWOT on [company] from public info."</p><h2>Presentations</h2><p>10. "Write 5 opening hooks for a presentation on [topic]."</p><p>... and 40 more in the full guide.</p>',
   cat_ai, '💬', 10, 3100, true, true, true,
   ARRAY['ChatGPT','Prompts','University','AI'],
   'Ahmed Raza','AR'),

  ('How to Make a Professional Presentation Using AI in Under 15 Minutes',
   'make-presentation-with-ai',
   'The exact AI workflow I use to build presentations that impress professors.',
   '<h2>Old Way vs AI Way</h2><p>Old: 4 hours fighting PowerPoint. New: 15 minutes with AI, more time to rehearse.</p><h2>Step 1: Structure with ChatGPT</h2><p>Ask: "I am presenting on [topic] for [duration] to [audience]. Create a structure with title, agenda, 5-7 content slides, and conclusion."</p><h2>Step 2: Slides with Gamma.app</h2><p>Paste your outline, pick a theme, click Generate. Done.</p><h2>Step 3: Refine in Canva</h2><p>Magic Design + AI images for custom visuals.</p><h2>Step 4: Practice with AI Feedback</h2><p>Ask ChatGPT to review your talking points for clarity.</p><h2>FAQ</h2><p><strong>Will professors know?</strong> If you understand the content, it is the same as using any research tool.</p>',
   cat_pres, '🎯', 7, 2800, true, true, true,
   ARRAY['Presentations','AI Tools','Gamma','Canva'],
   'Sara Khan','SK'),

  ('The Pomodoro Technique: A Complete Guide for University Students',
   'pomodoro-technique-guide-students',
   'How to use 25-minute focus blocks to triple your study output.',
   '<h2>What is Pomodoro?</h2><p>Work in focused 25-minute blocks separated by short breaks.</p><h2>How To</h2><p>1. Choose one task. 2. Set a 25-minute timer. 3. Work with zero distractions. 4. Take a 5-minute break. 5. After 4 cycles, take 15-30 minutes off.</p><h2>Why It Works</h2><p>Fights procrastination by making tasks feel small, and prevents mental fatigue with forced breaks.</p><h2>Best Apps</h2><p>Pomofocus.io, Forest, Be Focused, Tomato Timer.</p><h2>FAQ</h2><p><strong>Got interrupted?</strong> A broken pomodoro does not count. Restart.</p>',
   cat_prod, '🍅', 5, 1900, false, true, true,
   ARRAY['Pomodoro','Focus','Study Tips'],
   'Ahmed Raza','AR'),

  ('What is ROI? Simple Explanation for BBA Students With Examples',
   'what-is-roi-bba-students',
   'Return on Investment explained in plain English with worked examples.',
   '<h2>ROI in One Sentence</h2><p>ROI measures how much money you made compared to how much you invested.</p><h2>The Formula</h2><p>ROI = (Net Profit / Cost of Investment) × 100</p><h2>Example</h2><p>You invest PKR 100,000 in a side business and earn PKR 130,000. Net profit = 30,000. ROI = 30%.</p><h2>Why It Matters</h2><p>Compare investments fairly regardless of size.</p><h2>FAQ</h2><p><strong>Is high ROI always better?</strong> Not always. Consider risk and time.</p>',
   cat_biz, '💼', 4, 1500, false, true, true,
   ARRAY['ROI','Finance','BBA','Business'],
   'Ahmed Raza','AR'),

  ('Active Recall vs Passive Reading: The Study Method That Actually Works',
   'active-recall-vs-passive-reading',
   'Why re-reading your notes is the worst way to study, and what to do instead.',
   '<h2>The Problem</h2><p>Re-reading feels productive but barely helps memory.</p><h2>Active Recall</h2><p>Close the book and try to retrieve the answer from memory. Use flashcards, practice questions, or teach the concept aloud.</p><h2>Science</h2><p>Retrieval practice strengthens memory more than passive review.</p><h2>How to Do It</h2><p>Anki flashcards. Self-quizzing. The Feynman technique.</p><h2>FAQ</h2><p><strong>How much time?</strong> 80% recall, 20% reading.</p>',
   cat_study, '🧠', 6, 1700, false, true, true,
   ARRAY['Study Tips','Memory','Active Recall'],
   'Sara Khan','SK'),

  ('Notion for Students: My Complete University Workspace Setup',
   'notion-for-students-setup',
   'How I run my entire university life from a single Notion workspace.',
   '<h2>The Stack</h2><p>One dashboard. Pages for each course. A master assignments database.</p><h2>Course Pages</h2><p>Syllabus, lecture notes, readings, key dates.</p><h2>Assignments DB</h2><p>Properties: course, due date, status, weight, grade.</p><h2>Templates</h2><p>Lecture note template, weekly review template, exam prep template.</p><h2>FAQ</h2><p><strong>Is the free plan enough?</strong> Yes, easily.</p>',
   cat_prod, '📝', 7, 2100, false, true, true,
   ARRAY['Notion','Productivity','Students'],
   'Ahmed Raza','AR'),

  ('How to Beat Presentation Anxiety: 7 Techniques That Actually Work',
   'beat-presentation-anxiety',
   'Stop dreading presentations. These 7 techniques helped me go from terrified to confident.',
   '<h2>Why You Are Nervous</h2><p>Your brain treats public speaking like a physical threat.</p><h2>1. Over-Prepare</h2><p>Know the first 60 seconds cold.</p><h2>2. Box Breathing</h2><p>4 in, 4 hold, 4 out, 4 hold. Calms your nervous system.</p><h2>3. Power Pose</h2><p>2 minutes before going on. Stand tall, hands on hips.</p><h2>4. Reframe Adrenaline</h2><p>Tell yourself "I am excited" not "I am nervous".</p><h2>5. Eye Contact</h2><p>Find 3 friendly faces and rotate.</p><h2>6. Slow Down</h2><p>Pause between sentences.</p><h2>7. Embrace Mistakes</h2><p>Recover with a smile. Nobody else noticed.</p>',
   cat_pres, '🎤', 6, 1600, false, false, true,
   ARRAY['Presentations','Confidence','Public Speaking'],
   'Sara Khan','SK'),

  ('The Best Free AI Image Generators for Student Projects',
   'best-free-ai-image-generators',
   'Get publication-quality images for your assignments and presentations without paying a cent.',
   '<h2>Why You Need These</h2><p>Stock photos are boring. AI gives you exactly the image you imagined.</p><h2>1. Microsoft Designer (Bing Image Creator)</h2><p>Free, fast, powered by DALL·E 3.</p><h2>2. Leonardo.ai</h2><p>150 free credits per day. Best quality on the free tier.</p><h2>3. Ideogram</h2><p>Best for images with readable text.</p><h2>4. Google Gemini Imagen</h2><p>Photorealistic and free.</p><h2>5. Adobe Firefly</h2><p>Commercially safe, generous free plan.</p><h2>FAQ</h2><p><strong>Copyright?</strong> Most allow personal and educational use. Check each tool.</p>',
   cat_ai, '🎨', 5, 1400, false, false, true,
   ARRAY['AI','Images','Free Tools'],
   'Ahmed Raza','AR'),

  ('Cheap Laptops for University Students in Pakistan (2025)',
   'cheap-laptops-pakistan-2025',
   'Honest reviews of the best budget laptops for Pakistani university students.',
   '<h2>Budget: Under PKR 80,000</h2><p>Look for used ThinkPad T480 or Latitude 7490. 8GB RAM, SSD, i5.</p><h2>Budget: PKR 80,000 - 150,000</h2><p>HP ProBook, Lenovo IdeaPad Slim 3, Acer Aspire 5.</p><h2>Budget: PKR 150,000+</h2><p>MacBook Air M1 used, Lenovo Yoga Slim.</p><h2>What to Avoid</h2><p>Anything with 4GB RAM, HDD, or Celeron CPU.</p><h2>FAQ</h2><p><strong>Used or new?</strong> Used business laptops give you 2x the spec for the price.</p>',
   cat_tech, '💻', 8, 1200, false, false, true,
   ARRAY['Laptops','Pakistan','Tech Reviews'],
   'Ahmed Raza','AR')
  on conflict (slug) do nothing;
end $$;
