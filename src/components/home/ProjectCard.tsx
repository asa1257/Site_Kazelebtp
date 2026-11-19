import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, type Project } from "@/content/home";
import { POLES } from "@/lib/poles";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";

/** Carte projet, partagée entre le portfolio de l'accueil et les pages pôles. */
export function ProjectCard({ project: p }: { project: Project }) {
  return (
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
  );
}
