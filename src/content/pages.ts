/**
 * Textes des pages Engagements et À propos.
 * Règle : uniquement des faits vrais aujourd'hui. Compléter (histoire, associés, zone d'intervention…)
 * seulement avec des informations fournies et validées par l'équipe.
 */

export const engagementsPage = {
  metaTitle: "Nos engagements",
  metaDescription:
    "Interlocuteur unique, devis détaillé, chantiers suivis et sécurisés, ouvrages durables, données protégées : les engagements de KAZELE INFO & BTP.",
  eyebrow: "Engagements",
  title: "Nos engagements, chantier après chantier",
  intro:
    "Une entreprise se juge sur ce qu'elle tient. Voici ce que nous nous engageons à faire sur chaque projet, et comment vous pouvez le vérifier.",
  verifyLabel: "Ce que vous pouvez vérifier",
  items: [
    {
      icon: "user",
      title: "Un seul interlocuteur",
      text: "Un responsable de projet vous suit de l'étude à la réception, quels que soient les pôles mobilisés. Vous n'avez pas à coordonner le maçon, le plombier et l'informaticien : c'est notre travail.",
      verify: "Son nom et son numéro figurent sur le devis.",
    },
    {
      icon: "file",
      title: "Un devis clair avant tout engagement",
      text: "Nous visitons le site avant de chiffrer. Le devis détaille les postes, les quantités et les délais prévus. Tout travail supplémentaire fait l'objet d'un avenant écrit, validé par vous avant exécution.",
      verify: "Aucune dépense hors devis sans votre signature.",
    },
    {
      icon: "camera",
      title: "Un chantier suivi et visible",
      text: "Des points d'avancement réguliers, des photos à chaque étape clé et un interlocuteur joignable pendant toute la durée des travaux.",
      verify: "Les comptes rendus et les photos que vous recevez.",
    },
    {
      icon: "hardhat",
      title: "La sécurité des équipes",
      text: "Port des équipements de protection (casque, gilet, chaussures), chantier balisé, tranchées signalées, consignes rappelées avant les travaux à risque.",
      verify: "Nos photos de chantier, et votre propre visite.",
    },
    {
      icon: "check",
      title: "La qualité d'exécution",
      text: "Des contrôles à chaque étape : implantation, ferraillage avant coulage, décoffrage, étanchéité des réseaux. La réception des travaux se fait avec vous, sur place.",
      verify: "Chaque étape contrôlée, avant de passer à la suivante.",
    },
    {
      icon: "leaf",
      title: "Des ouvrages faits pour durer",
      text: "Des matériaux adaptés au climat (chaleur, saison des pluies), l'économie d'eau et d'énergie prise en compte dès la conception, et une maintenance proposée pour ce que nous avons construit.",
    },
    {
      icon: "shield",
      title: "Vos données protégées",
      text: "Le site est entièrement chiffré (HTTPS), hébergé chez Cloudflare, prestataire certifié ISO 27001, et protégé contre les attaques par déni de service. Nous ne collectons que les informations utiles à votre demande.",
    },
  ],
  honesty: {
    title: "Ce que nous ne promettons pas",
    items: [
      "Le prix le plus bas : nous promettons un prix juste et détaillé.",
      "Des délais intenables pour gagner un marché : le délai annoncé est celui que nous pensons tenir.",
    ],
  },
  cta: { title: "Mettez-nous à l'épreuve sur votre projet.", label: "Demander un devis", href: "/devis" },
} as const;

export const aboutPage = {
  metaTitle: "À propos",
  metaDescription:
    "KAZELE INFO & BTP, entreprise basée à Abidjan, réunit informatique, construction, hydraulique et maintenance sous une même direction de projet.",
  eyebrow: "À propos",
  title: "Bâtir et connecter, depuis Abidjan",
  intro:
    "KAZELE INFO & BTP réunit sous une même direction quatre métiers qui travaillent d'habitude chacun de leur côté : l'informatique, la construction, l'hydraulique et la maintenance.",
  story: {
    title: "Notre conviction",
    paragraphs: [
      "KAZELE est née en 2026 à Abidjan.",
      "Un bâtiment, un réseau d'eau et un système informatique ne devraient pas être pensés séparément. Quand les métiers planifient ensemble dès l'étude, il y a moins de reprises, moins de retards et un seul responsable face au client.",
    ],
  },
  mission: {
    title: "Notre mission",
    text: "Offrir aux particuliers, aux entreprises et aux institutions de Côte d'Ivoire des ouvrages solides et des outils numériques utiles, réalisés par une seule équipe, du premier diagnostic à la maintenance.",
  },
  polesTitle: "Nos quatre pôles",
  values: {
    title: "Nos valeurs",
    items: [
      { title: "Rigueur", text: "On mesure avant de chiffrer, on contrôle avant de couler." },
      { title: "Transparence", text: "Un devis détaillé, des comptes rendus, pas de surprise." },
      { title: "Sécurité", text: "Personne ne prend de risque inutile sur nos chantiers." },
      { title: "Proximité", text: "Une équipe locale, joignable, qui connaît le terrain." },
    ],
  },
  team: {
    title: "L'équipe",
    text: "Une équipe dirigée par ZEBIE BI ZAN CHARLEME, gérant, entouré de techniciens et d'ouvriers qualifiés dans chaque pôle.",
  },
  factsTitle: "En bref",
  ctas: {
    primary: { label: "Voir nos réalisations", href: "/realisations" },
    secondary: { label: "Parler de votre projet", href: "/devis" },
  },
} as const;
