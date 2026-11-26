import type { MetadataRoute } from "next";
import { POLE_IDS } from "@/lib/poles";
import { realisations } from "@/content/realisations";

const BASE = "https://kazele.ci";

/** Plan du site pour les moteurs de recherche (généré au build). Ajouter ici toute nouvelle page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/expertises", priority: 0.9 },
    ...POLE_IDS.map((id) => ({ path: `/expertises/${id}`, priority: 0.9 })),
    { path: "/realisations", priority: 0.8 },
    ...realisations.map((r) => ({ path: `/realisations/${r.slug}`, priority: 0.7 })),
    { path: "/a-propos", priority: 0.7 },
    { path: "/engagements", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/devis", priority: 0.6 },
    { path: "/mentions-legales", priority: 0.2 },
    { path: "/confidentialite", priority: 0.2 },
    { path: "/cookies", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({ url: `${BASE}${path}`, priority }));
}
