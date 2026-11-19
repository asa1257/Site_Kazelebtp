import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Concatène des classes conditionnelles et résout les conflits Tailwind :
 * cn("px-5", "px-2") → "px-2" (la dernière gagne), ce qui permet de surcharger un composant.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
