import { ArrowDown, LockKeyhole, Check } from "lucide-react";
import { hero } from "@/content/home";
import { POLE_LIST } from "@/lib/poles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "./HeroVisual";

/** Bloc 2 — Hero. Le H1 est en texte : c'est lui le LCP, pas l'image. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-blueprint relative overflow-hidden">
      {/* Dégradé radial marine → électrique depuis la droite */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_40%,rgb(30_144_255/0.18),transparent_55%),radial-gradient(ellipse_at_70%_80%,rgb(1_44_96/0.85),transparent_60%)]"
      />
      <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:min-h-[min(88vh,820px)] lg:grid-cols-[1.15fr_1fr] lg:py-24">
        {/* Texte en premier aussi sur mobile : le message et le CTA restent au-dessus de la ligne de flottaison */}
        <div>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {POLE_LIST.map((p) => (
              <span key={p.id} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ background: p.color }} />
                {p.label}
              </span>
            ))}
          </p>

          <h1 id="hero-title" className="mt-6 text-[2rem] leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
            {hero.titleStart}
            <span className="text-gradient">{hero.titleHighlight1}</span>
            {hero.titleMiddle}
            <span className="text-gradient">{hero.titleHighlight2}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{hero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} size="lg" icon={<LockKeyhole size={18} />}>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} size="lg" variant="secondary" icon={<ArrowDown size={18} />} iconPosition="end">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-3 border-t border-line pt-6 text-sm text-ink-muted sm:grid-cols-2">
            {hero.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={16} aria-hidden="true" className="shrink-0 text-electric" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <HeroVisual label={hero.visualAlt} />
        </div>
      </Container>
    </section>
  );
}
