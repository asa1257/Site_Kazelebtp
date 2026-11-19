import { Hero } from "@/components/home/Hero";
import { Expertises } from "@/components/home/Expertises";
import { Synergy } from "@/components/home/Synergy";
import { Projects } from "@/components/home/Projects";
import { Method } from "@/components/home/Method";
import { Commitments } from "@/components/home/Commitments";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Page d'accueil : les blocs 2 à 9 du wireframe, dans l'ordre du fil logique
 * qui nous sommes → ce que nous faisons → la preuve → la confiance → l'action.
 * (Blocs 0, 1, 10 et 11 sont dans le layout, partagés par toutes les pages.)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Expertises />
      <Synergy />
      <Projects />
      <Method />
      <Commitments />
      <Testimonials />
      <FinalCta />
    </>
  );
}
