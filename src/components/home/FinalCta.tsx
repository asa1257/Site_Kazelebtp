import { LockKeyhole, MessageCircle } from "lucide-react";
import { company, finalCta } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Bloc 9 — appel à l'action final. */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="px-3 pb-20 sm:px-5 sm:pb-28">
      <Container className="bg-blueprint relative overflow-hidden rounded-[2rem] border border-electric/25 bg-gradient-to-br from-navy to-base py-16 text-center sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-electric/25 blur-3xl"
        />
        <h2 id="final-cta-title" className="relative text-4xl font-bold sm:text-5xl">
          {finalCta.title}
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{finalCta.text}</p>
        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={finalCta.primary.href} size="lg" icon={<LockKeyhole size={18} />}>
            {finalCta.primary.label}
          </Button>
          <Button href={company.whatsappHref} size="lg" variant="secondary" icon={<MessageCircle size={18} />}>
            {finalCta.secondary.label}
          </Button>
        </div>
        <p className="relative mt-6 text-sm text-ink-muted">{finalCta.note}</p>
      </Container>
    </section>
  );
}
