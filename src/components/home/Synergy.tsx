import { synergy } from "@/content/home";
import { POLES } from "@/lib/poles";
import { Button } from "@/components/ui/Button";
import { PoleIcon } from "@/components/ui/PoleIcon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

/** Bloc 4 — la synergie : les 4 pôles reliés sur une même ligne de projet. */
export function Synergy() {
  return (
    <Section labelledBy="synergy-title" className="bg-gradient-to-b from-navy-deep via-navy/60 to-base">
      <SectionHeading id="synergy-title" eyebrow="Interlocuteur unique" title={synergy.title} intro={synergy.text} align="center" />

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        {/* Ligne de réseau qui relie les étapes (desktop) */}
        <span
          aria-hidden="true"
          className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-px bg-[repeating-linear-gradient(90deg,var(--color-electric)_0_8px,transparent_8px_16px)] opacity-70 md:block"
        />
        {synergy.steps.map((step, i) => (
          <Reveal as="li" key={step.pole} delay={i * 120} className="relative flex flex-col items-center text-center">
            <PoleIcon pole={step.pole} size="lg" className="relative self-center bg-navy-deep" />
            <span className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
              {String(i + 1).padStart(2, "0")} · {POLES[step.pole].label}
            </span>
            <p className="mt-2 max-w-[16rem] text-base leading-relaxed text-ink">{step.text}</p>
          </Reveal>
        ))}
      </ol>

      <div className="mt-14 flex justify-center">
        <Button href={synergy.cta.href} variant="secondary" size="lg">
          {synergy.cta.label}
        </Button>
      </div>
    </Section>
  );
}
