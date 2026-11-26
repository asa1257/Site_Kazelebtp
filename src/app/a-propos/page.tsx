import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutPage as t } from "@/content/pages";
import { company, expertises } from "@/content/home";
import { POLES } from "@/lib/poles";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PoleIcon } from "@/components/ui/PoleIcon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/pages/PageHero";

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/a-propos" },
};

const facts = [
  { label: "Raison sociale", value: "KAZELE INFO & BTP, SARL" },
  { label: "Siège", value: company.address },
  { label: "Capital", value: company.capital },
  { label: "Gérant", value: company.manager },
  { label: "RCCM", value: company.rccm },
  { label: "NCC", value: company.ncc },
];

export default function AboutPage() {
  return (
    <>
      <PageHero id="about-title" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <Section labelledBy="story-title" className="pt-10 sm:pt-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="story-title" className="font-display text-2xl font-semibold sm:text-3xl">{t.story.title}</h2>
            {t.story.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-lg leading-relaxed text-ink-muted">{p}</p>
            ))}
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t.mission.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t.mission.text}</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="poles-title" className="bg-navy-deep/60">
        <SectionHeading id="poles-title" title={t.polesTitle} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expertises.cards.map((c) => {
            const pole = POLES[c.pole];
            return (
              <li key={c.pole}>
                <GlassCard glow={pole.color} className="h-full">
                  <PoleIcon pole={c.pole} />
                  <h3 className="mt-4 font-display text-lg font-semibold">{pole.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.text}</p>
                  <Link href={pole.href} className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-electric-soft after:absolute after:inset-0 after:content-['']">
                    {c.cta}
                    <ArrowRight size={16} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </GlassCard>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section labelledBy="values-title">
        <SectionHeading id="values-title" title={t.values.title} />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.values.items.map((v) => (
            <li key={v.title} className="bg-surface p-7">
              <h3 className="font-display text-xl font-semibold text-orange">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="team-title" className="pt-0 sm:pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="team-title" className="font-display text-2xl font-semibold sm:text-3xl">{t.team.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t.team.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={t.ctas.primary.href} icon={<ArrowRight size={18} />} iconPosition="end">{t.ctas.primary.label}</Button>
              <Button href={t.ctas.secondary.href} variant="secondary">{t.ctas.secondary.label}</Button>
            </div>
          </div>
          <div className="glass rounded-(--radius-card) p-7">
            <h2 className="font-display text-xl font-semibold">{t.factsTitle}</h2>
            <dl className="mt-5 divide-y divide-line">
              {facts.map((f) => (
                <div key={f.label} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]">
                  <dt className="text-sm text-ink-muted">{f.label}</dt>
                  <dd className="text-sm font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
