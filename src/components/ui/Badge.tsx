import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Petite étiquette : pôles d'un projet, badges de confiance, mentions « exemple ». */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "electric" | "orange" | "warning";
  className?: string;
}) {
  const tones = {
    neutral: "border-white/10 bg-white/5 text-ink-muted",
    electric: "border-electric/40 bg-electric/10 text-electric-soft",
    orange: "border-orange/40 bg-orange/10 text-orange",
    warning: "border-amber-300/40 bg-amber-300/10 text-amber-200",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}
