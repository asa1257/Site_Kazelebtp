import type { PoleId } from "@/lib/poles";

/**
 * Contenu des 4 pages pôles (/expertises/[pole]). PREMIÈRE VERSION À RELIRE par les associés :
 * services, méthode et FAQ doivent refléter exactement ce que KAZELE fait et ne fait pas.
 * Règle d'or conservée : aucun chiffre, aucune certification, aucune référence client inventés.
 */

export type PoleContent = {
  metaTitle: string;
  metaDescription: string;
  hero: { title: string; text: string };
  services: { title: string; text: string; points: string[] }[];
  approach: { title: string; intro: string; steps: { title: string; text: string }[] };
  forWho: { title: string; items: string[] };
  faq: { q: string; a: string }[];
  cta: { title: string; text: string };
};

export const polesContent: Record<PoleId, PoleContent> = {
  informatique: {
    metaTitle: "Informatique : développement, reporting, automatisation et IA",
    metaDescription:
      "Solutions web et mobiles sur mesure, tableaux de bord augmentés par l'IA, automatisation des processus et intelligence artificielle appliquée, à Abidjan.",
    hero: {
      title: "Des outils numériques qui travaillent pour vous",
      text: "Nous développons des solutions sur mesure, automatisons vos tâches répétitives et transformons vos données en décisions. L'intelligence artificielle intervient là où elle apporte un gain réel, mesurable, pas pour l'effet de mode.",
    },
    services: [
      {
        title: "Développement de solutions",
        text: "Des applications pensées pour votre métier, pas l'inverse.",
        points: ["Applications web et mobiles", "Logiciels de gestion métier", "Portails clients et espaces partenaires", "Intégration avec vos outils existants (API)"],
      },
      {
        title: "Reporting et tableaux de bord",
        text: "Vos chiffres clés, à jour, au même endroit.",
        points: ["Tableaux de bord de pilotage", "Connexion à vos sources : Excel, logiciels, bases de données", "Indicateurs et alertes automatiques", "Analyses assistées par l'IA"],
      },
      {
        title: "Automatisation des processus",
        text: "Moins de saisie manuelle, moins d'erreurs, plus de temps utile.",
        points: ["Automatisation des tâches répétitives", "Circuits de validation et relances", "Génération automatique de documents et rapports", "Synchronisation entre applications"],
      },
      {
        title: "Intelligence artificielle appliquée",
        text: "Des usages concrets, adaptés à votre activité et à vos données.",
        points: ["Assistants et agents IA métier", "Extraction et classement de documents", "Analyse de données et prévisions", "Accompagnement et formation de vos équipes"],
      },
    ],
    approach: {
      title: "Notre façon de travailler",
      intro: "Un projet numérique réussi commence par la compréhension de votre quotidien, pas par la technologie.",
      steps: [
        { title: "Comprendre", text: "Nous observons vos processus actuels et identifions ce qui fait perdre du temps ou de l'argent." },
        { title: "Prototyper", text: "Une première version simple, testée rapidement avec vos utilisateurs." },
        { title: "Déployer", text: "Mise en service progressive, formation des équipes, documentation." },
        { title: "Faire évoluer", text: "Suivi, maintenance et améliorations à mesure que vos besoins changent." },
      ],
    },
    forWho: {
      title: "Pour qui ?",
      items: ["PME qui gèrent encore leur activité sur Excel ou papier", "Directions qui veulent piloter avec des chiffres fiables", "Entreprises du BTP et de l'industrie", "Institutions qui digitalisent leurs démarches"],
    },
    faq: [
      { q: "Faut-il déjà avoir des outils informatiques pour travailler avec vous ?", a: "Non. Nous partons de votre situation, même si tout se fait aujourd'hui sur papier ou sur Excel, et nous construisons par étapes." },
      { q: "L'intelligence artificielle est-elle adaptée à une petite structure ?", a: "Souvent, oui : automatiser le classement de documents ou la préparation de rapports fait gagner du temps quelle que soit la taille. Nous vous disons franchement quand l'IA n'est pas la bonne réponse." },
      { q: "Mes données restent-elles confidentielles ?", a: "Oui. Les accès sont limités aux personnes qui en ont besoin, et nous choisissons avec vous où et comment vos données sont hébergées." },
      { q: "Que se passe-t-il après la livraison ?", a: "Nous proposons un suivi : corrections, mises à jour et évolutions. Notre pôle Maintenance peut prendre le relais pour la maintenance informatique." },
    ],
    cta: { title: "Un processus à simplifier ?", text: "Décrivez-nous comment vous travaillez aujourd'hui : nous vous proposerons une première piste." },
  },

  construction: {
    metaTitle: "Construction : bâtiments, ingénierie BTP et construction durable",
    metaDescription:
      "Construction neuve, extension et rénovation, ingénierie et études BTP, bâtiments intelligents et construction durable, à Abidjan et en Côte d'Ivoire.",
    hero: {
      title: "Des bâtiments pensés pour demain",
      text: "Du gros œuvre aux bâtiments intelligents, nous construisons des ouvrages solides et durables. Parce que nos pôles travaillent ensemble dès l'étude, les réseaux d'eau, de données et les équipements techniques sont prévus dès les plans.",
    },
    services: [
      {
        title: "Construction et rénovation",
        text: "De la fondation à la livraison, avec un responsable unique.",
        points: ["Construction neuve", "Extension et surélévation", "Rénovation et réhabilitation", "Gros œuvre et second œuvre"],
      },
      {
        title: "Ingénierie et études BTP",
        text: "Des choix techniques solides avant le premier coup de pioche.",
        points: ["Études techniques et plans", "Estimation et chiffrage", "Planification des travaux", "Suivi et contrôle de chantier"],
      },
      {
        title: "Bâtiments intelligents",
        text: "Des ouvrages prêts à accueillir la technologie.",
        points: ["Câblage réseau prévu dès les plans", "Préparation à la GTB", "Contrôle d'accès", "Capteurs et équipements connectés"],
      },
      {
        title: "Construction durable",
        text: "Des bâtiments adaptés au climat et économes à l'usage.",
        points: ["Matériaux adaptés au climat local", "Ventilation et confort thermique", "Maîtrise de l'eau et de l'énergie", "Durabilité des ouvrages"],
      },
    ],
    approach: {
      title: "Un chantier maîtrisé, de l'étude à la réception",
      intro: "La qualité d'un ouvrage se joue avant, pendant et après le chantier.",
      steps: [
        { title: "Étude", text: "Visite du site, analyse de vos besoins, faisabilité technique et budgétaire." },
        { title: "Conception", text: "Plans validés avec nos pôles Hydraulique et Informatique pour éviter les reprises." },
        { title: "Exécution", text: "Un responsable de chantier, des points d'avancement réguliers, des contrôles à chaque étape." },
        { title: "Réception", text: "Réception documentée avec vous, puis maintenance proposée par notre pôle dédié." },
      ],
    },
    forWho: {
      title: "Pour qui ?",
      items: ["Particuliers qui construisent ou rénovent", "Entreprises : bureaux, commerces, entrepôts", "Promoteurs et investisseurs", "Institutions et collectivités"],
    },
    faq: [
      { q: "Intervenez-vous si j'ai déjà mes plans ?", a: "Oui. Nous pouvons partir de vos plans existants, les vérifier et les compléter si nécessaire, notamment pour les réseaux techniques." },
      { q: "Pouvez-vous gérer uniquement les études ?", a: "Oui, l'étude seule est possible. Elle vous permet de consulter ensuite en connaissance de cause." },
      { q: "Comment suivez-vous l'avancement du chantier ?", a: "Un responsable unique vous tient informé à chaque étape clé, avec des points réguliers sur le planning, les travaux réalisés et les éventuels ajustements." },
      { q: "Qu'est-ce qu'un bâtiment intelligent, concrètement ?", a: "Un bâtiment dont les équipements (éclairage, climatisation, accès, compteurs) peuvent être pilotés et surveillés de façon centralisée. Le plus économique est de le prévoir dès la construction." },
    ],
    cta: { title: "Un projet de construction ?", text: "Terrain, plans ou simple idée : décrivez-nous où vous en êtes." },
  },

  hydraulique: {
    metaTitle: "Hydraulique : réseaux d'eau, assainissement et gestion des fluides",
    metaDescription:
      "Adduction d'eau, assainissement, pompage et stockage, gestion intelligente des fluides : conception et réalisation d'infrastructures hydrauliques fiables.",
    hero: {
      title: "L'eau, maîtrisée de bout en bout",
      text: "Nous concevons et réalisons des réseaux d'eau et d'assainissement fiables, du branchement au traitement. Et parce qu'un réseau se pilote mieux quand on le mesure, nous pouvons l'équiper de compteurs et de capteurs connectés.",
    },
    services: [
      {
        title: "Adduction d'eau",
        text: "Une eau disponible, en quantité et en pression suffisantes.",
        points: ["Réseaux de distribution", "Branchements et raccordements", "Plomberie de bâtiment", "Renforcement de réseaux existants"],
      },
      {
        title: "Assainissement",
        text: "Des eaux usées et pluviales évacuées dans les règles.",
        points: ["Réseaux d'eaux usées", "Évacuation des eaux pluviales", "Dispositifs de traitement", "Curage et réhabilitation"],
      },
      {
        title: "Pompage et stockage",
        text: "Assurer l'alimentation, même quand le réseau public ne suffit pas.",
        points: ["Stations de pompage", "Réservoirs et châteaux d'eau", "Surpresseurs", "Dimensionnement des installations"],
      },
      {
        title: "Gestion intelligente des fluides",
        text: "Mesurer pour détecter les fuites et maîtriser les consommations.",
        points: ["Compteurs connectés", "Détection de fuites", "Suivi des consommations", "Alertes en cas d'anomalie"],
      },
    ],
    approach: {
      title: "Des réseaux pensés pour durer",
      intro: "Un réseau mal dimensionné coûte cher pendant des années. Nous prenons le temps de bien le concevoir.",
      steps: [
        { title: "Diagnostic", text: "Relevés sur site, analyse des besoins et des contraintes du terrain." },
        { title: "Dimensionnement", text: "Calcul des débits, des pressions et du tracé, coordonné avec le gros œuvre." },
        { title: "Réalisation", text: "Pose, raccordements et essais avant mise en service." },
        { title: "Suivi", text: "Mesure des consommations et maintenance préventive des installations." },
      ],
    },
    forWho: {
      title: "Pour qui ?",
      items: ["Particuliers et résidences", "Sites industriels et entrepôts", "Lotissements et promoteurs", "Collectivités et institutions"],
    },
    faq: [
      { q: "Pouvez-vous intervenir sur un réseau existant ?", a: "Oui : diagnostic, réparation de fuites, renforcement ou mise aux normes d'un réseau déjà en place." },
      { q: "Mon problème de débit peut-il être réglé sans tout refaire ?", a: "Souvent. Un diagnostic permet d'identifier la cause (fuite, diamètre insuffisant, pression) et de proposer la solution la plus économique." },
      { q: "À quoi servent les compteurs connectés ?", a: "À suivre vos consommations en temps réel et à être alerté rapidement en cas de fuite, avant qu'elle ne coûte cher." },
      { q: "Avez-vous besoin de plans pour établir un devis ?", a: "Des plans aident, mais ne sont pas indispensables : une visite sur site nous permet de faire les relevés nécessaires." },
    ],
    cta: { title: "Un besoin en eau ou en assainissement ?", text: "Décrivez-nous la situation : nous vous proposerons un diagnostic." },
  },

  maintenance: {
    metaTitle: "Maintenance : industrielle, informatique et GTB",
    metaDescription:
      "Maintenance industrielle, maintenance informatique préventive et curative, GTB : nous assurons la continuité de vos installations, avant et après la panne.",
    hero: {
      title: "Anticiper plutôt que réparer",
      text: "Une panne coûte toujours plus cher qu'un entretien. Nous assurons la continuité de vos installations industrielles, informatiques et techniques, avec des interventions planifiées et une réactivité en cas d'urgence.",
    },
    services: [
      {
        title: "Maintenance industrielle",
        text: "Des équipements qui tournent, une production qui ne s'arrête pas.",
        points: ["Maintenance préventive planifiée", "Dépannage et réparation", "Diagnostic des équipements", "Suivi de l'état du parc"],
      },
      {
        title: "Maintenance informatique",
        text: "Postes, serveurs et réseaux opérationnels au quotidien.",
        points: ["Maintenance préventive", "Dépannage curatif", "Mises à jour et sauvegardes", "Assistance aux utilisateurs"],
      },
      {
        title: "GTB",
        text: "La gestion technique du bâtiment : piloter tous les équipements depuis un seul poste.",
        points: ["Supervision des équipements", "Alertes et remontées de défauts", "Optimisation des consommations", "Maintenance des systèmes de GTB"],
      },
      {
        title: "Interventions d'urgence",
        text: "Quand l'activité est à l'arrêt, chaque heure compte.",
        points: ["Prise en charge prioritaire", "Diagnostic rapide", "Remise en service", "Rapport d'intervention"],
      },
    ],
    approach: {
      title: "Une maintenance organisée, pas subie",
      intro: "Nous construisons avec vous un plan adapté à vos équipements et à vos contraintes d'activité.",
      steps: [
        { title: "Inventaire", text: "Recensement de vos équipements et de leur état." },
        { title: "Plan de maintenance", text: "Fréquence des interventions définie selon la criticité de chaque équipement." },
        { title: "Interventions", text: "Visites planifiées et dépannages, chacun suivi d'un rapport." },
        { title: "Amélioration", text: "Analyse des pannes pour réduire leur fréquence dans le temps." },
      ],
    },
    forWho: {
      title: "Pour qui ?",
      items: ["Industriels et sites de production", "Entreprises et leurs parcs informatiques", "Gestionnaires d'immeubles", "Établissements recevant du public"],
    },
    faq: [
      { q: "Proposez-vous des contrats de maintenance ?", a: "Nous définissons avec vous une formule adaptée : interventions ponctuelles ou suivi préventif planifié. Contactez-nous pour en discuter." },
      { q: "Que faire en cas de panne urgente ?", a: "Appelez-nous directement. Vous pouvez aussi utiliser le formulaire de devis en indiquant « Panne en cours » : la demande est traitée en priorité." },
      { q: "Maintenez-vous des installations que vous n'avez pas réalisées ?", a: "Oui, après un diagnostic de l'existant pour connaître l'état des équipements." },
      { q: "Qu'est-ce que la GTB ?", a: "La gestion technique du bâtiment : un système qui centralise la surveillance et le pilotage des équipements (climatisation, éclairage, accès, compteurs) pour réagir plus vite et consommer moins." },
    ],
    cta: { title: "Des équipements à entretenir ?", text: "Parlez-nous de vos installations : nous vous proposerons une formule adaptée." },
  },
};

export const poleIndex = {
  metaTitle: "Nos expertises",
  metaDescription: "Informatique, Construction, Hydraulique, Maintenance : quatre expertises complémentaires sous une même direction de projet.",
  servicesTitle: "Nos services",
  forWhoTitle: "Pour qui ?",
  faqTitle: "Questions fréquentes",
  projectsTitle: "Réalisations liées",
  otherPolesTitle: "Quatre métiers, une seule équipe",
  otherPolesText: "Ce pôle travaille avec les trois autres dès l'étude de votre projet.",
  quoteCta: "Demander un devis",
  backHome: "Accueil",
};
