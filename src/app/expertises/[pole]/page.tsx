import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, Check, ChevronDown, LockKeyhole } from "lucide-react";
import { projects } from "@/content/home";
import { poleIndex as t, polesContent } from "@/content/poles";
import { POLE_IDS, POLE_LIST, POLES, type PoleId } from "@/lib/poles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { PoleIcon } from "@/components/ui/PoleIcon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/home/ProjectCard";

/** Les 4 pages sont générées au build : pages statiques, servies directement par le CDN. */
export function generateStaticParams() {
  return POLE_IDS.map((pole) => ({ pole }));
}


/** Toute autre valeur que les 4 pôles renvoie une vraie 404. */
export const dynamicParams = false;

const isPole = (v: string): v is PoleId => (POLE_IDS as readonly string[]).includes(v);

export async function generateMetadata({ params }: PageProps<"/expertises/[pole]">): Promise<Metadata> {
  const { pole } = await params;
  if (!isPole(pole)) return {};
  const c = polesContent[pole];
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: POLES[pole].href } };
}

export default async function PolePage({ params }: PageProps<"/expertises/[pole]">) {
  const { pole: slug } = await params;
  if (!isPole(slug)) notFound();
  const pole = POLES[slug];
  const c = polesContent[slug];
  const related = projects.items.filter((p) => p.poles.includes(slug));
  const others = POLE_LIST.filter((p) => p.id !== slug);
  const quoteHref = `/devis?pole=${slug}`;

  // Données structurées (Google) : service proposé + FAQ.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${pole.label} — KAZELE INFO & BTP`,
      description: c.metaDescription,
      provider: { "@type": "Organization", name: "KAZELE INFO & BTP" },
      areaServed: { "@type": "Country", name: "Côte d'Ivoire" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // Échappement de « < » : empêche toute sortie du bloc script.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* En-tête de page */}
      <section aria-labelledby="pole-title" className="bg-blueprint relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 size-[36rem] rounded-full opacity-25 blur-3xl"
          style={{ background: pole.color }}
        />
        <Container className="relative py-14 sm:py-20">
          <nav aria-label="Fil d'Ariane" className="text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-ink">{t.backHome}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/expertises" className="hover:text-ink">{t.metaTitle}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">{pole.label}</li>
            </ol>
          </nav>
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
            <PoleIcon pole={slug} size="lg" className="scale-150 sm:ml-4" />
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: pole.color }}>{pole.label}</p>
              <h1 id="pole-title" className="mt-3 text-4xl leading-tight font-bold sm:text-5xl">{c.hero.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">{c.hero.text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={quoteHref} size="lg" icon={<LockKeyhole size={18} />}>{t.quoteCta}</Button>
                <Button href="#services" size="lg" variant="secondary" icon={<ArrowDown size={18} />} iconPosition="end">{t.servicesTitle}</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <Section id="services" labelledBy="services-title">
        <SectionHeading id="services-title" eyebrow={pole.label} title={t.servicesTitle} />
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {c.services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80}>
              <GlassCard as="article" glow={pole.color} className="h-full">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-ink-muted">{s.text}</p>
                <ul className="mt-5 grid gap-2 border-t border-white/10 pt-5 text-sm sm:grid-cols-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: pole.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Méthode */}
      <Section labelledBy="approach-title" className="bg-navy-deep/60">
        <SectionHeading id="approach-title" eyebrow="Méthode" title={c.approach.title} intro={c.approach.intro} />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {c.approach.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="bg-surface p-7">
              <span className="font-display text-4xl font-bold text-orange" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-semibold"><span className="sr-only">Étape {i + 1} : </span>{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Pour qui + FAQ */}
      <Section labelledBy="faq-title">
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">{c.forWho.title}</h2>
            <ul className="mt-6 space-y-3">
              {c.forWho.items.map((item) => (
                <li key={item} className="glass flex gap-3 rounded-xl p-4 text-sm">
                  <Check size={18} aria-hidden="true" className="shrink-0 text-electric" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="faq-title" className="font-display text-2xl font-semibold">{t.faqTitle}</h2>
            {/* <details> : accordéon natif, accessible au clavier et sans JavaScript */}
            <div className="mt-6 divide-y divide-line border-y border-line">
              {c.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-ink-muted transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Réalisations liées */}
      {related.length > 0 && (
        <Section labelledBy="related-title" className="pt-0 sm:pt-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="related-title" className="font-display text-2xl font-semibold sm:text-3xl">{t.projectsTitle}</h2>
            <Button href={`/realisations?pole=${slug}`} variant="ghost" icon={<ArrowRight size={16} />} iconPosition="end">{projects.cta.label}</Button>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}><ProjectCard project={p} /></li>
            ))}
          </ul>
        </Section>
      )}

      {/* Les autres pôles */}
      <Section labelledBy="others-title" className="bg-gradient-to-b from-base to-navy-deep/50">
        <SectionHeading id="others-title" title={t.otherPolesTitle} intro={t.otherPolesText} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <li key={p.id}>
              <GlassCard glow={p.color} className="h-full">
                <PoleIcon pole={p.id} />
                <h3 className="mt-4 font-display text-lg font-semibold">{p.label}</h3>
                <Link href={p.href} className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-electric-soft after:absolute after:inset-0 after:content-['']">
                  {polesContent[p.id].hero.title}
                  <ArrowRight size={16} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </GlassCard>
            </li>
          ))}
        </ul>
      </Section>

      {/* Appel à l'action */}
      <section aria-labelledby="pole-cta-title" className="px-3 py-20 sm:px-5 sm:py-28">
        <Container className="bg-blueprint relative overflow-hidden rounded-[2rem] border border-electric/25 bg-gradient-to-br from-navy to-base py-14 text-center sm:py-20">
          <h2 id="pole-cta-title" className="text-3xl font-bold sm:text-4xl">{c.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-muted">{c.cta.text}</p>
          <Button href={quoteHref} size="lg" icon={<LockKeyhole size={18} />} className="mt-8">{t.quoteCta}</Button>
        </Container>
      </section>
    </>
  );
}
