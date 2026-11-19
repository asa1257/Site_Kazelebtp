"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Apparition au défilement, sans bibliothèque.
 * Le HTML rendu côté serveur est visible par défaut : si le JavaScript échoue, rien n'est caché.
 * Seuls les éléments situés sous la ligne de flottaison sont masqués au chargement, puis révélés.
 * L'effet est neutralisé en CSS si l'utilisateur préfère moins d'animations.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** "li" quand l'élément est enfant direct d'une liste (HTML valide). */
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // déjà visible : on ne touche à rien

    // Masquage puis observation, différés hors du rendu pour éviter un double rendu synchrone.
    const frame = requestAnimationFrame(() => setState("hidden"));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={state === "idle" ? undefined : state}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
