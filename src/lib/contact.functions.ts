import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string; email: string; subject?: string; message: string }) =>
    z.object({
      name: z.string().trim().min(1).max(200),
      email: z.string().trim().email().max(320),
      subject: z.string().trim().max(200).optional(),
      message: z.string().trim().min(10).max(5000),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      subject: data.subject ?? null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
