import { testimonials } from "@/content/home";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * Bloc 8 — témoignages. Si la liste est vide, la section n'est pas rendue du tout :
 * aucun faux témoignage, aucun bloc vide.
 */
export function Testimonials() {
  if (testimonials.items.length === 0) return null;

  return (
    <Section labelledBy="testimonials-title">
      <SectionHeading id="testimonials-title" eyebrow={testimonials.logosLabel} title={testimonials.title} intro={testimonials.intro} />
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.items.map((t) => (
          <li key={t.name}>
            <GlassCard as="article" className="h-full">
              <figure>
                <blockquote className="text-base leading-relaxed text-ink">« {t.quote} »</blockquote>
                <figcaption className="mt-5 text-sm text-ink-muted">
                  <span className="font-semibold text-ink">{t.name}</span>, {t.role} — {t.company}
                </figcaption>
              </figure>
            </GlassCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}
