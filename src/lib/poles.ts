import type { StaticImageData } from "next/image";
import iconInformatique from "@/assets/brand/pole-informatique.png";
import iconConstruction from "@/assets/brand/pole-construction.png";
import iconHydraulique from "@/assets/brand/pole-hydraulique.png";
import iconMaintenance from "@/assets/brand/pole-maintenance.png";

/**
 * Source unique de vérité pour les 4 pôles du logo.
 * Navigation, cartes, filtres du portfolio et formulaire de devis lisent tous ce fichier.
 */
export const POLE_IDS = ["informatique", "construction", "hydraulique", "maintenance"] as const;
export type PoleId = (typeof POLE_IDS)[number];

export type Pole = {
  id: PoleId;
  label: string;
  href: string;
  /** Pictogramme officiel du logo, version pour fond sombre (bleu marine passé en clair). */
  icon: StaticImageData;
  /** Valeur CSS de la couleur d'accent (jeton défini dans globals.css). */
  color: string;
};

export const POLES: Record<PoleId, Pole> = {
  informatique: {
    id: "informatique",
    label: "Informatique",
    href: "/expertises/informatique",
    icon: iconInformatique,
    color: "var(--color-pole-informatique)",
  },
  construction: {
    id: "construction",
    label: "Construction",
    href: "/expertises/construction",
    icon: iconConstruction,
    color: "var(--color-pole-construction)",
  },
  hydraulique: {
    id: "hydraulique",
    label: "Hydraulique",
    href: "/expertises/hydraulique",
    icon: iconHydraulique,
    color: "var(--color-pole-hydraulique)",
  },
  maintenance: {
    id: "maintenance",
    label: "Maintenance",
    href: "/expertises/maintenance",
    icon: iconMaintenance,
    color: "var(--color-pole-maintenance)",
  },
};

export const POLE_LIST: Pole[] = POLE_IDS.map((id) => POLES[id]);
