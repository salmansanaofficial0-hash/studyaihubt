DROP POLICY IF EXISTS "Public read approved comments" ON public.comments;
REVOKE SELECT ON public.comments FROM anon, authenticated;