import type { Metadata } from "next";
import { poleIndex } from "@/content/poles";
import { Expertises } from "@/components/home/Expertises";
import { Synergy } from "@/components/home/Synergy";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: poleIndex.metaTitle,
  description: poleIndex.metaDescription,
  alternates: { canonical: "/expertises" },
};

/** Page « Expertises » : les 4 cartes + la synergie, réutilisées depuis l'accueil. */
export default function ExpertisesPage() {
  return (
    <>
      <h1 className="sr-only">{poleIndex.metaTitle}</h1>
      <Expertises />
      <Synergy />
      <FinalCta />
    </>
  );
}
