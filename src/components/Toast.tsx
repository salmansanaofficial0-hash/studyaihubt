import { useEffect, useState } from "react";

export function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-50 bg-foreground text-background px-4 py-2.5 rounded-lg shadow-xl text-sm animate-in slide-in-from-bottom">
      {message}
    </div>
  );
}

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2000);
    return () => clearTimeout(t);
  }, [msg]);
  return { msg, show: setMsg };
}
