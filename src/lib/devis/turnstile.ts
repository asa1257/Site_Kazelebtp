import "server-only";

/**
 * Vérification Cloudflare Turnstile côté serveur (le jeton du navigateur seul ne prouve rien).
 * Sans TURNSTILE_SECRET_KEY : vérification ignorée en développement, refusée en production.
 */
export async function verifyTurnstile(token: string | null, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV !== "production") return true;
    console.error("[devis] TURNSTILE_SECRET_KEY manquante");
    return false;
  }
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
