
-- Contact
drop policy if exists "Public submit contact" on public.contact_messages;
create policy "Public submit contact" on public.contact_messages
  for insert to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 200
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and char_length(trim(message)) between 1 and 5000
  );

-- Comments
drop policy if exists "Public submit comments" on public.comments;
create policy "Public submit comments" on public.comments
  for insert to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 100
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and char_length(trim(message)) between 1 and 2000
    and approved = false
  );

-- Reactions
drop policy if exists "Public submit reactions" on public.post_reactions;
create policy "Public submit reactions" on public.post_reactions
  for insert to anon, authenticated
  with check (
    char_length(session_id) between 8 and 128
    and reaction in ('helpful','not_helpful')
  );

-- Newsletter
drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe" on public.newsletter_subscribers
  for insert to anon, authenticated
  with check (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and char_length(email) <= 320
  );
