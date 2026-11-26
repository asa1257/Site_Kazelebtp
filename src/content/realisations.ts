import type { StaticImageData } from "next/image";
import type { PoleId } from "@/lib/poles";

import forage1 from "@/assets/realisations/cloture-forage/01.jpg";
import forage2 from "@/assets/realisations/cloture-forage/02.jpg";
import canal1 from "@/assets/realisations/canalisation-eau/01.jpg";
import canal2 from "@/assets/realisations/canalisation-eau/02.jpg";
import canal3 from "@/assets/realisations/canalisation-eau/03.jpg";
import maison1 from "@/assets/realisations/maison-elevation/01.jpg";
import maison2 from "@/assets/realisations/maison-elevation/02.jpg";
import maison3 from "@/assets/realisations/maison-elevation/03.jpg";
import maison4 from "@/assets/realisations/maison-elevation/04.jpg";
import mur1 from "@/assets/realisations/mur-cloture/01.jpg";
import mur2 from "@/assets/realisations/mur-cloture/02.jpg";
import mur3 from "@/assets/realisations/mur-cloture/03.jpg";
import imm1 from "@/assets/realisations/immeuble-ossature/01.jpg";
import imm2 from "@/assets/realisations/immeuble-ossature/02.jpg";
import imm3 from "@/assets/realisations/immeuble-ossature/03.jpg";

/**
 * Chantiers réalisés par l'équipe KAZELE. Photos publiées avec l'accord des personnes visibles.
 * Règle d'or : on décrit ce que montrent les photos, sans chiffre ni résultat inventé.
 * Pour ajouter un chantier : déposer les photos dans src/assets/realisations/<slug>/, puis ajouter une entrée ici.
 * Champs facultatifs (lieu, année, indicateurs) : à renseigner seulement s'ils sont connus.
 */
export type Photo = { src: StaticImageData; alt: string };
export type Project = {
  slug: string;
  title: string;
  poles: PoleId[];
  summary: string;
  photos: Photo[];
  city?: string;
  year?: string;
  metrics?: { label: string; value: string }[];
};

export const realisations: Project[] = [
  {
    slug: "cloture-amenagement-forage",
    title: "Clôture et aménagement d'un forage",
    poles: ["hydraulique", "construction"],
    summary: "Construction d'un enclos maçonné autour d'un forage, avec poteaux et finitions peintes, pour protéger l'ouvrage et son point d'eau.",
    photos: [
      { src: forage1, alt: "Enclos du forage terminé, vu de l'extérieur : murs peints en bleu clair et poteaux bleu foncé" },
      { src: forage2, alt: "Vue de face de l'enclos du forage, entrée ouverte et tête de forage visible derrière le mur" },
    ],
  },
  {
    slug: "pose-canalisation-eau",
    title: "Pose de canalisation d'eau",
    poles: ["hydraulique"],
    summary: "Ouverture de tranchées et pose d'une conduite d'adduction d'eau en polyéthylène, le long d'une voie.",
    photos: [
      { src: canal1, alt: "Longue tranchée ouverte le long d'une voie" },
      { src: canal2, alt: "Conduite noire posée au fond de la tranchée" },
      { src: canal3, alt: "Tranchée de canalisation vue dans l'axe, terre déblayée sur les côtés" },
    ],
  },
  {
    slug: "construction-maison",
    title: "Construction d'une maison (élévation des murs)",
    poles: ["construction"],
    summary: "Élévation des murs en parpaings, coffrage et coulage des poteaux et chaînages, jusqu'au gros œuvre de la maison.",
    photos: [
      { src: maison1, alt: "Maison en parpaings au stade du gros œuvre, vue de face avec ouvertures et chaînages" },
      { src: maison2, alt: "Gros œuvre de la maison vu de côté, cloisons intérieures en place" },
      { src: maison3, alt: "Maçons équipés de casques et gilets de sécurité montant les murs en parpaings" },
      { src: maison4, alt: "Murs en cours d'élévation avec coffrages en bois des poteaux" },
    ],
  },
  {
    slug: "mur-de-cloture",
    title: "Mur de clôture",
    poles: ["construction"],
    summary: "Construction de murs de clôture en parpaings, renforcés par des poteaux et un chaînage en béton armé.",
    photos: [
      { src: mur1, alt: "Mur de clôture achevé, avec poteaux et chaînage haut en béton" },
      { src: mur2, alt: "Angle intérieur d'une parcelle clôturée, mur avec chaînage" },
      { src: mur3, alt: "Parcelle entièrement clôturée vue de l'intérieur, échelle de chantier contre le mur" },
    ],
  },
  {
    slug: "immeuble-ossature-beton",
    title: "Immeuble en construction (poteaux et ferraillage)",
    poles: ["construction"],
    summary: "Réalisation de l'ossature en béton armé d'un immeuble : poteaux coulés, attentes de ferraillage pour l'étage et murs en parpaings.",
    photos: [
      { src: imm1, alt: "Murs en parpaings et poteaux avec attentes de ferraillage pour l'étage supérieur" },
      { src: imm2, alt: "Poteaux en béton armé décoffrés, fers en attente" },
      { src: imm3, alt: "Vue d'ensemble du niveau en cours, poteaux et cloisons en parpaings" },
    ],
  },
];

export const getRealisation = (slug: string) => realisations.find((r) => r.slug === slug);
