import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { contactPage as t } from "@/content/pages";
import { company } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/pages/PageHero";

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/contact" },
};

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.mapsQuery)}`;

type Item = { icon: LucideIcon; label: string; value: string; href?: string; action?: string; external?: boolean };

const items: Item[] = [
  { icon: Phone, label: t.phone, value: company.phoneDisplay, href: company.phoneHref },
  { icon: MessageCircle, label: t.whatsapp.label, value: company.phoneDisplay, href: company.whatsappHref, action: t.whatsapp.action, external: true },
  { icon: Mail, label: t.email, value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, label: t.address.label, value: company.address, href: mapsHref, action: t.address.action, external: true },
  { icon: Clock, label: t.hours.label, value: t.hours.value },
];

export default function ContactPage() {
  return (
    <>
      <PageHero id="contact-title" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map(({ icon: Icon, label, value, href, action, external }) => (
              <li key={label}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-electric-soft">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">{label}</h2>
                  </div>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-4 block text-lg font-semibold break-words text-ink hover:text-electric-soft"
                    >
                      {value}
                      {action && <span className="mt-1 block text-sm font-medium text-electric-soft">{action}</span>}
                      {external && <span className="sr-only"> (nouvel onglet)</span>}
                    </a>
                  ) : (
                    <p className="mt-4 text-lg font-semibold">{value}</p>
                  )}
                </GlassCard>
              </li>
            ))}
          </ul>

          <div className="glass flex flex-col items-start gap-4 self-start rounded-(--radius-card) p-8">
            <h2 className="font-display text-2xl font-semibold">{t.quote.title}</h2>
            <p className="text-ink-muted">{t.quote.text}</p>
            <Button href={t.quote.href}>{t.quote.label}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
