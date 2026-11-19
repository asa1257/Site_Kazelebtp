import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
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
  return (
    <section aria-labelledby="devis-title" className="bg-blueprint relative py-14 sm:py-20">
      <Container className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric-soft">{devis.intro.eyebrow}</p>
        <h1 id="devis-title" className="mt-3 text-4xl font-bold sm:text-5xl">{devis.intro.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">{devis.intro.text}</p>
        <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
          <ShieldCheck size={18} aria-hidden="true" className="text-electric" />
          {devis.intro.security}
        </p>
        <div className="mt-10">
          <QuoteForm />
        </div>
      </Container>
    </section>
  );
}
