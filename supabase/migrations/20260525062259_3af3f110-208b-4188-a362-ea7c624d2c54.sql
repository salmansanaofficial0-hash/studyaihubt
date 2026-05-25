-- Remove the public SELECT policy that exposed email column
DROP POLICY IF EXISTS "Public read approved comments" ON public.comments;

-- Create a safe view exposing only non-sensitive columns for approved comments
CREATE OR REPLACE VIEW public.approved_comments
WITH (security_invoker = false) AS
SELECT id, post_id, name, message, created_at
FROM public.comments
WHERE approved = true;

GRANT SELECT ON public.approved_comments TO anon, authenticated;