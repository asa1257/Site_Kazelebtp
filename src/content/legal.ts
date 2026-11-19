import { company } from "./home";

/**
 * Pages légales. Référentiel : loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection
 * des données à caractère personnel (autorité de protection : ARTCI).
 * À FAIRE VALIDER PAR UN JURISTE avant la mise en ligne, et à mettre à jour à chaque nouveau traitement
 * (ex. ajout d'un outil de mesure d'audience).
 */

export type LegalBlock = { h: string; p?: string[]; list?: string[] };
export type LegalPage = { slug: string; title: string; description: string; updated: string; intro: string; blocks: LegalBlock[] };

const UPDATED = "19 novembre 2026";

export const mentionsLegales: LegalPage = {
  slug: "mentions-legales",
  title: "Mentions légales",
  description: "Informations légales sur l'éditeur et l'hébergeur du site KAZELE INFO & BTP.",
  updated: UPDATED,
  intro: "Le présent site est édité par KAZELE INFO & BTP. Son utilisation implique l'acceptation des informations ci-dessous.",
  blocks: [
    {
      h: "Éditeur du site",
      list: [
        `Raison sociale : ${company.name}`,
        `Forme juridique : société à responsabilité limitée (${company.legalForm}) de droit ivoirien, régie par l'Acte uniforme OHADA`,
        `Capital social : ${company.capital}`,
        `Siège social : ${company.address}, Côte d'Ivoire`,
        `RCCM : ${company.rccm}`,
        `Numéro de compte contribuable (NCC) : ${company.ncc}`,
        `Téléphone : ${company.phoneDisplay}`,
        `E-mail : ${company.email}`,
      ],
    },
    { h: "Directeur de la publication", p: [`${company.manager}, gérant.`] },
    {
      h: "Hébergement",
      p: [`Le site est hébergé par ${company.host.name}, ${company.host.address}.`, "Les contenus sont diffusés via le réseau de Cloudflare, Inc., qui assure également la protection du site contre les attaques."],
    },
    {
      h: "Propriété intellectuelle",
      p: [
        "L'ensemble des éléments du site (textes, logo, pictogrammes, visuels, structure) est la propriété de KAZELE INFO & BTP, sauf mention contraire. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.",
      ],
    },
    {
      h: "Responsabilité",
      p: [
        "KAZELE INFO & BTP s'efforce de fournir des informations exactes et à jour, sans pouvoir garantir l'absence d'erreur. Les informations du site ont une valeur indicative : seul un devis signé engage la société.",
        "Les liens vers des sites tiers sont fournis pour information ; KAZELE INFO & BTP n'est pas responsable de leur contenu.",
      ],
    },
    { h: "Données personnelles et cookies", p: ["Le traitement de vos données est décrit dans la politique de confidentialité, et l'usage des cookies dans la politique cookies."] },
    { h: "Droit applicable", p: ["Le présent site et ses mentions légales sont soumis au droit ivoirien. Tout litige relève des juridictions compétentes d'Abidjan."] },
  ],
};

export const confidentialite: LegalPage = {
  slug: "confidentialite",
  title: "Politique de confidentialité",
  description: "Comment KAZELE INFO & BTP collecte, utilise et protège vos données personnelles, et comment exercer vos droits.",
  updated: UPDATED,
  intro:
    "KAZELE INFO & BTP attache une grande importance à la protection de vos données personnelles. Cette politique explique quelles données nous collectons, pourquoi, combien de temps nous les conservons et comment exercer vos droits, conformément à la loi n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel.",
  blocks: [
    {
      h: "Responsable du traitement",
      p: [`${company.name}, ${company.legalForm}, ${company.address}, Côte d'Ivoire. RCCM ${company.rccm}. Contact : ${company.email}.`],
    },
    {
      h: "Données collectées",
      p: ["Nous ne collectons que les données que vous nous transmettez volontairement via le formulaire de demande de devis :"],
      list: [
        "Identité et coordonnées : nom, prénom, entreprise ou organisme, fonction, téléphone, e-mail, moyen de contact préféré",
        "Informations sur votre projet : pôles concernés, réponses aux questions techniques, localisation, délai, budget indicatif, description",
        "Pièces jointes que vous choisissez d'envoyer (plans, photos, cahier des charges)",
        "Données techniques nécessaires à la sécurité : adresse IP, utilisée uniquement pour limiter les envois abusifs et vérifier que vous n'êtes pas un robot",
      ],
    },
    {
      h: "Finalités et base légale",
      list: [
        "Répondre à votre demande de devis et vous recontacter : sur la base de votre consentement, donné lors de l'envoi du formulaire",
        "Assurer la sécurité du site et prévenir les abus : sur la base de notre intérêt légitime à protéger nos services",
      ],
      p: ["Vos données ne sont jamais vendues ni utilisées à des fins publicitaires."],
    },
    {
      h: "Destinataires",
      p: [
        "Vos données sont destinées aux seules personnes de KAZELE INFO & BTP chargées de traiter votre demande (responsables des pôles concernés).",
        "Elles peuvent être traitées par nos prestataires techniques, dans la limite de leur mission : hébergement du site, envoi des e-mails de notification (Resend) et protection contre les robots et les attaques (Cloudflare).",
      ],
    },
    {
      h: "Transferts hors de Côte d'Ivoire",
      p: [
        "Certains de nos prestataires techniques peuvent traiter des données sur des serveurs situés hors de la CEDEAO. Ces transferts sont encadrés conformément à la loi n° 2013-450 et aux formalités applicables auprès de l'ARTCI.",
      ],
    },
    {
      h: "Durée de conservation",
      list: [
        "Demande de devis sans suite : 3 ans à compter du dernier contact",
        "Demande suivie d'un contrat : pendant la durée de la relation commerciale, puis selon les durées légales de conservation des documents comptables",
        "Données techniques de sécurité : quelques heures à quelques jours au maximum",
      ],
    },
    {
      h: "Sécurité",
      p: [
        "Vos données sont chiffrées pendant leur transmission (HTTPS). L'accès est réservé aux personnes habilitées. Les pièces jointes sont contrôlées avant d'être acceptées. Notre site applique des en-têtes de sécurité et est protégé contre les attaques courantes.",
      ],
    },
    {
      h: "Vos droits",
      p: ["Conformément à la loi n° 2013-450, vous disposez des droits suivants sur vos données :"],
      list: ["Droit d'accès : savoir quelles données nous détenons sur vous", "Droit de rectification : corriger des données inexactes", "Droit d'opposition : vous opposer à leur traitement", "Droit de suppression : demander leur effacement"],
    },
    {
      h: "Exercer vos droits",
      p: [
        `Écrivez-nous à ${company.email} en précisant votre demande ; nous pourrons vous demander un justificatif d'identité. Nous vous répondons dans les meilleurs délais.`,
        "Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l'Autorité de protection des données à caractère personnel : l'ARTCI (Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire).",
      ],
    },
    { h: "Modifications", p: ["Cette politique peut évoluer, notamment en cas de nouveau service. La date de mise à jour figure en haut de la page."] },
  ],
};

export const cookies: LegalPage = {
  slug: "cookies",
  title: "Politique cookies",
  description: "Les cookies et traceurs utilisés sur le site KAZELE INFO & BTP et comment gérer vos choix.",
  updated: UPDATED,
  intro:
    "Un cookie est un petit fichier déposé sur votre appareil lors de la visite d'un site. Nous limitons au strict nécessaire ce qui est déposé sur votre appareil, et rien de non indispensable n'est activé sans votre accord.",
  blocks: [
    {
      h: "Traceurs indispensables (toujours actifs)",
      p: ["Ils sont nécessaires au fonctionnement et à la sécurité du site, et ne nécessitent pas votre consentement :"],
      list: [
        "Mémorisation de vos choix de cookies, enregistrée dans votre navigateur (stockage local), pour ne pas vous redemander à chaque visite",
        "Protection anti-robot Cloudflare Turnstile, chargée uniquement sur le formulaire de devis pour vérifier qu'une demande est envoyée par une personne",
      ],
    },
    {
      h: "Mesure d'audience (soumise à votre accord)",
      p: [
        "Aucun outil de mesure d'audience n'est actif à ce jour. Si nous en ajoutons un pour comprendre quelles pages sont utiles, il ne sera activé qu'avec votre accord, et cette politique sera mise à jour.",
      ],
    },
    { h: "Publicité", p: ["Le site n'utilise aucun cookie publicitaire et ne partage aucune donnée à des fins publicitaires."] },
    {
      h: "Gérer vos choix",
      p: [
        "Vous pouvez modifier vos choix à tout moment avec le lien « Gérer mes cookies » en bas de chaque page. Vous pouvez aussi supprimer les cookies et données de site depuis les réglages de votre navigateur.",
      ],
    },
    { h: "Contact", p: [`Pour toute question : ${company.email}.`] },
  ],
};
