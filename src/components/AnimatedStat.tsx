import { useEffect, useRef, useState } from "react";

export function AnimatedStat({
  target,
  suffix = "+",
  label,
  Icon,
}: {
  target: number;
  suffix?: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 1500;
          const start = Date.now();
          const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress === 1) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="glass rounded-2xl p-5 flex items-center gap-4">
      <span className="h-12 w-12 rounded-xl bg-gradient-brand text-white inline-flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-2xl font-bold">
          {count.toLocaleString()}
          {suffix}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
