import Image from "next/image";
import Link from "next/link";
import logoHorizontal from "@/assets/brand/logo-horizontal-dark.png";
import logoFull from "@/assets/brand/logo-full-dark.png";
import { cn } from "@/lib/cn";

/**
 * Logo officiel KAZELE INFO & BTP, version pour fond sombre
 * (le bleu marine du fichier d'origine est passé en clair, l'orange est conservé).
 * - variant "horizontal" : header (K + KAZELE + INFO & BTP)
 * - variant "full"       : footer, avec la signature « Des solutions durables pour un meilleur demain »
 * Le fichier d'origine est conservé dans brand-source/.
 */
export function Logo({
  variant = "horizontal",
  priority = false,
  className,
}: {
  variant?: "horizontal" | "full";
  /** true dans le header : l'image est au-dessus de la ligne de flottaison. */
  priority?: boolean;
  className?: string;
}) {
  const src = variant === "full" ? logoFull : logoHorizontal;
  return (
    <Link href="/" className={cn("inline-block shrink-0", className)}>
      <Image
        src={src}
        alt="KAZELE INFO & BTP — accueil"
        priority={priority}
        sizes={variant === "full" ? "240px" : "160px"}
        className={cn("h-auto", variant === "full" ? "w-[220px]" : "w-[132px] sm:w-[150px]")}
      />
    </Link>
  );
}
