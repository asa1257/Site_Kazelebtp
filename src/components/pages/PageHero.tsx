import Link from "next/link";
import { Container } from "@/components/ui/Container";

/** En-tête commun des pages intérieures : fil d'Ariane, sur-titre, H1, introduction. */
export function PageHero({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro: string }) {
  return (
    <section aria-labelledby={id} className="bg-blueprint">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-ink">Accueil</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{eyebrow}</li>
          </ol>
        </nav>
        <div className="mt-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-electric-soft">{eyebrow}</p>
          <h1 id={id} className="mt-3 text-4xl leading-tight font-bold sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>
        </div>
      </Container>
    </section>
  );
}
