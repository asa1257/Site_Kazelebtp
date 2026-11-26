import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { getRealisation, realisations } from "@/content/realisations";
import { POLES } from "@/lib/poles";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/home/ProjectCard";

/** Une page statique par chantier, générée au build. */
export function generateStaticParams() {
  return realisations.map((r) => ({ slug: r.slug }));
}

/** Tout autre slug renvoie une vraie 404. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getRealisation(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/realisations/${p.slug}` },
    openGraph: { images: [{ url: p.photos[0].src.src, width: p.photos[0].src.width, height: p.photos[0].src.height }] },
  };
}

export default async function RealisationPage({ params }: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const p = getRealisation(slug);
  if (!p) notFound();
  const others = realisations.filter((r) => r.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section aria-labelledby="project-title" className="bg-blueprint">
        <Container className="py-14 sm:py-20">
          <nav aria-label="Fil d'Ariane" className="text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-ink">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/realisations" className="hover:text-ink">Réalisations</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">{p.title}</li>
            </ol>
          </nav>
          <div className="mt-10 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {p.poles.map((id) => (
                <Link key={id} href={POLES[id].href} className="rounded-full focus-visible:outline-2">
                  <Badge>{POLES[id].label}</Badge>
                </Link>
              ))}
            </div>
            <h1 id="project-title" className="mt-5 text-4xl leading-tight font-bold sm:text-5xl">{p.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{p.summary}</p>
            <p className="mt-3 text-sm text-ink-muted">Réalisé par l&apos;équipe KAZELE INFO &amp; BTP.</p>
          </div>
        </Container>
      </section>

      <Section labelledBy="gallery-title" className="pt-10 sm:pt-14">
        <h2 id="gallery-title" className="sr-only">Photos du chantier</h2>
        {/* Colonnes « maçonnerie » : photos verticales et horizontales sans recadrage */}
        <ul className="gap-4 sm:columns-2">
          {p.photos.map((ph, i) => (
            <li key={i} className="mb-4 break-inside-avoid">
              <div className="overflow-hidden rounded-(--radius-card) border border-line bg-navy-deep">
                <Image
                  src={ph.src}
                  alt={ph.alt}
                  placeholder="blur"
                  priority={i === 0}
                  sizes="(min-width: 1280px) 600px, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="glass mt-12 flex flex-col items-start gap-5 rounded-(--radius-card) p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-lg">Un projet similaire ? Parlons de votre besoin.</p>
          <Button href={`/devis?pole=${p.poles[0]}`} icon={<LockKeyhole size={18} />}>Demander un devis</Button>
        </div>
      </Section>

      {others.length > 0 && (
        <Section labelledBy="others-title" className="pt-0 sm:pt-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="others-title" className="font-display text-2xl font-semibold sm:text-3xl">Autres chantiers</h2>
            <Button href="/realisations" variant="ghost" icon={<ArrowRight size={16} />} iconPosition="end">Voir toutes les réalisations</Button>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}><ProjectCard project={o} /></li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
