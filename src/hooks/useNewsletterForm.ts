import { useState } from "react";
import { subscribeNewsletter, isValidEmail } from "@/lib/api";

export type NewsletterStatus = "idle" | "loading" | "success" | "duplicate" | "error";

export function useNewsletterForm(source = "website") {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const result = await subscribeNewsletter(email, source);

      if (result.success) {
        setStatus("success");
        setMessage(result.message);
        setEmail("");
        localStorage.setItem("studyai_subscribed", "true");
        localStorage.setItem("studyai_subscriber_email", email.toLowerCase().trim());
      } else if (result.duplicate) {
        setStatus("duplicate");
        setMessage(result.message);
        localStorage.setItem("studyai_subscribed", "true");
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  function reset() {
    setStatus("idle");
    setMessage("");
  }

  return { email, setEmail, status, message, handleSubmit, reset };
}
