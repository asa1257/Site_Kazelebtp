import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { expertises } from "@/content/home";
import { POLES } from "@/lib/poles";
import { GlassCard } from "@/components/ui/GlassCard";
import { PoleIcon } from "@/components/ui/PoleIcon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

/** Bloc 3 — les 4 cartes d'expertise, chacune s'illumine dans la couleur de son pôle. */
export function Expertises() {
  return (
    <Section id="expertises" labelledBy="expertises-title">
      <SectionHeading id="expertises-title" eyebrow="Nos expertises" title={expertises.title} intro={expertises.intro} />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {expertises.cards.map((card, i) => {
          const pole = POLES[card.pole];
          return (
            <Reveal as="li" key={card.pole} delay={i * 80} className="h-full">
              <GlassCard as="article" glow={pole.color} className="flex h-full flex-col">
                <PoleIcon pole={card.pole} size="lg" className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: pole.color }}>
                  {pole.label}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-snug">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{card.text}</p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm text-ink">
                  {card.services.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: pole.color }} />
                      {s}
                    </li>
                  ))}
                </ul>
                {/* Le lien couvre toute la carte (pseudo-élément), une seule tabulation par carte */}
                <Link
                  href={pole.href}
                  className="mt-auto flex items-center gap-1.5 pt-7 text-sm font-semibold text-electric-soft after:absolute after:inset-0 after:content-['']"
                >
                  {card.cta}
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </GlassCard>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
