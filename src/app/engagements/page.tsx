import type { Metadata } from "next";
import { Camera, CircleCheck, FileText, HardHat, Leaf, ShieldCheck, UserRound, X, type LucideIcon } from "lucide-react";
import { engagementsPage as t } from "@/content/pages";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/pages/PageHero";

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/engagements" },
};

const icons: Record<(typeof t.items)[number]["icon"], LucideIcon> = {
  user: UserRound,
  file: FileText,
  camera: Camera,
  hardhat: HardHat,
  check: CircleCheck,
  leaf: Leaf,
  shield: ShieldCheck,
};

export default function EngagementsPage() {
  return (
    <>
      <PageHero id="engagements-title" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <Section className="pt-10 sm:pt-14">
        <ol className="grid gap-5 md:grid-cols-2">
          {t.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title}>
                <GlassCard as="article" className="h-full">
                  <div className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-electric-soft">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h2 className="text-lg font-semibold">
                      <span className="sr-only">Engagement {i + 1} : </span>
                      {item.title}
                    </h2>
                  </div>
                  <p className="mt-4 leading-relaxed text-ink-muted">{item.text}</p>
                  {"verify" in item && (
                    <p className="mt-5 border-t border-white/10 pt-4 text-sm">
                      <span className="font-semibold text-orange">{t.verifyLabel} : </span>
                      {item.verify}
                    </p>
                  )}
                </GlassCard>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold">{t.honesty.title}</h2>
            <ul className="mt-5 space-y-3">
              {t.honesty.items.map((line) => (
                <li key={line} className="flex gap-3 text-ink-muted">
                  <X size={18} aria-hidden="true" className="mt-1 shrink-0 text-orange" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass flex flex-col items-start gap-4 rounded-(--radius-card) p-8">
            <p className="text-lg font-medium">{t.cta.title}</p>
            <Button href={t.cta.href}>{t.cta.label}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
