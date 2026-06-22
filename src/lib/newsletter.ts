import { subscribeNewsletter, isValidEmail } from "@/lib/api";

export { isValidEmail, subscribeNewsletter };

export async function subscribeToNewsletter(email: string, source: string) {
  const result = await subscribeNewsletter(email, source);
  return {
    ok: result.success,
    already: result.duplicate,
    error: result.success ? undefined : result.message,
    message: result.message,
  };
}
