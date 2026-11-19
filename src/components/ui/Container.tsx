import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Largeur maximale + marges latérales, identiques sur toutes les sections. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}
