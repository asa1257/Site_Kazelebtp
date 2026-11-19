"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { devis } from "@/content/devis";
import { checkFiles } from "@/lib/devis/files";
import { sendQuoteEmail } from "@/lib/devis/email";
import { flattenErrors, isUrgent, quoteSchema } from "@/lib/devis/schema";
import { verifyTurnstile } from "@/lib/devis/turnstile";
import { rateLimit } from "@/lib/rate-limit";

export type QuoteState =
  | { status: "idle" }
  | { status: "success"; reference: string; urgent: boolean }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

/** Référence lisible et non devinable : KZ-AAAAMMJJ-XXXXXX (sans 0/O/1/I pour éviter les confusions au téléphone). */
function newReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `KZ-${d}-${code}`;
}

/**
 * Réception d'une demande de devis. Ordre des contrôles : du moins coûteux au plus coûteux,
 * pour qu'un robot soit arrêté avant toute lecture de fichier ou appel externe.
 */
export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";

  // 1. Limite de débit par IP
  if (!rateLimit(`devis:${ip}`)) return { status: "error", message: devis.errors.rateLimited };

  // 2. Champ piège : invisible pour un humain, rempli par les robots. On répond « succès » sans rien faire.
  if (formData.get("website")) return { status: "success", reference: newReference(), urgent: false };

  // 3. Anti-robot Cloudflare Turnstile
  const token = formData.get("cf-turnstile-response");
  if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip === "inconnue" ? null : ip))) {
    return { status: "error", message: devis.errors.captcha };
  }

  // 4. Validation stricte des données (même schéma que dans le navigateur)
  let raw: unknown;
  try {
    const payload = formData.get("payload");
    if (typeof payload !== "string" || payload.length > 50_000) throw new Error();
    raw = JSON.parse(payload);
  } catch {
    return { status: "error", message: devis.errors.invalid };
  }
  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: devis.errors.invalid, fieldErrors: flattenErrors(parsed.error) };
  }

  // 5. Pièces jointes : nombre, taille, type réel
  const files = formData.getAll("fichiers").filter((f): f is File => f instanceof File);
  const checked = await checkFiles(files);
  if (!checked.ok) return { status: "error", message: checked.message, fieldErrors: { "projet.fichiers": checked.message } };

  // 6. Envoi de la notification interne
  const reference = newReference();
  const urgent = isUrgent(parsed.data);
  const result = await sendQuoteEmail(parsed.data, reference, urgent, checked.files);
  if (result === "not-configured") return { status: "error", message: devis.errors.unavailable };
  if (result === "failed") return { status: "error", message: devis.errors.generic };

  return { status: "success", reference, urgent };
}
