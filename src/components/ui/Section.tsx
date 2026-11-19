import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  /** Id du titre, relié à la section pour les lecteurs d'écran. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

/** Enveloppe de section : espacement vertical commun + région nommée pour l'accessibilité. */
export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
};

/** Sur-titre + H2 + introduction, avec le même rythme sur toute la page. */
export function SectionHeading({ id, eyebrow, title, intro, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-electric-soft">{eyebrow}</p>
      )}
      <h2 id={id} className="text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>}
    </div>
  );
}
