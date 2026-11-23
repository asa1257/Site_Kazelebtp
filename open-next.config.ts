import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Configuration OpenNext pour Cloudflare Workers.
 * Le site n'utilise aucune revalidation (pages générées au build) : le cache « static assets »
 * sert les pages pré-rendues directement depuis les fichiers statiques du Worker.
 * Pas besoin de R2 ni de KV, donc rien de plus à créer ni à payer.
 * Si un jour des pages doivent se mettre à jour sans redéploiement (CMS), passer au cache R2.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
