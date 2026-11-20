import type { PoleId } from "@/lib/poles";

/**
 * Textes et options du formulaire de devis (document « Textes page d'accueil », section Formulaire).
 * Les identifiants (value) sont ceux enregistrés et validés côté serveur : ne pas les traduire.
 */

export type Option = { value: string; label: string };
const opts = <const T extends readonly (readonly [string, string])[]>(pairs: T) =>
  pairs.map(([value, label]) => ({ value, label })) as { value: T[number][0]; label: string }[];

export const devis = {
  meta: {
    title: "Demander un devis sécurisé",
    description: "Décrivez votre besoin en quelques minutes : un responsable de pôle vous recontacte avec une première analyse.",
  },
  intro: {
    eyebrow: "Devis gratuit et sans engagement",
    title: "Demander un devis sécurisé",
    text: "Quatre étapes courtes. Vous ne répondez qu'aux questions qui concernent votre projet.",
    security: "Vos informations sont chiffrées pendant l'envoi et ne servent qu'à répondre à votre demande.",
  },
  steps: ["Votre besoin", "Questions métier", "Votre projet", "Vos coordonnées"],
  progress: (current: number, total: number) => `Étape ${current} sur ${total}`,
  nav: { next: "Continuer", back: "Retour", submit: "Envoyer ma demande sécurisée", sending: "Envoi en cours…" },

  besoin: {
    title: "De quoi avez-vous besoin ?",
    polesLabel: "Pôles concernés",
    polesHelp: "Plusieurs choix possibles : nous coordonnons tout.",
    profilLabel: "Vous êtes",
    profil: opts([
      ["entreprise", "Entreprise"],
      ["institution", "Institution ou collectivité"],
      ["particulier", "Particulier"],
    ] as const),
    natureLabel: "Nature de la demande",
    nature: opts([
      ["nouveau", "Nouveau projet"],
      ["renovation", "Rénovation ou amélioration"],
      ["depannage", "Dépannage"],
      ["contrat", "Contrat d'entretien"],
    ] as const),
  },

  poles: {
    title: "Quelques questions sur votre besoin",
    informatique: {
      domaines: {
        label: "Domaines concernés",
        options: opts([
          ["developpement", "Développement d'application (web, mobile, métier)"],
          ["reporting", "Reporting et tableaux de bord"],
          ["automatisation", "Automatisation de tâches"],
          ["ia", "Intelligence artificielle"],
        ] as const),
      },
      utilisateurs: {
        label: "Nombre d'utilisateurs",
        options: opts([
          ["1-10", "1 à 10"],
          ["11-50", "11 à 50"],
          ["51-200", "51 à 200"],
          ["200+", "Plus de 200"],
        ] as const),
      },
      outils: {
        label: "Outils utilisés aujourd'hui",
        options: opts([
          ["excel", "Excel"],
          ["logiciel", "Logiciel existant"],
          ["papier", "Papier"],
          ["aucun", "Aucun outil"],
        ] as const),
      },
      situation: {
        label: "Situation actuelle",
        options: opts([
          ["rien", "Rien d'existant"],
          ["ameliorer", "Existant à améliorer"],
          ["incident", "Incident en cours"],
        ] as const),
      },
      contraintes: { label: "Contraintes particulières (facultatif)", help: "Ex. intégration à un logiciel existant, données sensibles." },
    },
    construction: {
      typeOuvrage: {
        label: "Type d'ouvrage",
        options: opts([
          ["residentiel", "Résidentiel"],
          ["bureaux", "Bureaux"],
          ["industriel", "Industriel ou entrepôt"],
          ["public", "Équipement public"],
          ["autre", "Autre"],
        ] as const),
      },
      travaux: {
        label: "Nature des travaux",
        options: opts([
          ["neuf", "Construction neuve"],
          ["extension", "Extension"],
          ["renovation", "Rénovation"],
          ["etudes", "Études seules"],
        ] as const),
      },
      surface: { label: "Surface approximative en m² (facultatif)" },
      avancement: {
        label: "Avancement du projet",
        options: opts([
          ["idee", "Idée"],
          ["terrain", "Terrain disponible"],
          ["plans", "Plans disponibles"],
          ["permis", "Permis obtenu"],
        ] as const),
      },
      equipements: {
        label: "Équipements intelligents souhaités (facultatif)",
        options: opts([
          ["cablage", "Câblage réseau"],
          ["gtb", "GTB"],
          ["acces", "Contrôle d'accès"],
          ["capteurs", "Capteurs connectés"],
          ["indecis", "Je ne sais pas encore"],
        ] as const),
      },
    },
    hydraulique: {
      besoins: {
        label: "Type de besoin",
        options: opts([
          ["adduction", "Adduction d'eau"],
          ["assainissement", "Assainissement"],
          ["pompage", "Pompage et stockage"],
          ["compteurs", "Compteurs et capteurs connectés"],
        ] as const),
      },
      contexte: {
        label: "Contexte",
        options: opts([
          ["batiment", "Bâtiment"],
          ["industriel", "Site industriel"],
          ["collectivite", "Lotissement ou collectivité"],
        ] as const),
      },
      probleme: {
        label: "Problème constaté",
        options: opts([
          ["aucun-reseau", "Pas de réseau"],
          ["fuites", "Fuites ou coupures"],
          ["debit", "Débit insuffisant"],
          ["refoulements", "Refoulements"],
          ["normes", "Mise aux normes"],
        ] as const),
      },
      ampleur: { label: "Ampleur (facultatif)", help: "Longueur de réseau ou nombre de points d'eau, si connu." },
      plans: {
        label: "Avez-vous des plans ou relevés existants ?",
        options: opts([
          ["oui", "Oui"],
          ["non", "Non"],
        ] as const),
        hintIfYes: "Vous pourrez les joindre à l'étape suivante.",
      },
    },
    maintenance: {
      domaines: {
        label: "Domaine",
        options: opts([
          ["industrielle", "Industrielle"],
          ["informatique", "Informatique"],
          ["gtb", "GTB"],
        ] as const),
      },
      formule: {
        label: "Formule souhaitée",
        options: opts([
          ["ponctuelle", "Intervention ponctuelle"],
          ["preventif", "Contrat préventif"],
          ["panne", "Panne en cours"],
        ] as const),
      },
      equipements: { label: "Équipements concernés (facultatif)", help: "Ex. climatisation, groupe électrogène, serveurs." },
      nombre: { label: "Nombre de sites ou d'équipements (facultatif)" },
      criticite: {
        label: "Criticité",
        options: opts([
          ["arret", "Activité à l'arrêt"],
          ["degradee", "Activité dégradée"],
          ["aucun-impact", "Pas d'impact immédiat"],
        ] as const),
      },
    },
    emergency: {
      title: "Panne en cours ?",
      text: "Pour une intervention rapide, appelez-nous directement. Vous pouvez aussi envoyer ce formulaire : votre demande sera traitée en priorité.",
      cta: "Appeler maintenant",
    },
  },

  projet: {
    title: "Parlez-nous de votre projet",
    localisation: { label: "Localisation", help: "Commune ou ville, ex. Cocody, Yamoussoukro." },
    delai: {
      label: "Délai souhaité",
      options: opts([
        ["asap", "Dès que possible"],
        ["1-mois", "Sous 1 mois"],
        ["1-3-mois", "1 à 3 mois"],
        ["3-mois+", "Plus de 3 mois"],
        ["a-definir", "À définir"],
      ] as const),
    },
    budget: {
      label: "Budget indicatif en FCFA (facultatif)",
      // [À valider par les associés] fourchettes proposées.
      options: opts([
        ["moins-1m", "Moins de 1 million"],
        ["1-5m", "1 à 5 millions"],
        ["5-20m", "5 à 20 millions"],
        ["20m+", "Plus de 20 millions"],
        ["inconnu", "Je ne sais pas encore"],
      ] as const),
    },
    description: { label: "Description du besoin", help: "Plus vous êtes précis, plus notre première réponse sera utile." },
    fichiers: {
      label: "Pièces jointes (facultatif)",
      help: "Plans, photos, cahier des charges : PDF, DWG, JPG ou PNG, 3 fichiers et 10 Mo au total maximum.",
      remove: "Retirer",
    },
  },

  contact: {
    title: "Vos coordonnées",
    nom: { label: "Nom et prénom" },
    entreprise: { label: "Entreprise ou organisme" },
    fonction: { label: "Fonction (facultatif)" },
    telephone: { label: "Téléphone", help: "Ex. 07 08 09 10 11 ou +225 07 08 09 10 11." },
    whatsapp: { label: "Ce numéro est aussi sur WhatsApp" },
    email: { label: "E-mail" },
    preference: {
      label: "Moyen de contact préféré",
      options: opts([
        ["appel", "Appel"],
        ["whatsapp", "WhatsApp"],
        ["email", "E-mail"],
      ] as const),
    },
    consentement: {
      label: "J'accepte que KAZELE INFO & BTP utilise ces informations pour répondre à ma demande.",
      link: { label: "Politique de confidentialité", href: "/confidentialite" },
    },
  },

  // Affiché tant que QUOTE_FORM_ENABLED n'est pas à "true" (autorisation ARTCI en attente).
  unavailable: {
    title: "Parlons de votre projet",
    text: "Notre formulaire de devis en ligne ouvre très prochainement. En attendant, contactez-nous directement : un responsable de pôle étudie votre besoin avec la même attention.",
    call: "Appeler",
    whatsapp: "Écrire sur WhatsApp",
    email: "Envoyer un e-mail",
  },

  success: {
    title: "Merci, votre demande est bien reçue.",
    reference: "Votre référence",
    // Ajouter le délai de rappel uniquement s'il est tenu à chaque fois.
    text: "Un responsable de pôle étudie votre besoin et vous recontacte. Gardez cette référence : elle vous sera demandée.",
    ctaProjects: { label: "Découvrir nos réalisations", href: "/realisations" },
    ctaHome: { label: "Retour à l'accueil", href: "/" },
  },

  errors: {
    required: "Ce champ est obligatoire.",
    chooseOne: "Choisissez au moins une option.",
    generic: "L'envoi n'a pas abouti. Réessayez dans un instant, ou appelez-nous si le problème continue.",
    rateLimited: "Trop de demandes envoyées depuis cette connexion. Réessayez dans une heure, ou appelez-nous.",
    captcha: "La vérification anti-robot a échoué. Rechargez la page et réessayez.",
    unavailable: "Le service d'envoi est momentanément indisponible. Appelez-nous ou écrivez-nous sur WhatsApp.",
    invalid: "Certaines informations sont incomplètes. Vérifiez les champs signalés.",
  },
} as const;

export type PoleQuestions = typeof devis.poles;
export type { PoleId };
