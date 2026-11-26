import type { MetadataRoute } from "next";

/** Autorise l'exploration de tout le site et indique le plan du site. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kazele.ci/sitemap.xml",
    host: "https://kazele.ci",
  };
}
