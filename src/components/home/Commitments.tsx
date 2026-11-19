import { HardHat, Leaf, ShieldCheck, ClipboardCheck } from "lucide-react";
import { commitments } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";

const businessIcons = [HardHat, ClipboardCheck, Leaf];

/** Bloc 7 — engagements métier (gauche) + badges de sécurité numérique (droite). */
export function Commitments() {
  return (
    <Section labelledBy="commitments-title">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading id="commitments-title" eyebrow="Engagements & sécurité" title={commitments.title} intro={commitments.intro} />
          <ul className="mt-10 space-y-6">
            {commitments.business.map((item, i) => {
              const Icon = businessIcons[i] ?? ShieldCheck;
              return (
                <li key={item.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-electric-soft">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <Button href={commitments.cta.href} variant="secondary" className="mt-10">
            {commitments.cta.label}
          </Button>
        </div>

        <ul className="grid content-start gap-3 sm:grid-cols-2" aria-label="Sécurité numérique">
          {commitments.digitalBadges.map((badge) => (
            <li key={badge} className="glass flex items-start gap-3 rounded-2xl p-5">
              <ShieldCheck size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-electric" />
              <span className="text-sm font-medium leading-snug">{badge}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
