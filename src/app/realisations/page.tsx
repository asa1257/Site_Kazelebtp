import type { Metadata } from "next";
import { Projects } from "@/components/home/Projects";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Chantiers réalisés par l'équipe KAZELE INFO & BTP en Côte d'Ivoire : construction, hydraulique, clôtures et forages, en photos.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return <Projects variant="page" />;
}
