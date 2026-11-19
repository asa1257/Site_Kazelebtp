import { method } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * Bloc 6 — « Notre méthode », qui remplace les chiffres clés tant qu'ils ne sont pas consolidés.
 * Les numéros d'étape reprennent l'orange réservé aux chiffres clés : la section gardera sa place
 * et son style quand les compteurs réels arriveront.
 */
export function Method() {
  return (
    <Section labelledBy="method-title" className="bg-navy-deep/60">
      <SectionHeading id="method-title" eyebrow="Notre méthode" title={method.title} intro={method.intro} />

      <ol className="mt-14 grid gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {method.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 100} className="bg-surface p-7">
            <span className="font-display text-5xl font-bold text-orange" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-lg font-semibold">
              <span className="sr-only">Étape {i + 1} : </span>
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
          </Reveal>
        ))}
      </ol>

      <div className="mt-10">
        <Button href={method.cta.href} size="lg">
          {method.cta.label}
        </Button>
      </div>
    </Section>
  );
}
