/**
 * Réglages publics du site, versionnés dans Git.
 * (Rien de secret ici : les clés privées vont dans Cloudflare → Variables et secrets.)
 */

/**
 * Ouverture du formulaire de devis. À passer à `true` une fois l'autorisation de l'ARTCI obtenue
 * (loi n° 2013-450). Valeur versionnée pour que la page (générée au build) et le serveur
 * soient toujours d'accord. En local, QUOTE_FORM_ENABLED=true dans .env.local permet de tester.
 */
export const QUOTE_FORM_OPEN = false;

/**
 * Clé de site Cloudflare Turnstile. Elle est PUBLIQUE par nature (elle s'affiche dans le navigateur).
 * La clé secrète correspondante, elle, est dans Cloudflare (TURNSTILE_SECRET_KEY).
 */
export const TURNSTILE_SITE_KEY = "";
