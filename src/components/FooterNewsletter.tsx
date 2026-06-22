import { useNewsletterForm } from "@/hooks/useNewsletterForm";

export function FooterNewsletter() {
  const { email, setEmail, status, message, handleSubmit } = useNewsletterForm("footer");

  if (status === "success" || status === "duplicate") {
    return (
      <div className="mt-5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2.5 text-sm text-accent">
        {status === "success" ? "✅ Subscribed! Check your inbox." : message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2 max-w-sm">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@university.edu"
          required
          disabled={status === "loading"}
          className={`flex-1 px-3 py-2 rounded-md bg-muted text-sm outline-none focus:ring-2 ring-primary disabled:opacity-60 ${
            status === "error" ? "ring-2 ring-destructive" : ""
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe Free"}
        </button>
      </div>
      {status === "error" && message && (
        <p className="text-xs text-destructive">{message}</p>
      )}
    </form>
  );
}

export default FooterNewsletter;
