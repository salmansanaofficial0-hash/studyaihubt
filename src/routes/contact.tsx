import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { submitContact } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — StudyAI Hub" },
      { name: "description", content: "Get in touch with the StudyAI Hub team — questions, feedback, or collaboration." },
      { property: "og:title", content: "Contact — StudyAI Hub" },
      { property: "og:description", content: "Send us a message. We reply within 24 hours." },
      { property: "og:url", content: "https://studyaihubt.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://studyaihubt.lovable.app/contact" }],
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
        <div className="text-5xl">🎉</div>
        <h1 className="mt-4 text-3xl font-extrabold">Thanks!</h1>
        <p className="mt-3 text-muted-foreground">I'll reply within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <p className="text-sm text-primary font-medium">Contact</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Say hi 👋</h1>
      <p className="mt-3 text-muted-foreground">Got a topic you'd like covered, a tool to recommend, or just want to chat? Drop a line.</p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <Field label="Name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary"
          />
        </Field>
        <Field label="Subject">
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary"
          >
            <option>General</option>
            <option>Topic suggestion</option>
            <option>Tool recommendation</option>
            <option>Collaboration</option>
            <option>Bug report</option>
          </select>
        </Field>
        <Field label="Message" error={errors.message}>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-muted outline-none focus:ring-2 ring-primary resize-none"
          />
        </Field>
        <button disabled={loading} className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60">
          {loading ? "Sending..." : "Send Message"}
        </button>
        {serverErr && <p className="text-sm text-destructive">{serverErr}</p>}
      </form>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-sm font-semibold mb-3">Or find me here</p>
        <div className="flex gap-2">
          {[Twitter, Instagram, Youtube, Linkedin].map((I, i) => (
            <a key={i} href="#" className="h-10 w-10 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center transition-colors">
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
