import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter, spaceGrotesk } from "@/fonts";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";

export const metadata: Metadata = {
  // [à remplacer par le domaine définitif]
  metadataBase: new URL("https://www.kazele.ci"),
  title: {
    default: "KAZELE INFO & BTP — Informatique, Construction, Hydraulique, Maintenance",
    template: "%s | KAZELE INFO & BTP",
  },
  description:
    "Bâtir, raccorder, connecter, entretenir : quatre expertises techniques sous une même direction de projet, à Abidjan. Un seul interlocuteur, de la fondation au réseau.",
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "KAZELE INFO & BTP",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {/* Lien d'évitement : premier élément atteint au clavier (WCAG 2.4.1) */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-orange focus:px-5 focus:py-3 focus:font-semibold focus:text-ink-on-orange"
        >
          Aller au contenu
        </a>
        <UtilityBar />
        <Header />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
