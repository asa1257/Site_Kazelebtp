import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassCardProps = {
  children: ReactNode;
  /** Couleur de lueur au survol / focus (ex. couleur du pôle). */
  glow?: string;
  className?: string;
  as?: "div" | "article" | "li";
};

/**
 * Carte « verre flouté ». La bordure et le halo s'illuminent au survol ET au focus clavier
 * (focus-within), pour que l'effet ne soit pas réservé à la souris.
 */
export function GlassCard({ children, glow = "var(--color-electric)", className, as: Tag = "div" }: GlassCardProps) {
  return (
    <Tag
      style={{ "--glow": glow } as CSSProperties}
      className={cn(
        "glass group relative isolate overflow-hidden rounded-(--radius-card) p-6 sm:p-7",
        "transition-[border-color,box-shadow,transform] duration-300 ease-(--ease-out-soft)",
        "hover:-translate-y-1 hover:border-(--glow)/70 hover:shadow-[0_0_48px_-12px_var(--glow)]",
        "focus-within:border-(--glow)/70 focus-within:shadow-[0_0_48px_-12px_var(--glow)]",
        className,
      )}
    >
      {/* Halo radial derrière le contenu */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 -z-10 size-56 rounded-full bg-(--glow) opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20 group-focus-within:opacity-20"
      />
      {children}
    </Tag>
  );
}
