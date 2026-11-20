/**
 * Interrupteur du formulaire de devis. Désactivé par défaut : il ne s'active qu'avec
 * QUOTE_FORM_ENABLED=true, une fois l'autorisation de l'ARTCI obtenue (loi n° 2013-450 :
 * formalité préalable à toute collecte de données personnelles, et autorisation de transfert hors CEDEAO).
 * Lu au moment du build pour la page, et à chaque envoi côté serveur.
 */
export const isQuoteFormEnabled = () => process.env.QUOTE_FORM_ENABLED === "true";
