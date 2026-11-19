import "server-only";
import { devis } from "@/content/devis";
import { POLES, type PoleId } from "@/lib/poles";
import type { Quote } from "./schema";
import type { CheckedFile } from "./files";

/**
 * Notification interne d'une demande de devis, envoyée via l'API Resend.
 * Les données du client ne sont jamais insérées telles quelles dans le HTML : tout est échappé.
 *
 * Variables d'environnement (.env.local, jamais dans Git) :
 *   RESEND_API_KEY, DEVIS_FROM, DEVIS_TO_DEFAULT,
 *   DEVIS_TO_INFORMATIQUE / _CONSTRUCTION / _HYDRAULIQUE / _MAINTENANCE (facultatifs),
 *   DEVIS_TO_COORDINATION (projets multi-pôles, facultatif).
 */

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Opts = readonly { value: string; label: string }[];
const label = (options: Opts, v: string | undefined) => options.find((o) => o.value === v)?.label ?? v ?? "";
const labels = (options: Opts, vs: string[] | undefined) => (vs ?? []).map((v) => label(options, v)).join(", ");

function rows(entries: [string, string | undefined][]) {
  return entries
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
}

function section(title: string, body: string) {
  return `<h3 style="margin:20px 0 6px;font-size:15px;color:#012c60">${esc(title)}</h3><table style="border-collapse:collapse;font-size:14px">${body}</table>`;
}

export function recipientsFor(poles: PoleId[]): string[] {
  const env = process.env;
  const byPole: Record<PoleId, string | undefined> = {
    informatique: env.DEVIS_TO_INFORMATIQUE,
    construction: env.DEVIS_TO_CONSTRUCTION,
    hydraulique: env.DEVIS_TO_HYDRAULIQUE,
    maintenance: env.DEVIS_TO_MAINTENANCE,
  };
  const list =
    poles.length > 1
      ? [env.DEVIS_TO_COORDINATION, ...poles.map((p) => byPole[p])]
      : [byPole[poles[0]]];
  const out = [...new Set(list.filter(Boolean) as string[])];
  return out.length ? out : env.DEVIS_TO_DEFAULT ? [env.DEVIS_TO_DEFAULT] : [];
}

export function buildEmail(q: Quote, reference: string, urgent: boolean) {
  const b = devis.besoin;
  const pq = devis.poles;
  const poles = q.besoin.poles.map((p) => POLES[p].label).join(" + ");
  const tag = urgent ? "[URGENT] " : q.besoin.poles.length > 1 ? "[Projet intégré] " : "";
  const subject = `${tag}Devis ${reference} — ${poles} — ${q.contact.nom}`;

  let html = `<div style="font-family:Arial,sans-serif;color:#111;max-width:640px">`;
  if (urgent) html += `<p style="background:#fd7c00;color:#000;padding:10px 14px;border-radius:6px;font-weight:bold">Demande urgente : panne ou activité à l'arrêt. Rappeler en priorité.</p>`;
  html += `<h2 style="margin:0 0 4px">Demande de devis ${esc(reference)}</h2><p style="margin:0;color:#555">${esc(poles)}</p>`;

  html += section("Contact", rows([
    ["Nom", q.contact.nom],
    ["Entreprise", q.contact.entreprise],
    ["Fonction", q.contact.fonction],
    ["Téléphone", q.contact.telephone + (q.contact.whatsapp ? " (WhatsApp)" : "")],
    ["E-mail", q.contact.email],
    ["Préférence", label(devis.contact.preference.options, q.contact.preference)],
  ]));
  html += section("Besoin", rows([
    ["Profil", label(b.profil, q.besoin.profil)],
    ["Nature", label(b.nature, q.besoin.nature)],
  ]));
  if (q.informatique) {
    const i = q.informatique, o = pq.informatique;
    html += section("Informatique", rows([
      [o.domaines.label, labels(o.domaines.options, i.domaines)],
      [o.utilisateurs.label, label(o.utilisateurs.options, i.utilisateurs)],
      [o.outils.label, labels(o.outils.options, i.outils)],
      [o.situation.label, label(o.situation.options, i.situation)],
      ["Contraintes", i.contraintes],
    ]));
  }
  if (q.construction) {
    const c = q.construction, o = pq.construction;
    html += section("Construction", rows([
      [o.typeOuvrage.label, label(o.typeOuvrage.options, c.typeOuvrage)],
      [o.travaux.label, label(o.travaux.options, c.travaux)],
      ["Surface (m²)", c.surface],
      [o.avancement.label, label(o.avancement.options, c.avancement)],
      ["Équipements", labels(o.equipements.options, c.equipements)],
    ]));
  }
  if (q.hydraulique) {
    const h = q.hydraulique, o = pq.hydraulique;
    html += section("Hydraulique", rows([
      [o.besoins.label, labels(o.besoins.options, h.besoins)],
      [o.contexte.label, label(o.contexte.options, h.contexte)],
      [o.probleme.label, label(o.probleme.options, h.probleme)],
      ["Ampleur", h.ampleur],
      ["Plans existants", label(o.plans.options, h.plans)],
    ]));
  }
  if (q.maintenance) {
    const m = q.maintenance, o = pq.maintenance;
    html += section("Maintenance", rows([
      [o.domaines.label, labels(o.domaines.options, m.domaines)],
      [o.formule.label, label(o.formule.options, m.formule)],
      ["Équipements", m.equipements],
      ["Nombre", m.nombre],
      [o.criticite.label, label(o.criticite.options, m.criticite)],
    ]));
  }
  html += section("Projet", rows([
    ["Localisation", q.projet.localisation],
    ["Délai", label(devis.projet.delai.options, q.projet.delai)],
    ["Budget", label(devis.projet.budget.options, q.projet.budget)],
    ["Description", q.projet.description],
  ]));
  html += `<p style="margin-top:24px;font-size:12px;color:#777">Consentement au traitement des données donné le ${esc(new Date().toISOString())}.</p></div>`;
  return { subject, html };
}

export async function sendQuoteEmail(
  q: Quote,
  reference: string,
  urgent: boolean,
  files: CheckedFile[],
): Promise<"sent" | "dev-logged" | "not-configured" | "failed"> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.DEVIS_FROM;
  const to = recipientsFor(q.besoin.poles);
  const { subject, html } = buildEmail(q, reference, urgent);

  if (!key || !from || to.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[devis] ${subject}\n→ envoi simulé (configurer RESEND_API_KEY, DEVIS_FROM, DEVIS_TO_DEFAULT). ${files.length} pièce(s) jointe(s).`);
      return "dev-logged";
    }
    console.error("[devis] envoi impossible : variables d'environnement manquantes");
    return "not-configured";
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: q.contact.email,
        subject,
        html,
        attachments: files.map((f) => ({ filename: f.filename, content: f.content.toString("base64") })),
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.error(`[devis] Resend ${res.status}`); // pas de données client dans les journaux
      return "failed";
    }
    return "sent";
  } catch {
    console.error("[devis] Resend injoignable");
    return "failed";
  }
}
