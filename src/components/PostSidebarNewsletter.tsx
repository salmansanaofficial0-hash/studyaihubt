import { useNewsletterForm } from "@/hooks/useNewsletterForm";

export function PostSidebarNewsletter({ slug }: { slug: string }) {
  const { email, setEmail, status, message, handleSubmit } = useNewsletterForm(`post:${slug}`);

  if (status === "success" || status === "duplicate") {
    return (
      <div className="rounded-2xl border border-border p-5 bg-gradient-brand text-white">
        <p className="font-semibold">Free weekly digest</p>
        <p className="mt-3 text-sm text-white/90">
          {status === "success" ? "🎉 Subscribed! Check your inbox." : message}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border p-5 bg-gradient-brand text-white">
      <p className="font-semibold">Free weekly digest</p>
      <p className="mt-1 text-xs text-white/85">AI tools and study tips, every Friday.</p>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading"}
          className="px-3 py-2 rounded-md bg-white/15 placeholder:text-white/70 text-white text-sm outline-none disabled:opacity-60"
        />
        <button
          disabled={status === "loading"}
          className="px-3 py-2 rounded-md bg-white text-primary text-sm font-semibold disabled:opacity-70"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
        {status === "error" && message && (
          <p className="text-xs text-white/90">{message}</p>
        )}
      </form>
    </div>
  );
}
