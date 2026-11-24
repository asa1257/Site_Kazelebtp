import type { PoleId } from "@/lib/poles";

/**
 * Tous les textes de la page d'accueil, repris du document « Textes page d'accueil ».
 * Les composants n'ont aucun texte en dur : ce fichier pourra être remplacé
 * par des données du CMS (Payload) sans toucher aux composants.
 *
 * Les valeurs entre crochets [ ... ] sont À COMPLÉTER avant la mise en ligne.
 */

export const company = {
  name: "KAZELE INFO & BTP",
  legalForm: "SARL",
  rccm: "CI-ABJ-03-2026-B12-05238", // Registre du commerce et du crédit mobilier
  ncc: "2605214E", // Numéro de compte contribuable (DGI)
  city: "Abidjan, Côte d'Ivoire",
  address: "Yopougon Maroc, non loin de l'école Rodin, Abidjan",
  manager: "ZEBIE BI ZAN CHARLEME", // gérant, directeur de la publication
  capital: "5 000 000 FCFA",
  host: { name: "Cloudflare, Inc. (service Cloudflare Workers)", address: "101 Townsend St, San Francisco, CA 94107, États-Unis" },
  // Numéro provisoire, à remplacer par la ligne de l'entreprise dès qu'elle existe.
  phoneDisplay: "+225 05 54 07 39 50",
  phoneHref: "tel:+2250554073950",
  emergencyPhoneHref: "tel:+2250554073950",
  email: "contact@kazele.ci",
  whatsappHref: "https://wa.me/2250554073950",
  social: {
    linkedin: "#", // [à compléter]
    facebook: "#", // [à compléter]
  },
};

export const nav = {
  items: [
    { label: "Accueil", href: "/" },
    { label: "Expertises", href: "/expertises", megaMenu: true },
    { label: "Réalisations", href: "/realisations" },
    { label: "Engagements", href: "/engagements" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Demander un devis sécurisé", shortLabel: "Devis sécurisé", href: "/devis" },
  ctaTooltip: "Vos informations sont chiffrées et traitées de façon confidentielle.",
  emergency: { label: "Urgence maintenance" },
  megaMenu: {
    informatique: "Des logiciels sur mesure, des données utiles, des tâches automatisées.",
    construction: "Des bâtiments solides, durables et pensés pour la technologie.",
    hydraulique: "Une eau maîtrisée, du réseau à l'assainissement.",
    maintenance: "Des installations qui durent et des pannes anticipées.",
    linkLabel: "Voir le pôle",
  } satisfies Record<PoleId, string> & { linkLabel: string },
};

export const hero = {
  eyebrow: ["Informatique", "Construction", "Hydraulique", "Maintenance"],
  titleStart: "L'ingénierie du futur : de la ",
  titleHighlight1: "construction",
  titleMiddle: " aux ",
  titleHighlight2: "infrastructures numériques",
  subtitle:
    "Bâtir, raccorder, digitaliser, entretenir : nous réunissons quatre expertises techniques sous une même direction de projet. Un seul interlocuteur, de la fondation au réseau.",
  primaryCta: { label: "Demander un devis sécurisé", href: "/devis" },
  secondaryCta: { label: "Découvrir nos expertises", href: "#expertises" },
  trust: [
    "4 expertises intégrées",
    "Un interlocuteur dédié par projet",
    "Étude, exécution et suivi",
    "Basés à Abidjan",
  ],
  visualAlt: "Bâtiment en construction relié à des flux de données et à un réseau hydraulique.",
};

export const expertises = {
  title: "Quatre expertises, une seule ingénierie",
  intro:
    "Chaque pôle est spécialisé. Ensemble, ils couvrent tout le cycle de vie de vos infrastructures, de la conception à la maintenance.",
  cards: [
    {
      pole: "informatique",
      title: "Des outils numériques qui travaillent pour vous",
      text: "Nous développons des solutions sur mesure, automatisons vos tâches répétitives et transformons vos données en décisions, avec l'intelligence artificielle là où elle apporte un vrai gain.",
      services: [
        "Développement de solutions web, mobiles et métier",
        "Reporting et tableaux de bord augmentés par l'IA",
        "Automatisation des processus",
        "Intelligence artificielle appliquée à votre activité",
      ],
      cta: "Découvrir l'Informatique",
    },
    {
      pole: "construction",
      title: "Des bâtiments pensés pour demain",
      text: "Du gros œuvre aux bâtiments intelligents, nous construisons des ouvrages solides, durables et prêts à accueillir la technologie.",
      services: ["Smart buildings", "Grands projets et ouvrages", "Ingénierie et études BTP", "Construction durable"],
      cta: "Découvrir la Construction",
    },
    {
      pole: "hydraulique",
      title: "L'eau, maîtrisée de bout en bout",
      text: "Nous concevons et réalisons des réseaux d'eau et d'assainissement fiables, et nous les rendons pilotables grâce aux capteurs connectés.",
      services: ["Réseaux d'adduction d'eau", "Assainissement et évacuation", "Gestion intelligente des fluides", "Infrastructures hydrauliques"],
      cta: "Découvrir l'Hydraulique",
    },
    {
      pole: "maintenance",
      title: "Anticiper plutôt que réparer",
      text: "Nous assurons la continuité de vos installations industrielles, informatiques et techniques, avant et après la panne.",
      services: [
        "Maintenance industrielle",
        "Maintenance IT préventive et curative",
        "GTB (pilotage centralisé des équipements du bâtiment)",
      ],
      cta: "Découvrir la Maintenance",
    },
  ] satisfies { pole: PoleId; title: string; text: string; services: string[]; cta: string }[],
};

export const synergy = {
  title: "Un projet. Quatre métiers. Une seule équipe.",
  text: "Sur un chantier classique, chaque corps de métier arrive avec son planning et ses contraintes. Chez KAZELE, nos pôles planifient ensemble dès l'étude : moins d'allers-retours, moins de reprises, et un seul responsable face à vous.",
  steps: [
    { pole: "construction", text: "On bâtit en prévoyant les gaines, les réseaux et les capteurs." },
    { pole: "hydraulique", text: "On raccorde l'eau et l'assainissement au bon moment du chantier." },
    { pole: "informatique", text: "On digitalise le suivi : tableaux de bord, alertes et tâches automatisées." },
    { pole: "maintenance", text: "On garde le tout en état de marche, dans la durée." },
  ] satisfies { pole: PoleId; text: string }[],
  // Remplacer par « Voir un projet intégré » quand une réalisation multi-pôles est documentée.
  cta: { label: "Parler de votre projet", href: "/devis" },
};

export type Project = {
  slug: string;
  title: string;
  city: string;
  year: string;
  poles: PoleId[];
  /** Indicateurs mesurés uniquement. */
  metrics: { label: string; value: string }[];
  /** true = contenu d'exemple à remplacer : affiché avec un badge visible. */
  placeholder?: boolean;
};

export const projects = {
  title: "Nos réalisations, sur le terrain",
  intro: "Chaque projet est documenté : le besoin de départ, la solution déployée et les résultats mesurés. Filtrez par expertise.",
  allLabel: "Tous",
  readMore: "Lire l'étude de cas",
  cta: { label: "Voir toutes les réalisations", href: "/realisations" },
  empty: {
    text: "Nos réalisations dans ce domaine sont en cours de publication. Parlons de votre besoin dès maintenant.",
    cta: { label: "Demander un devis", href: "/devis" },
  },
  placeholderLabel: "Exemple à remplacer",
  // EXEMPLES DE STRUCTURE — à remplacer par de vrais projets avant la mise en ligne.
  items: [
    {
      slug: "exemple-immeuble-bureaux",
      title: "[Immeuble de bureaux]",
      city: "[Ville]",
      year: "[Année]",
      poles: ["construction", "informatique", "maintenance"],
      metrics: [
        { label: "Délai", value: "[à mesurer]" },
        { label: "Surface", value: "[à mesurer]" },
      ],
      placeholder: true,
    },
    {
      slug: "exemple-reseau-eau",
      title: "[Réseau d'adduction d'eau]",
      city: "[Ville]",
      year: "[Année]",
      poles: ["hydraulique"],
      metrics: [{ label: "Linéaire", value: "[à mesurer]" }],
      placeholder: true,
    },
    {
      slug: "exemple-reporting-automatise",
      title: "[Tableau de bord de pilotage automatisé]",
      city: "[Ville]",
      year: "[Année]",
      poles: ["informatique"],
      metrics: [
        { label: "Temps gagné", value: "[à mesurer]" },
        { label: "Utilisateurs", value: "[à mesurer]" },
      ],
      placeholder: true,
    },
  ] satisfies Project[] as Project[],
};

export const method = {
  title: "Une méthode, quatre engagements",
  intro: "La qualité d'un ouvrage se joue avant, pendant et après le chantier. Voici comment nous travaillons, sur chaque projet.",
  steps: [
    { title: "Diagnostic sur site", text: "Nous visitons, mesurons et écoutons avant de chiffrer." },
    { title: "Conception coordonnée", text: "Nos 4 pôles valident ensemble les plans pour éviter les conflits sur le chantier." },
    { title: "Exécution suivie", text: "Un responsable unique, des points d'avancement réguliers, des contrôles à chaque étape." },
    { title: "Suivi après livraison", text: "Nous restons joignables et proposons la maintenance de ce que nous avons construit." },
  ],
  cta: { label: "Démarrer par un diagnostic", href: "/devis" },
};

export const commitments = {
  title: "La sécurité, sur le chantier comme dans vos données",
  intro: "Protéger les personnes, les ouvrages et les informations fait partie de notre métier. Nos engagements sont concrets et vérifiables.",
  business: [
    { title: "Sécurité des équipes", text: "Port des équipements de protection, chantiers balisés, consignes appliquées." },
    { title: "Qualité d'exécution", text: "Contrôles à chaque étape et réception documentée avec le client." },
    { title: "Durabilité", text: "Matériaux adaptés au climat, maîtrise de l'eau et de l'énergie." },
  ],
  // N'afficher un badge que lorsqu'il est vrai en production (voir cahier de conception).
  digitalBadges: [
    "Site 100 % HTTPS",
    "Formulaires chiffrés (TLS 1.3)",
    "Données hébergées chez un prestataire certifié ISO 27001",
    "Protection anti-DDoS et pare-feu applicatif",
    "Données traitées selon la loi ivoirienne n° 2013-450",
  ],
  cta: { label: "Nos engagements en détail", href: "/engagements" },
};

export type Testimonial = { quote: string; name: string; role: string; company: string };

export const testimonials = {
  title: "Ils nous ont confié leurs projets",
  intro: "Entreprises, institutions et particuliers : leur retour d'expérience est notre meilleure recommandation.",
  logosLabel: "Ils nous font confiance",
  // Vide = la section n'est pas affichée. N'ajouter que des témoignages réels, approuvés par écrit.
  items: [] as Testimonial[],
};

export const finalCta = {
  title: "Un projet ? Parlons-en.",
  text: "Décrivez votre besoin en quelques minutes. Un responsable de pôle vous recontacte avec une première analyse.",
  // Ajouter le délai de rappel (ex. « sous 48 h ouvrées ») uniquement s'il est tenu à chaque fois.
  primary: { label: "Demander un devis sécurisé", href: "/devis" },
  secondary: { label: "Écrire sur WhatsApp" },
  note: "Gratuit et sans engagement. Vos informations restent confidentielles.",
};

export const footer = {
  tagline: "Informatique, Construction, Hydraulique, Maintenance : l'ingénierie intégrée, depuis Abidjan.",
  // Fixe (page statique) : à mettre à jour chaque année, ou à lire depuis le CMS.
  copyrightYear: "2026",
  columns: {
    expertises: "Expertises",
    company: "Entreprise",
    contact: "Contact",
  },
  companyLinks: [
    { label: "À propos", href: "/a-propos" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Engagements", href: "/engagements" },
    { label: "Actualités", href: "/actualites" },
    { label: "Carrières", href: "/carrieres" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Demander un devis", href: "/devis" },
  legalLinks: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/confidentialite" },
    { label: "Cookies", href: "/cookies" },
  ],
  manageCookies: "Gérer mes cookies",
};

export const cookieBanner = {
  title: "Votre vie privée compte",
  text: "Nous utilisons des cookies indispensables au fonctionnement du site et, avec votre accord, des outils de mesure d'audience pour l'améliorer. Vous pouvez changer d'avis à tout moment.",
  acceptAll: "Tout accepter",
  rejectAll: "Tout refuser",
  customize: "Personnaliser",
  learnMore: { label: "En savoir plus", href: "/cookies" },
  categories: [
    { id: "necessary", label: "Indispensables", text: "Nécessaires à la sécurité du site et à l'envoi des formulaires.", locked: true },
    { id: "analytics", label: "Mesure d'audience", text: "Nous aident à comprendre quelles pages sont utiles, sans vous identifier.", locked: false },
  ],
  alwaysOn: "Toujours actifs",
  save: "Enregistrer mes choix",
};
