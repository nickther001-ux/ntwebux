import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    [key: string]: any;
  };
}

const translations: Translations = {
  en: {
    nav: { services: "Services", process: "Process", whyUs: "Why Us", contact: "Contact", quote: "Get a Free Quote" },
    hero: {
      eyebrow: "Web Design Studio",
      h1_1: "YOUR", h1_2: "BUSINESS", h1_3: "ONLINE.", h1_4: "DONE RIGHT.",
      sub: "We build high-performance, conversion-focused websites for growing businesses. Stand out, attract more clients, and scale your brand with a stunning digital presence.",
      btn1: "Start My Project", btn2: "See How It Works",
      mockBadge: "+340% Avg. Traffic Increase"
    },
    stats: {
      s1: { v: "200+", l: "Websites Delivered" },
      s2: { v: "14", l: "Day Avg. Turnaround" },
      s3: { v: "98%", l: "Client Satisfaction" },
      s4: { v: "5★", l: "Average Review" }
    },
    services: {
      eyebrow: "Our Expertise", title: "Everything you need to dominate your market.",
      items: [
        { title: "Business Website", desc: "Custom, responsive sites built to convert visitors into loyal clients." },
        { title: "E-Commerce Store", desc: "Scalable online stores optimized for sales and seamless checkout." },
        { title: "Landing Pages", desc: "High-converting single pages for your marketing campaigns and ads." },
        { title: "SEO Optimization", desc: "Rank higher on Google and get found by customers actively searching for you." },
        { title: "Mobile-First Design", desc: "Flawless experiences across all devices, prioritizing mobile users." },
        { title: "Hosting & Support", desc: "Secure, lightning-fast hosting with ongoing technical support and maintenance." }
      ]
    },
    process: {
      eyebrow: "How We Work", title: "A streamlined process for maximum results.", desc: "We respect your time. Our battle-tested framework ensures your project is delivered on time, on budget, and beyond expectations.",
      steps: [
        { title: "Discovery Call", desc: "We learn about your business, goals, and target audience to craft the perfect strategy." },
        { title: "Design & Strategy", desc: "We create wireframes and high-fidelity mockups for your approval." },
        { title: "Build & Test", desc: "We develop the site using modern tech, ensuring it's fast, secure, and bug-free." },
        { title: "Launch & Grow", desc: "We deploy your new digital asset and help you scale your online presence." }
      ]
    },
    whyUs: {
      title: "Built differently.",
      pills: [
        { title: "No Cookie-Cutter Templates", desc: "100% custom designs tailored to your brand." },
        { title: "Fast Turnaround", desc: "Launch in weeks, not months." },
        { title: "Real Humans, Real Support", desc: "Direct communication with your design team." },
        { title: "Built to Convert", desc: "We design for ROI, not just aesthetics." },
        { title: "Transparent Pricing", desc: "No hidden fees or surprise invoices." }
      ]
    },
    testimonials: {
      title: "Don't just take our word for it.",
      items: [
        { quote: "Working with NT Web Design was a game-changer. They completely revamped our digital presence and our leads doubled in the first month.", name: "Jean-Michel Tremblay", role: "Owner, Tremblay Excavation Inc." },
        { quote: "Fast, professional, and insanely talented. The team understood our vision instantly.", name: "Sophie Côté", role: "Founder, SC Esthétique" },
        { quote: "Our e-commerce sales skyrocketed after the redesign. Highly recommended.", name: "David Larose", role: "Director, Larose & Fils" }
      ]
    },
    contact: {
      title: "Ready to level up?", desc: "Fill out the form below and we'll get back to you within 24 hours with a custom proposal.",
      perks: [
        { title: "Free Strategy Session", desc: "30-minute consultation to discuss your goals." },
        { title: "Custom Proposal", desc: "Detailed breakdown of scope, timeline, and investment." },
        { title: "No Commitment", desc: "Zero pressure to proceed if we're not the right fit." }
      ],
      form: {
        fn: "First Name", ln: "Last Name", email: "Email Address", phone: "Phone Number",
        service: "Service Needed", serviceOptions: ["Business Website", "E-Commerce Store", "Landing Page", "Website Redesign", "SEO Optimization", "Not Sure Yet"],
        msg: "Project Details", submit: "Send Inquiry", submitting: "Sending..."
      }
    },
    footer: {
      tagline: "Crafting digital experiences that drive real business growth.",
      links1: "Services", links2: "Company", links3: "Legal",
      copy: "© 2026 NT WebUX. All rights reserved."
    },
    portfolio: {
      services: {
        eyebrow: "Services & Pricing",
        title1: "Clear offers,",
        title2: "no surprises",
        desc: "Every package includes hosting, maintenance, and support. You pay once — we handle the rest.",
        plans: [
          {
            name: "Launch", price: "1,500", cycle: "One-time payment",
            features: ["5-page responsive website", "Custom design", "Basic SEO included", "Contact form", "Deployment included", "1h training included"],
            ctaContact: "Contact Me", ctaBuy: "Buy Now", featured: false
          },
          {
            name: "Maintenance", price: "500", cycle: "/ month",
            badge: "Most Popular",
            features: ["Managed hosting & domain", "Unlimited updates", "Security & backups", "Priority support 48h", "Monthly analytics report", "Continuous optimization"],
            ctaContact: "Contact Me", ctaBuy: "Buy Now", featured: true
          },
          {
            name: "Full Package", price: "997", cycle: "+ $500 / month",
            features: ["Full site (Launch)", "Monthly maintenance included", "Advanced SEO & Google Ads", "Monthly content (2 articles)", "Direct WhatsApp support", "Unlimited revisions (year 1)"],
            ctaContact: "Contact Me", ctaBuy: "Buy Now", featured: false
          }
        ]
      },
      work: {
        eyebrow: "Our Work",
        title1: "What we've",
        title2: "built",
        desc: "Each project is unique, designed to reflect the client's identity and turn visitors into customers.",
        items: [
          { tag: "Excavation & Construction", title: "Tremblay Excavation Inc.", desc: "Bilingual showcase site with submission form and project gallery.", large: true },
          { tag: "Health Clinic", title: "Physio Optimal", desc: "Integrated online booking and optimized local SEO.", large: false },
          { tag: "Restaurant & Catering", title: "Saveurs d'Haïti MTL", desc: "Online menu, reservations and takeout orders integrated.", large: false }
        ],
        ctaText: "Have a project in mind?",
        ctaBtn: "Let's Talk →"
      }
    }
  },
  fr: {
    nav: { services: "Services", process: "Processus", whyUs: "Pourquoi Nous", contact: "Contact", quote: "Devis Gratuit" },
    hero: {
      eyebrow: "Studio Web Design",
      h1_1: "VOTRE", h1_2: "ENTREPRISE", h1_3: "EN LIGNE.", h1_4: "BIEN FAIT.",
      sub: "Nous créons des sites web performants axés sur la conversion. Démarquez-vous, attirez plus de clients et propulsez votre marque avec une présence numérique exceptionnelle.",
      btn1: "Démarrer Mon Projet", btn2: "Comment Ça Marche",
      mockBadge: "+340% de Trafic en Moyenne"
    },
    stats: {
      s1: { v: "200+", l: "Sites Livrés" },
      s2: { v: "14", l: "Jours en Moyenne" },
      s3: { v: "98%", l: "Clients Satisfaits" },
      s4: { v: "5★", l: "Avis Moyen" }
    },
    services: {
      eyebrow: "Notre Expertise", title: "Tout ce dont vous avez besoin pour dominer votre marché.",
      items: [
        { title: "Site d'Entreprise", desc: "Sites sur mesure et réactifs conçus pour convertir les visiteurs en clients fidèles." },
        { title: "Boutique E-Commerce", desc: "Boutiques en ligne évolutives optimisées pour les ventes et un paiement fluide." },
        { title: "Pages de Destination", desc: "Pages uniques à haute conversion pour vos campagnes marketing." },
        { title: "Optimisation SEO", desc: "Classez-vous plus haut sur Google et soyez trouvé par les clients." },
        { title: "Conception Mobile-First", desc: "Des expériences impeccables sur tous les appareils, en priorité sur mobile." },
        { title: "Hébergement & Support", desc: "Hébergement sécurisé et ultra-rapide avec support technique continu." }
      ]
    },
    process: {
      eyebrow: "Comment Nous Travaillons", title: "Un processus optimisé pour des résultats maximaux.", desc: "Nous respectons votre temps. Notre cadre éprouvé garantit que votre projet est livré à temps, dans les limites du budget et au-delà des attentes.",
      steps: [
        { title: "Appel de Découverte", desc: "Nous apprenons à connaître votre entreprise et vos objectifs pour élaborer la stratégie parfaite." },
        { title: "Design & Stratégie", desc: "Nous créons des maquettes haute fidélité pour votre approbation." },
        { title: "Développement & Test", desc: "Nous développons le site en utilisant des technologies modernes, assurant rapidité et sécurité." },
        { title: "Lancement & Croissance", desc: "Nous déployons votre nouvel atout numérique et vous aidons à évoluer." }
      ]
    },
    whyUs: {
      title: "Conçu différemment.",
      pills: [
        { title: "Pas de Modèles Préfabriqués", desc: "Des designs 100% sur mesure adaptés à votre marque." },
        { title: "Délais Rapides", desc: "Lancez-vous en quelques semaines, pas en quelques mois." },
        { title: "De Vrais Humains, Un Vrai Support", desc: "Communication directe avec votre équipe de conception." },
        { title: "Conçu pour Convertir", desc: "Nous concevons pour le ROI, pas seulement pour l'esthétique." },
        { title: "Tarification Transparente", desc: "Pas de frais cachés ni de factures surprises." }
      ]
    },
    testimonials: {
      title: "Ne nous croyez pas sur parole.",
      items: [
        { quote: "Travailler avec NT Web Design a tout changé. Ils ont complètement repensé notre présence numérique et nos prospects ont doublé.", name: "Jean-Michel Tremblay", role: "Propriétaire, Tremblay Excavation Inc." },
        { quote: "Rapide, professionnel et incroyablement talentueux. L'équipe a compris notre vision instantanément.", name: "Sophie Côté", role: "Fondatrice, SC Esthétique" },
        { quote: "Nos ventes en ligne ont explosé après la refonte. Fortement recommandé.", name: "David Larose", role: "Directeur, Larose & Fils" }
      ]
    },
    contact: {
      title: "Prêt à passer au niveau supérieur?", desc: "Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures avec une proposition sur mesure.",
      perks: [
        { title: "Session de Stratégie Gratuite", desc: "Consultation de 30 minutes pour discuter de vos objectifs." },
        { title: "Proposition Sur Mesure", desc: "Répartition détaillée de la portée, du calendrier et de l'investissement." },
        { title: "Sans Engagement", desc: "Aucune pression pour continuer si nous ne sommes pas le bon choix." }
      ],
      form: {
        fn: "Prénom", ln: "Nom de famille", email: "Adresse e-mail", phone: "Numéro de téléphone",
        service: "Service Requis", serviceOptions: ["Site d'Entreprise", "Boutique E-Commerce", "Page de Destination", "Refonte de Site Web", "Optimisation SEO", "Pas Encore Sûr"],
        msg: "Détails du Projet", submit: "Envoyer la Demande", submitting: "Envoi en cours..."
      }
    },
    footer: {
      tagline: "Créer des expériences numériques qui stimulent la véritable croissance.",
      links1: "Services", links2: "Entreprise", links3: "Légal",
      copy: "© 2026 NT WebUX. Tous droits réservés."
    },
    portfolio: {
      services: {
        eyebrow: "Services & Tarifs",
        title1: "Des offres claires,",
        title2: "sans surprise",
        desc: "Chaque forfait inclut l'hébergement, la maintenance et le support. Vous payez une fois, on s'occupe du reste.",
        plans: [
          {
            name: "Lancement", price: "1 500", cycle: "Paiement unique",
            features: ["Site 5 pages responsive", "Design personnalisé", "SEO de base intégré", "Formulaire de contact", "Déploiement inclus", "Formation 1h incluse"],
            ctaContact: "Me Contacter", ctaBuy: "Acheter", featured: false
          },
          {
            name: "Maintenance", price: "500", cycle: "/ mois",
            badge: "Le plus populaire",
            features: ["Hébergement & domaine géré", "Mises à jour illimitées", "Sécurité & backups", "Support prioritaire 48h", "Rapport mensuel Analytics", "Optimisation continue"],
            ctaContact: "Me Contacter", ctaBuy: "Acheter", featured: true
          },
          {
            name: "Pack Complet", price: "997", cycle: "+ $500 / mois",
            features: ["Site complet (Lancement)", "Maintenance mensuelle incluse", "SEO avancé & Google Ads setup", "Contenu mensuel (2 articles)", "Support WhatsApp direct", "Révisions illimitées (1re année)"],
            ctaContact: "Me Contacter", ctaBuy: "Acheter", featured: false
          }
        ]
      },
      work: {
        eyebrow: "Réalisations",
        title1: "Ce qu'on a",
        title2: "construit",
        desc: "Chaque projet est unique, conçu pour refléter l'identité du client et convertir les visiteurs en clients.",
        items: [
          { tag: "Excavation & Construction", title: "Excavation Tremblay Inc.", desc: "Site vitrine bilingue avec formulaire de soumission et galerie de projets.", large: true },
          { tag: "Clinique Santé", title: "Physio Optimal", desc: "Prise de rendez-vous en ligne intégrée et SEO local optimisé.", large: false },
          { tag: "Restaurant & Traiteur", title: "Saveurs d'Haïti MTL", desc: "Menu en ligne, réservations et commandes à emporter intégrés.", large: false }
        ],
        ctaText: "Un projet en tête ?",
        ctaBtn: "Discutons-en →"
      }
    }
  }
};

interface LanguageContextProps {
  lang: Language;
  setLang: (l: Language) => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const t = (path: string) => {
    const keys = path.split('.');
    let current = translations[lang];
    for (const k of keys) {
      if (current[k] === undefined) return path;
      current = current[k];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
