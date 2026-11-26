import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { projects, type Project } from "@/content/home";
import { POLES } from "@/lib/poles";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";

/** Carte chantier, partagée entre l'accueil, la page Réalisations et les pages pôles. */
export function ProjectCard({ project: p, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const cover = p.photos[0];
  return (
    <GlassCard as="article" glow={POLES[p.poles[0]].color} className="flex h-full flex-col overflow-hidden p-0 sm:p-0">
      <div className="relative aspect-[4/3] border-b border-white/10 bg-navy-deep">
        <Image
          src={cover.src}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-surface/85 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur">
          <Images size={14} aria-hidden="true" />
          {projects.photosLabel(p.photos.length)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {p.poles.map((id) => (
            <Badge key={id}>{POLES[id].label}</Badge>
          ))}
        </div>
        <Heading className="mt-4 text-lg font-semibold">{p.title}</Heading>
        {(p.city || p.year) && <p className="mt-1 text-sm text-ink-muted">{[p.city, p.year].filter(Boolean).join(" · ")}</p>}
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.summary}</p>
        <Link
          href={`/realisations/${p.slug}`}
          className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-electric-soft after:absolute after:inset-0 after:content-['']"
        >
          {projects.readMore}
          <span className="sr-only"> : {p.title}</span>
          <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </GlassCard>
  );
}
