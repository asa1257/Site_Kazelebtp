import type { NextConfig } from "next";

/**
 * En-têtes de sécurité HTTP (cahier de conception, section Sécurité).
 *
 * CHOIX IMPORTANT — CSP sans nonce :
 * une CSP à nonce oblige Next.js à rendre chaque page à la demande (rendu dynamique),
 * ce qui supprime le cache CDN et ralentit le chargement. Pour un site vitrine sans contenu
 * saisi par les visiteurs (hors formulaire de devis, validé côté serveur), on garde les pages
 * statiques et une CSP stricte sur tout le reste. Seuls les scripts inline générés par Next.js
 * sont autorisés ('unsafe-inline' pour script-src).
 * Si un jour le site héberge un espace client, passer à la CSP à nonce via src/proxy.ts.
 */
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // 2 ans + sous-domaines + preload : à activer seulement une fois TOUS les sous-domaines en HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** PREVIEW_EXPORT=1 : export HTML statique pour l'aperçu en ligne (sans serveur, donc sans en-têtes). */
const isPreviewExport = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  // Désactivés pour l'export statique d'aperçu (incompatibles avec output: "export").
  cacheComponents: !isPreviewExport,
  partialPrefetching: !isPreviewExport,
  poweredByHeader: false, // ne pas annoncer la techno du serveur
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isPreviewExport ? { unoptimized: true } : {}),
  },
  ...(isPreviewExport
    ? { output: "export" as const, trailingSlash: true }
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
