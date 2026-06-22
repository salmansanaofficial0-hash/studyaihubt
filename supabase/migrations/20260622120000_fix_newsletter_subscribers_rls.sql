-- Fix newsletter_subscribers table, RLS policies, and admin read access

ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true;

ALTER TABLE public.newsletter_subscribers
  ALTER COLUMN source SET DEFAULT 'website';

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can insert" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can insert newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can insert newsletter authenticated" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin can read subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Public can insert newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can insert newsletter authenticated"
  ON public.newsletter_subscribers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can read subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');
