"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { projects } from "@/content/home";
import { POLE_IDS, POLE_LIST, POLES, type PoleId } from "@/lib/poles";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section, SectionHeading } from "@/components/ui/Section";

type Filter = PoleId | "tous";

/**
 * Bloc 5 — portfolio filtrable.
 * Le filtre est reflété dans l'URL (?pole=hydraulique) pour pouvoir partager un lien filtré,
 * sans recharger la page (history.replaceState) et sans rendre la page dynamique côté serveur.
 */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("tous");

  // Lecture initiale du filtre dans l'URL, différée hors du rendu.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("pole");
    if (p && (POLE_IDS as readonly string[]).includes(p)) {
      const frame = requestAnimationFrame(() => setFilter(p as PoleId));
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    const url = new URL(window.location.href);
    if (f === "tous") url.searchParams.delete("pole");
    else url.searchParams.set("pole", f);
    window.history.replaceState(null, "", url);
  };

  const visible = projects.items.filter((p) => filter === "tous" || p.poles.includes(filter));
  const filters: { id: Filter; label: string }[] = [{ id: "tous", label: projects.allLabel }, ...POLE_LIST.map((p) => ({ id: p.id, label: p.label }))];

  return (
    <Section id="realisations" labelledBy="projects-title">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="projects-title" eyebrow="Réalisations" title={projects.title} intro={projects.intro} />
        <Button href={projects.cta.href} variant="ghost" icon={<ArrowRight size={16} />} iconPosition="end" className="self-start lg:self-auto">
          {projects.cta.label}
        </Button>
      </div>

      {/* Filtres : boutons à bascule (aria-pressed), utilisables au clavier */}
      <div role="group" aria-label="Filtrer par expertise" className="mt-10 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(f.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                active ? "border-electric bg-electric/15 text-ink" : "border-line text-ink-muted hover:border-electric/50 hover:text-ink",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} projet{visible.length > 1 ? "s" : ""} affiché{visible.length > 1 ? "s" : ""}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.slug}>
              <GlassCard as="article" glow={POLES[p.poles[0]].color} className="flex h-full flex-col p-0 sm:p-0">
                {/* Emplacement image (AVIF via next/image quand les photos existent) */}
                <div aria-hidden="true" className="bg-blueprint relative aspect-[16/10] border-b border-white/10 bg-navy-deep">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2">
                    {p.placeholder && <Badge tone="warning">{projects.placeholderLabel}</Badge>}
                    {p.poles.map((id) => (
                      <Badge key={id}>{POLES[id].label}</Badge>
                    ))}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {p.city} · {p.year}
                  </p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-xs uppercase tracking-wider text-ink-muted">{m.label}</dt>
                        <dd className="mt-1 font-display text-lg font-semibold text-orange">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={`/realisations/${p.slug}`}
                    className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-electric-soft after:absolute after:inset-0 after:content-['']"
                  >
                    {projects.readMore}
                    <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </GlassCard>
            </li>
          ))}
        </ul>
      ) : (
        <div className="glass mt-8 flex flex-col items-start gap-5 rounded-(--radius-card) p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-ink-muted">{projects.empty.text}</p>
          <Button href={projects.empty.cta.href}>{projects.empty.cta.label}</Button>
        </div>
      )}
    </Section>
  );
}
