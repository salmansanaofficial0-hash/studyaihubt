do $$
declare
  cat_ai uuid;
  cat_study uuid;
  cat_prod uuid;
  cat_biz uuid;
  cat_pres uuid;
  cat_tech uuid;
begin
  select id into cat_ai from categories where slug = 'ai-tools';
  select id into cat_study from categories where slug = 'study-tips';
  select id into cat_prod from categories where slug = 'productivity';
  select id into cat_biz from categories where slug = 'business-finance';
  select id into cat_pres from categories where slug = 'presentations';
  select id into cat_tech from categories where slug = 'tech-reviews';

insert into posts (title, slug, excerpt, content, category_id,
cover_emoji, reading_time, views, featured, popular,
published, tags, author_name, author_avatar)
select v.title, v.slug, v.excerpt, v.content, v.cat,
v.emoji, v.rt, 0, v.featured, v.popular, true, v.tags, 'Ahmed Raza', 'AR'
from (
  select
    p.title, p.slug, p.excerpt, p.content,
    case p.cat_slug
      when 'ai-tools' then cat_ai
      when 'study-tips' then cat_study
      when 'productivity' then cat_prod
      when 'business-finance' then cat_biz
      when 'presentations' then cat_pres
      when 'tech-reviews' then cat_tech
    end as cat,
    p.emoji, p.rt, p.featured, p.popular, p.tags
  from (
    values
    ('Claude AI vs ChatGPT: Which is Better for University Students in 2025?','claude-ai-vs-chatgpt-students-2025',
     'I used both Claude and ChatGPT every day for a full semester. Here is my honest comparison of which AI is actually better for assignments, research, and studying.',
     '<h2>Why This Comparison Matters for Students</h2><p>ChatGPT launched the AI revolution and most students default to it without questioning whether it is actually the best tool. Claude from Anthropic has quietly become a serious competitor and in many ways surpasses ChatGPT for academic work. I used both every day for an entire semester and this is my honest verdict.</p><h2>Writing Quality</h2><p>Claude wins for writing quality. Claude produces more nuanced, naturally flowing prose that sounds less like AI-generated text. For academic writing specifically — essays, reports, case studies — Claude consistently produces better first drafts.</p><h2>Research and Factual Accuracy</h2><p>ChatGPT Plus with web browsing wins for current research because it can access the internet in real time. Claude has a knowledge cutoff but is more honest about uncertainty.</p><h2>Handling Long Documents</h2><p>Claude wins significantly with up to 200,000 tokens of context. Paste entire textbook chapters or multiple research papers and ask questions about all of it at once.</p><h2>Coding and Technical Work</h2><p>Both are excellent. ChatGPT has a slight edge for coding due to its code interpreter. For everything else, Claude is competitive.</p><h2>Price Comparison</h2><p>Both free versions are limited. ChatGPT Plus is $20/month. Claude Pro is $20/month. Try both free versions first.</p><h2>My Recommendation</h2><p>Use Claude as your primary AI for writing and analyzing long documents. Use ChatGPT for current information, coding, or image generation.</p>',
     'ai-tools','🤖',8,true,true,
     ARRAY['Claude AI','ChatGPT','AI Tools','Students','Comparison','2025']),

    ('How to Use Canva AI to Design Anything as a Student (Full Guide)','canva-ai-student-design-guide',
     'Canva AI lets students create professional presentations, posters, infographics, and social media graphics without any design skills. Here is the complete guide.',
     '<h2>Why Every Student Needs Canva AI in 2025</h2><p>Design used to require expensive software and years of training. Canva AI makes it even simpler — you describe what you want and it builds it.</p><h2>Setting Up Your Free Canva Account</h2><p>Sign up at canva.com. Students at many universities get Canva Pro free through Canva for Education.</p><h2>Magic Design — Create Anything Instantly</h2><p>Click Create a Design then Magic Design. Describe what you need and Canva generates multiple complete designs in seconds.</p><h2>Magic Write — AI Writing Inside Canva</h2><p>Use Magic Write to generate slide content, poster text, or captions directly inside your design.</p><h2>Text to Image — Create Custom Graphics</h2><p>Canva''s text to image generator creates custom illustrations and photos from text prompts.</p><h2>Best Student Use Cases</h2><p><strong>Presentations, assignment covers, infographics, LinkedIn banners, study flashcards.</strong></p><h2>Pro Tips</h2><p>Use the Brand Kit feature even on the free plan to set consistent colors and fonts across designs.</p>',
     'ai-tools','🎨',7,false,true,
     ARRAY['Canva AI','Design','Presentations','Students','Free Tools']),

    ('How to Study for Exams in 3 Days: The Emergency Study Plan','study-for-exams-3-days-emergency-plan',
     'Exams in 3 days and you have not started yet. This emergency study plan tells you exactly what to do hour by hour to maximize your marks in minimum time.',
     '<h2>First: Stop Panicking</h2><p>Three days is genuinely enough time to pass if you follow a strategic plan based on memory research.</p><h2>Day 1: Triage and Active Learning</h2><p><strong>Morning:</strong> Get past exam papers and identify topics that appear every year. <strong>Afternoon:</strong> Study top priority topics using active recall, not passive rereading. <strong>Evening:</strong> Do one full past paper without notes.</p><h2>Day 2: Practice and Patch Gaps</h2><p>Mark the past paper. Identify weak areas. Study only those. Do another past paper in the evening.</p><h2>Day 3: Final Review and Sleep</h2><p>Quick review of formula sheets and definitions. Do NOT learn new topics. Sleep 8 hours — sleep consolidates memory and is non-negotiable.</p><h2>The Hour Before the Exam</h2><p>Stop studying 30 minutes before. Eat something. Breathe. You have done the work.</p><h2>Why This Works</h2><p>Active recall and past-paper practice produce 2-3x better retention than rereading notes for the same amount of time.</p>',
     'study-tips','⏰',9,true,true,
     ARRAY['Exam Prep','Study Tips','Cramming','Time Management','Students']),

    ('Perplexity AI: The Best Free Research Tool for Students','perplexity-ai-student-research-guide',
     'Perplexity AI is the research tool every student should be using. Real-time web search with cited sources, completely free for the basic plan.',
     '<h2>What Makes Perplexity Different</h2><p>Perplexity combines AI with real-time web search and always cites its sources. Every claim links back to where it came from — exactly what you need for academic research.</p><h2>How to Use It for Assignments</h2><p>Ask focused research questions. Perplexity returns a summarized answer with numbered citations. Click each citation to verify the source before quoting.</p><h2>Focus Modes</h2><p>Use Academic mode for scholarly sources, YouTube mode for video research, Reddit mode for community opinions.</p><h2>Free vs Pro</h2><p>The free plan is generous: unlimited basic searches plus 5 Pro searches daily. Pro ($20/month) gives advanced models — not necessary for most students.</p><h2>Why Perplexity Beats Google for Research</h2><p>You get answers with sources in seconds instead of clicking through 10 results. The citations make verification trivial.</p>',
     'ai-tools','🔍',6,false,true,
     ARRAY['Perplexity','AI Tools','Research','Students','Free']),

    ('Best Free Productivity Apps for Students in 2025','best-free-productivity-apps-students-2025',
     'The complete list of free productivity apps that actually make a difference for university students. Tested across a full semester.',
     '<h2>Notion — All-in-One Workspace</h2><p>Notes, tasks, databases, wikis. Free for students with the Education plan. Replace 5 different apps with one.</p><h2>Todoist — Task Management</h2><p>Simple, fast, cross-platform. Natural language input ("Submit essay tomorrow at 5pm") makes capture effortless.</p><h2>Forest — Focus Timer</h2><p>Pomodoro timer that grows a virtual tree while you focus. Surprisingly effective at preventing phone use.</p><h2>Anki — Spaced Repetition Flashcards</h2><p>The single best app for memorizing anything. Completely free on desktop and Android.</p><h2>Obsidian — Knowledge Base</h2><p>Local-first markdown notes with linking. Free forever. Best for serious note-takers.</p><h2>Google Calendar</h2><p>Free, syncs everywhere, works with everything. Time-block your study sessions like meetings.</p><h2>My Recommended Stack</h2><p>Notion + Todoist + Anki + Forest covers 95% of student productivity needs and costs nothing.</p>',
     'productivity','⚡',7,false,true,
     ARRAY['Productivity','Apps','Free Tools','Students','Notion','Anki']),

    ('NPV Explained Simply for BBA Students (With Examples)','npv-explained-bba-students',
     'Net Present Value confused you in finance class? Here is NPV explained in plain English with worked examples — no jargon, no skipped steps.',
     '<h2>What is NPV Actually?</h2><p>Net Present Value answers one question: is this investment worth it today? It converts future cash flows back to today''s value and compares them to what you spend upfront.</p><h2>The Core Idea</h2><p>$100 today is worth more than $100 next year. NPV uses a discount rate to translate future money into today''s equivalent.</p><h2>The Formula in Plain English</h2><p>NPV = Sum of (cash flow / (1 + r)^t) − initial investment. Where r is the discount rate and t is the year.</p><h2>Worked Example</h2><p>Invest $1,000. Get $600 in year 1 and $600 in year 2. Discount rate 10%. NPV = 600/1.1 + 600/1.21 − 1000 = 545.45 + 495.87 − 1000 = $41.32. Positive NPV means accept.</p><h2>Decision Rule</h2><p>NPV > 0: accept the project. NPV < 0: reject. NPV = 0: indifferent.</p><h2>Common Exam Mistakes</h2><p>Forgetting year 0 cash flow, using wrong discount rate, mixing up real vs nominal rates.</p>',
     'business-finance','💰',8,false,false,
     ARRAY['NPV','Finance','BBA','Business','Tutorial']),

    ('How to Build a Personal Brand on LinkedIn as a University Student','personal-brand-linkedin-university-student',
     'Most students treat LinkedIn as a digital CV. The ones who get internships and jobs use it as a personal brand platform. Here is how to do it.',
     '<h2>Why LinkedIn Matters for Students</h2><p>Recruiters search LinkedIn before reading your CV. A strong profile creates inbound opportunities most students never see.</p><h2>Profile Essentials</h2><p>Professional headshot, clear headline that says what you do not just your degree, customized URL, banner image relevant to your field.</p><h2>The About Section</h2><p>First-person, conversational, three short paragraphs: who you are, what you''re working on, what you''re looking for. End with a call to action.</p><h2>Post Weekly</h2><p>Share what you''re learning, mini case studies from your coursework, book takeaways. Consistency beats virality.</p><h2>Engage More Than You Post</h2><p>Comment thoughtfully on posts from people in your industry every day. This builds visibility faster than your own posts at the start.</p><h2>Network Strategically</h2><p>Connect with 5 people per week with personalized notes. Aim for alumni and people at companies you want to work for.</p>',
     'productivity','🔗',7,false,true,
     ARRAY['LinkedIn','Personal Brand','Career','Students','Networking']),

    ('How to Pass Multiple Choice Exams: Strategies That Actually Work','pass-multiple-choice-exam-strategies',
     'Multiple choice exams reward strategy as much as knowledge. These techniques boost your score even when you''re not sure of the answer.',
     '<h2>Read the Question Twice Before Looking at Options</h2><p>Forming your own answer first prevents the options from biasing your thinking.</p><h2>Eliminate Wrong Answers First</h2><p>Removing 2 obviously wrong options turns a 25% guess into a 50% guess.</p><h2>Watch for Absolutes</h2><p>"Always" and "never" are usually wrong. "Often" and "sometimes" are usually right.</p><h2>Longest Answer Is Often Correct</h2><p>Test writers add qualifiers to correct answers to make them precise. Long, detailed options are often right.</p><h2>"All of the Above" Bias</h2><p>If two options look correct, "All of the above" is probably the answer.</p><h2>Trust Your First Instinct</h2><p>Research shows changing your answer hurts more often than it helps — unless you find a clear reason to change.</p><h2>Time Management</h2><p>Spend no more than 60 seconds per question on first pass. Mark hard ones and return at the end.</p>',
     'study-tips','✅',6,false,true,
     ARRAY['MCQ','Exam Strategy','Study Tips','Test Taking','Students']),

    ('Gamma.app Review 2025: Is It Worth It for Student Presentations?','gamma-app-review-2025',
     'I used Gamma.app for 10 university presentations. Here is my honest review of what it does well, where it falls short, and whether it is worth using.',
     '<h2>What is Gamma.app?</h2><p>Gamma is an AI-powered presentation tool that creates complete, professionally designed slide decks from a text prompt in about 30 seconds.</p><h2>What Gamma Does Brilliantly</h2><p><strong>Speed:</strong> Topic to complete presentation in under two minutes. <strong>Design quality:</strong> Professional defaults non-designers cannot match. <strong>AI content:</strong> Surprisingly good first drafts for academic topics.</p><h2>Where Gamma Falls Short</h2><p><strong>Content accuracy:</strong> Always verify generated facts. <strong>Free plan limits:</strong> Limited AI generations per month. <strong>Less control than PowerPoint</strong> for strict templates.</p><h2>My Verdict</h2><p>Excellent for most university presentations. Saves 2-3 hours per deck. Use Gamma for structure and design, then edit content carefully for accuracy.</p><h2>Pricing</h2><p>Free plan with limited generations. Pro is $8/month.</p>',
     'ai-tools','🎯',8,false,false,
     ARRAY['Gamma','Presentations','AI Tools','Review','Students']),

    ('Digital Minimalism for Students: How to Use Your Phone Less and Study More','digital-minimalism-students-phone',
     'The average student spends 6 hours a day on their phone. Digital minimalism is about redesigning your phone to support your goals instead of working against them.',
     '<h2>The Real Cost of Phone Overuse</h2><p>Six hours a day is 42 hours a week — a full-time job spent on fragmented attention.</p><h2>Step 1: Audit Your Usage</h2><p>Check screen time settings. Most people underestimate usage by 50-100%.</p><h2>Step 2: High-Value vs Low-Value Apps</h2><p>High-value: Maps, WhatsApp, Notion, banking. Low-value: TikTok, Reels, infinite-scroll feeds.</p><h2>Step 3: Redesign Your Phone</h2><p>Remove social apps for 30 days. Blank home screen. Turn off all notifications except calls and specific people.</p><h2>Step 4: Phone-Free Zones and Times</h2><p>No phone at the study desk, library, or dinner table. No phone the first or last hour of the day.</p><h2>Step 5: Replace, Don''t Just Remove</h2><p>Replace phone use with books, music, walks, notebooks. Removing without replacing creates relapse.</p><h2>What Changes After 30 Days</h2><p>Longer focus periods, lower anxiety, more reading, more free time, better relationships.</p>',
     'productivity','📵',8,false,false,
     ARRAY['Digital Minimalism','Phone','Productivity','Focus','Students'])
  ) as p(title, slug, excerpt, content, cat_slug, emoji, rt, featured, popular, tags)
) v
on conflict (slug) do nothing;

update categories set post_count = (
  select count(*) from posts
  where category_id = categories.id and published = true
);

end $$;