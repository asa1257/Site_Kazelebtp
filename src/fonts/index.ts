import localFont from "next/font/local";

/**
 * Polices auto-hébergées (aucune requête vers Google Fonts) :
 * plus rapide, et aucune adresse IP de visiteur transmise à un tiers.
 * Sous-ensemble « latin » : couvre tous les caractères du français (é, à, ç, œ…).
 */
export const inter = localFont({
  src: "./inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const spaceGrotesk = localFont({
  src: "./space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-space-grotesk",
});
