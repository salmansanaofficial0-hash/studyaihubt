import { supabase } from "@/integrations/supabase/client";

export async function subscribeToNewsletter(email: string, source: string) {
  const clean = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: clean, source });
  if (error) {
    // 23505 = unique violation -> treat as success (already subscribed)
    if ((error as any).code === "23505") return { ok: true, already: true };
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
