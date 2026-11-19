import Image from "next/image";
import type { CSSProperties } from "react";
import { POLES, type PoleId } from "@/lib/poles";
import { cn } from "@/lib/cn";

type PoleIconProps = {
  pole: PoleId;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = { sm: 32, md: 48, lg: 64 };

/**
 * Pictogramme officiel d'un pôle (cercle bleu/orange du logo, version fond sombre).
 * Décoratif : le nom du pôle est toujours écrit à côté, donc alt="".
 * Le halo prend la couleur du pôle ; il s'intensifie au survol de la carte parente (group).
 */
export function PoleIcon({ pole, size = "md", className }: PoleIconProps) {
  const { icon, color } = POLES[pole];
  const px = sizes[size];
  return (
    <span
      aria-hidden="true"
      style={{ "--pole": color, width: px, height: px } as CSSProperties}
      className={cn(
        "inline-grid shrink-0 self-start place-items-center rounded-full bg-base",
        "shadow-[0_0_20px_-8px_var(--pole)] transition-shadow duration-300 group-hover:shadow-[0_0_32px_-4px_var(--pole)]",
        className,
      )}
    >
      <Image src={icon} alt="" width={px} height={px} sizes={`${px}px`} className="block" />
    </span>
  );
}
