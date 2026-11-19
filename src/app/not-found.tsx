import { ArrowLeft, LockKeyhole } from "lucide-react";
import { POLE_LIST } from "@/lib/poles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PoleIcon } from "@/components/ui/PoleIcon";
import Link from "next/link";

/** Page 404 aux couleurs du site : on propose des chemins utiles plutôt qu'une impasse. */
export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="bg-blueprint py-20 sm:py-28">
      <Container className="max-w-3xl text-center">
        <p className="font-display text-7xl font-bold text-orange sm:text-8xl">404</p>
        <h1 id="nf-title" className="mt-4 text-3xl font-bold sm:text-4xl">Cette page n&apos;existe pas (encore)</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-muted">
          Le lien est peut-être erroné, ou la page est en cours de construction. Voici où vous pouvez aller :
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {POLE_LIST.map((p) => (
            <li key={p.id}>
              <Link href={p.href} className="glass group flex flex-col items-center gap-3 rounded-2xl p-5 hover:border-electric/60">
                <PoleIcon pole={p.id} className="self-center" />
                <span className="font-display font-semibold">{p.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="secondary" icon={<ArrowLeft size={18} />}>Retour à l&apos;accueil</Button>
          <Button href="/devis" icon={<LockKeyhole size={18} />}>Demander un devis</Button>
        </div>
      </Container>
    </section>
  );
}
