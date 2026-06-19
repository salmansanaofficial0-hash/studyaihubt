import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Twitter, Instagram, Youtube, Linkedin, Mail, MapPin } from "lucide-react";
import { submitContact } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us | StudyAI Hub" },
      { name: "description", content: "Get in touch with StudyAI Hub — suggest a topic, report an error, or ask about collaboration. We reply within 24 hours." },
      { property: "og:title", content: "Contact Us | StudyAI Hub" },
      { property: "og:description", content: "Send us a message. We reply within 24 hours." },
      { property: "og:url", content: "https://studyaihub.tech/contact" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihub.tech/contact" }],
  }),
});

function ContactPage() {
  const send = useServerFn(submitContact);
  const [form, setForm] = useState({ name: "", email: "", subject: "General", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerErr(null);
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required";
    if (form.message.trim().length < 10) next.message = "Min 10 characters";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setLoading(true);
    try {
      await send({ data: form });
      setSent(true);
    } catch (err) {
      setServerErr(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-brand text-white text-4xl mb-4">
          🎉
        </div>
        <h1 className="mt-4 text-3xl font-extrabold">Message received!</h1>
        <p className="mt-3 text-muted-foreground">
          Thanks for reaching out. I read every message and reply within 24 hours.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          You can also email directly:{" "}
          <a href="mailto:hello@studyaihub.tech" className="text-primary underline">
            hello@studyaihub.tech
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <p className="text-sm text-primary font-medium">Contact</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Say hi 👋</h1>
      <p className="mt-3 text-muted-foreground">
        Got a topic you'd like covered, a tool to recommend, spotted an error, or just want to chat? Drop a line — I
        read everything.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 text-primary" />
          <a href="mailto:hello@studyaihub.tech" className="text-primary hover:underline">
            hello@studyaihub.tech
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>Karachi, Pakistan</span>
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <Field label="Name" error={errors.name}>
          <input
            id="contact-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            className="w-full px-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary"
          />
        </Field>
        <Field label="Subject">
          <select
            id="contact-subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary"
          >
            <option>General</option>
            <option>Topic suggestion</option>
            <option>Tool recommendation</option>
            <option>Collaboration</option>
            <option>Error correction</option>
            <option>Bug report</option>
          </select>
        </Field>
        <Field label="Message" error={errors.message}>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell me what's on your mind..."
            className="w-full px-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary resize-none"
          />
        </Field>
        <button
          type="submit"
          id="contact-submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {serverErr && <p className="text-sm text-destructive">{serverErr}</p>}
      </form>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-sm font-semibold mb-4">Follow StudyAI Hub</p>
        <div className="flex gap-3">
          {[
            { I: Twitter, l: "Twitter / X", href: "https://twitter.com/studyaihub" },
            { I: Instagram, l: "Instagram", href: "https://instagram.com/studyaihub" },
            { I: Youtube, l: "YouTube", href: "https://youtube.com/@studyaihub" },
            { I: Linkedin, l: "LinkedIn", href: "https://linkedin.com/company/studyaihub" },
          ].map(({ I, l, href }) => (
            <a
              key={l}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow on ${l}`}
              className="h-10 w-10 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center transition-colors"
            >
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          You can also email directly at{" "}
          <a href="mailto:hello@studyaihub.tech" className="text-primary underline">
            hello@studyaihub.tech
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
