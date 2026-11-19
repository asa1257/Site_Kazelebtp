import { z } from "zod";
import { devis } from "@/content/devis";
import { POLE_IDS } from "@/lib/poles";

/**
 * Schéma de validation du devis, PARTAGÉ entre le navigateur (retour immédiat à l'utilisateur)
 * et le serveur (seule validation qui fait foi : celle du navigateur peut être contournée).
 * Les valeurs autorisées sont lues dans content/devis.ts : une seule source de vérité.
 */

const msg = devis.errors;
const values = (options: readonly { value: string }[]) => options.map((o) => o.value) as [string, ...string[]];
const oneOf = (options: readonly { value: string }[]) => z.enum(values(options), { error: msg.required });
const someOf = (options: readonly { value: string }[]) =>
  z.array(z.enum(values(options))).min(1, { error: msg.chooseOne }).max(options.length);
const anyOf = (options: readonly { value: string }[]) => z.array(z.enum(values(options))).max(options.length).default([]);
const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

const p = devis.poles;

export const besoinSchema = z.object({
  poles: z.array(z.enum(POLE_IDS)).min(1, { error: msg.chooseOne }).max(POLE_IDS.length),
  profil: oneOf(devis.besoin.profil),
  nature: oneOf(devis.besoin.nature),
});

export const informatiqueSchema = z.object({
  domaines: someOf(p.informatique.domaines.options),
  utilisateurs: oneOf(p.informatique.utilisateurs.options),
  outils: anyOf(p.informatique.outils.options),
  situation: oneOf(p.informatique.situation.options),
  contraintes: optionalText(300),
});

export const constructionSchema = z.object({
  typeOuvrage: oneOf(p.construction.typeOuvrage.options),
  travaux: oneOf(p.construction.travaux.options),
  surface: optionalText(20).refine((v) => v === "" || /^\d{1,7}([.,]\d{1,2})?$/.test(v), { error: "Indiquez un nombre (ex. 450)." }),
  avancement: oneOf(p.construction.avancement.options),
  equipements: anyOf(p.construction.equipements.options),
});

export const hydrauliqueSchema = z.object({
  besoins: someOf(p.hydraulique.besoins.options),
  contexte: oneOf(p.hydraulique.contexte.options),
  probleme: oneOf(p.hydraulique.probleme.options),
  ampleur: optionalText(200),
  plans: oneOf(p.hydraulique.plans.options),
});

export const maintenanceSchema = z.object({
  domaines: someOf(p.maintenance.domaines.options),
  formule: oneOf(p.maintenance.formule.options),
  equipements: optionalText(300),
  nombre: optionalText(10).refine((v) => v === "" || /^\d{1,6}$/.test(v), { error: "Indiquez un nombre entier." }),
  criticite: oneOf(p.maintenance.criticite.options),
});

export const poleSchemas = {
  informatique: informatiqueSchema,
  construction: constructionSchema,
  hydraulique: hydrauliqueSchema,
  maintenance: maintenanceSchema,
} as const;

export const projetSchema = z.object({
  localisation: z.string().trim().min(2, { error: msg.required }).max(120),
  delai: oneOf(devis.projet.delai.options),
  budget: z.union([z.enum(values(devis.projet.budget.options)), z.literal("")]).optional().default(""),
  description: z
    .string()
    .trim()
    .min(20, { error: "Décrivez votre besoin en quelques phrases (20 caractères minimum)." })
    .max(3000, { error: "3 000 caractères maximum." }),
});

// Numéros ivoiriens à 10 chiffres (07…, 05…, 01…, 27…), avec ou sans +225 / 00225 ; numéros étrangers acceptés au format international.
const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s.\-()]/g, ""))
  .refine((v) => /^(\+225|00225)?\d{10}$/.test(v) || /^\+\d{8,15}$/.test(v), { error: "Numéro invalide (10 chiffres, ex. 07 08 09 10 11)." });

export const contactSchema = z.object({
  nom: z.string().trim().min(2, { error: msg.required }).max(100),
  entreprise: optionalText(120),
  fonction: optionalText(100),
  telephone: phone,
  whatsapp: z.boolean().default(false),
  email: z.email({ error: "Adresse e-mail invalide." }).max(160),
  preference: oneOf(devis.contact.preference.options),
  consentement: z.literal(true, { error: "Votre accord est nécessaire pour traiter la demande." }),
});

/** Demande complète : chaque pôle choisi doit avoir ses réponses, les autres sont ignorés. */
export const quoteSchema = z
  .object({
    besoin: besoinSchema,
    informatique: informatiqueSchema.optional(),
    construction: constructionSchema.optional(),
    hydraulique: hydrauliqueSchema.optional(),
    maintenance: maintenanceSchema.optional(),
    projet: projetSchema,
    contact: contactSchema,
  })
  .superRefine((data, ctx) => {
    for (const pole of data.besoin.poles) {
      if (!data[pole]) ctx.addIssue({ code: "custom", path: [pole], message: msg.required });
    }
    if (data.besoin.profil !== "particulier" && !data.contact.entreprise) {
      ctx.addIssue({ code: "custom", path: ["contact", "entreprise"], message: msg.required });
    }
  })
  .transform((data) => {
    // On ne garde que les pôles réellement choisis.
    const out = { ...data };
    for (const pole of POLE_IDS) if (!data.besoin.poles.includes(pole)) delete out[pole];
    return out;
  });

export type QuoteInput = z.input<typeof quoteSchema>;
export type Quote = z.output<typeof quoteSchema>;

/** Demande urgente : panne en cours ou activité à l'arrêt côté maintenance, ou incident informatique. */
export function isUrgent(q: Pick<QuoteInput, "maintenance" | "informatique">) {
  return (
    q.maintenance?.formule === "panne" || q.maintenance?.criticite === "arret" || q.informatique?.situation === "incident"
  );
}

/** Transforme les erreurs Zod en { "contact.email": "message" } pour l'affichage sous chaque champ. */
export function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
