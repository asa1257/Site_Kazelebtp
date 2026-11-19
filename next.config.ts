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
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com", // widget anti-robot Turnstile
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

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false, // ne pas annoncer la techno du serveur
  experimental: {
    // Formulaire de devis : 10 Mo de pièces jointes + marge pour l'enveloppe multipart.
    serverActions: { bodySizeLimit: "11mb" },
  },
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
