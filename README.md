# KAZELE INFO & BTP — site web

Squelette du site : design system + page d'accueil (blocs 0 à 11 du wireframe).
Stack : **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · lucide-react**.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de production (pages statiques)
npm start            # sert le build
npm run lint && npm run typecheck
npm run build:preview  # export HTML statique dans out/ (aperçu sans serveur)
```

## Organisation

```
src/
├── app/
│   ├── globals.css      ← DESIGN SYSTEM : jetons couleurs, typo, ombres, animations (@theme)
│   ├── layout.tsx       ← blocs 0, 1, 10, 11 (communs à toutes les pages) + lien d'évitement
│   └── page.tsx         ← assemble les blocs 2 à 9 de l'accueil
├── content/home.ts      ← TOUS les textes (aucun texte en dur dans les composants)
├── lib/
│   ├── poles.ts         ← les 4 pôles : id, libellé, icône, couleur, URL (source unique)
│   └── cn.ts            ← fusion de classes Tailwind (clsx + tailwind-merge)
├── fonts/               ← Inter + Space Grotesk auto-hébergées (sous-ensemble latin)
├── assets/brand/        ← logo et pictogrammes des pôles, versions pour fond sombre
└── components/
    ├── ui/              ← briques réutilisables du design system
    │   ├── Button       primary (orange) · secondary (contour bleu) · ghost
    │   ├── Container    largeur max + marges
    │   ├── Section      espacement vertical + SectionHeading (sur-titre, H2, intro)
    │   ├── GlassCard    verre flouté qui s'illumine au survol ET au focus clavier
    │   ├── PoleIcon     pictogramme officiel d'un pôle (extrait du logo)
    │   ├── Logo         logo officiel : variante "horizontal" (header) ou "full" (footer, avec signature)
    │   ├── Badge        étiquettes
    │   └── Reveal       apparition au défilement, sans bibliothèque
    ├── layout/          ← UtilityBar, Header (méga-menu + menu mobile), Footer, CookieBanner
    └── home/            ← Hero, Expertises, Synergy, Projects, Method, Commitments, Testimonials, FinalCta
```

## Choix techniques (et pourquoi)

- **Pages statiques.** L'accueil est pré-généré au build : servi tel quel par le CDN, rapide, et rien à exécuter côté serveur.
- **CSP sans nonce.** Une CSP à nonce force le rendu dynamique de chaque page (plus de cache CDN). Pour un site vitrine, on garde les pages statiques et une CSP stricte sur tout le reste, en autorisant uniquement les scripts inline de Next.js. Les en-têtes sont dans `next.config.ts`. À revoir si un espace client est ajouté.
- **Pas de bibliothèque d'animation.** Les effets passent par CSS + IntersectionObserver (`Reveal`). Moins de JavaScript, donc un meilleur INP sur mobile. Tout est coupé avec `prefers-reduced-motion`.
- **Polices locales.** Aucune requête vers Google : plus rapide, et aucune IP de visiteur envoyée à un tiers.
- **Contenu séparé des composants.** `content/home.ts` pourra être remplacé par le CMS (Payload) sans toucher au design.
- **Accessibilité.** Lien d'évitement, focus visible, cibles ≥ 44 px, `aria-expanded` / `aria-pressed`, Échap ferme les menus, contrastes vérifiés (audit axe-core WCAG 2.2 AA : 0 violation).

## À compléter avant la mise en ligne

Recherchez `[à compléter]` et les crochets `[ ... ]` dans `src/content/home.ts` :
téléphone, e-mail, WhatsApp, adresse, domaine (`metadataBase` dans `layout.tsx`),
vrais projets (les 3 actuels sont des **exemples** affichés avec un badge),
témoignages (section masquée tant que la liste est vide).

## Logo

- Fichier d'origine conservé dans `brand-source/logo-kazele-original.png`.
- Les versions du site sont dérivées de ce fichier : le bleu marine (#012c60) passe en clair (#f1f5fb)
  pour rester lisible sur fond noir, l'orange (#fd7c00) est conservé. Ces deux couleurs sont aussi
  les jetons `navy` et `orange` du design system.
- Favicon et icône d'écran d'accueil (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`) : le « K » seul.
- Idéalement, demander au graphiste une version vectorielle (SVG) du logo : plus nette à toutes les tailles et plus légère.

## Prochaines étapes

1. Pages pôles (`/expertises/[pole]`) sur un gabarit commun.
2. Formulaire de devis intelligent (`/devis`) : Server Action + Zod + Turnstile.
3. Pages légales, sitemap et robots.
4. Branchement du CMS Payload.
