import { QUOTE_FORM_OPEN } from "@/config/site";

/**
 * Interrupteur du formulaire de devis : ouvert si QUOTE_FORM_OPEN vaut true dans src/config/site.ts
 * (production), ou si QUOTE_FORM_ENABLED=true (tests en local).
 * Tant qu'il est fermé, la page propose téléphone / WhatsApp / e-mail et le serveur refuse tout envoi.
 */
export const isQuoteFormEnabled = () => QUOTE_FORM_OPEN || process.env.QUOTE_FORM_ENABLED === "true";
