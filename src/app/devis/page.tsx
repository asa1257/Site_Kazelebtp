import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { company } from "@/content/home";
import { isQuoteFormEnabled } from "@/lib/devis/enabled";
import { Button } from "@/components/ui/Button";
import { devis } from "@/content/devis";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/devis/QuoteForm";

export const metadata: Metadata = {
  title: devis.meta.title,
  description: devis.meta.description,
  // Page de conversion : indexée, mais sans intérêt dans un aperçu de partage riche.
  robots: { index: true, follow: true },
};

export default function DevisPage() {
  const enabled = isQuoteFormEnabled();
  return (
    <section aria-labelledby="devis-title" className="bg-blueprint relative py-14 sm:py-20">
      <Container className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric-soft">{devis.intro.eyebrow}</p>
        <h1 id="devis-title" className="mt-3 text-4xl font-bold sm:text-5xl">{devis.intro.title}</h1>
        {enabled && (
          <>
            <p className="mt-4 max-w-2xl text-lg text-ink-muted">{devis.intro.text}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
              <ShieldCheck size={18} aria-hidden="true" className="text-electric" />
              {devis.intro.security}
            </p>
          </>
        )}
        <div className="mt-10">{enabled ? <QuoteForm /> : <QuoteUnavailable />}</div>
      </Container>
    </section>
  );
}

function QuoteUnavailable() {
  const t = devis.unavailable;
  return (
    <div className="glass rounded-(--radius-card) p-8 sm:p-12">
      <h2 className="text-2xl font-semibold sm:text-3xl">{t.title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{t.text}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href={company.phoneHref} size="lg" icon={<Phone size={18} />}>
          {t.call} · {company.phoneDisplay}
        </Button>
        <Button href={company.whatsappHref} size="lg" variant="secondary" icon={<MessageCircle size={18} />}>
          {t.whatsapp}
        </Button>
        <Button href={`mailto:${company.email}`} size="lg" variant="secondary" icon={<Mail size={18} />}>
          {t.email}
        </Button>
      </div>
    </div>
  );
}
