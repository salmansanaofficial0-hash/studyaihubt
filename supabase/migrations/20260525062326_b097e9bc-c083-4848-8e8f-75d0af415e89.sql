-- Recreate the view with security_invoker so it respects RLS of the caller
DROP VIEW IF EXISTS public.approved_comments;
CREATE VIEW public.approved_comments
WITH (security_invoker = true) AS
SELECT id, post_id, name, message, created_at
FROM public.comments
WHERE approved = true;

GRANT SELECT ON public.approved_comments TO anon, authenticated;

-- Re-add a SELECT policy for approved rows
CREATE POLICY "Public read approved comments"
ON public.comments
FOR SELECT
TO anon, authenticated
USING (approved = true);

-- Revoke broad column access and grant only safe columns to anon/authenticated
REVOKE SELECT ON public.comments FROM anon, authenticated;
GRANT SELECT (id, post_id, name, message, created_at, approved) ON public.comments TO anon, authenticated;