import { GraduationCap } from "lucide-react";

export function DifficultyBadge({
  level,
  size = "sm",
}: {
  level: "Beginner" | "Intermediate" | "Advanced";
  size?: "sm" | "md";
}) {
  const styles = {
    Beginner: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    Intermediate: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    Advanced: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  } as const;
  const cls = styles[level];
  const sz = size === "md" ? "text-xs px-2.5 py-1" : "text-[10px] px-2 py-0.5";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold border ${cls} ${sz}`}>
      <GraduationCap className={size === "md" ? "h-3.5 w-3.5" : "h-3 w-3"} />
      {level}
    </span>
  );
}
