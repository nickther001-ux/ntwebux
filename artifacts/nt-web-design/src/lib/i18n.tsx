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
        { title: "Website Design", desc: "Modern, user-focused design tailored to your brand. We focus on conversion and clean engineering." },
        { title: "Development", desc: "Custom web development using modern, lightning-fast frameworks. Scalable architectures optimized for speed and security." },
        { title: "eCommerce", desc: "Secure online stores with high-end payment integrations and inventory management." },
        { title: "CMS Integration", desc: "Take full control of your website. Intuitive CMS allowing you to easily update text, manage blogs, and upload images." },
        { title: "SEO & Marketing", desc: "Ranking you where it matters. Technical SEO and keyword strategy included." },
        { title: "Maintenance & Support", desc: "Monthly security updates, daily cloud backups, bug fixes, and 24/7 uptime monitoring." },
        { title: "Enterprise SaaS", desc: "Scalable, multi-tenant cloud applications engineered for high performance." },
        { title: "AI Integrations", desc: "Supercharge your business with custom AI solutions. Smart chatbots, automated workflows, and advanced AI agents." }
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
        { title: "Transparent Pricing", desc: "No hidden fees or surprise invoices." },
        { title: "SEO Built-In", desc: "Every site is optimized to rank from day one." }
      ]
    },
    testimonials: {
      title: "Don't just take our word for it.",
      items: [
        { quote: "Working with NT Web Design was a game-changer. They completely revamped our digital presence and our leads doubled in the first month.", name: "Jean-Michel Tremblay", role: "Owner, Tremblay Excavation Inc." },
        { quote: "Fast, professional, and insanely talented. The team understood our vision instantly and delivered beyond expectations.", name: "Sophie Côté", role: "Founder, SC Esthétique" },
        { quote: "Our e-commerce sales skyrocketed after the redesign. Clean code, beautiful design, and zero headaches. Highly recommended.", name: "David Larose", role: "Director, Larose & Fils" },
        { quote: "We went from zero online presence to fully booked in 6 weeks. The ROI on this website has been incredible.", name: "Karine Beaumont", role: "CEO, Beaumont Wellness Clinic" },
        { quote: "They built our SaaS dashboard from scratch and it looks like a million dollars. Clients always compliment our platform.", name: "Alexis Fontaine", role: "Co-Founder, Flux Analytics" },
        { quote: "The bilingual website they built for us is exactly what we needed to reach both English and French markets in Montréal.", name: "Marc-André Ouellet", role: "Owner, Bâtisseurs Nordiques Inc." }
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
      copy: "© 2026 NT Web UX. All rights reserved."
    },
    portfolio: {
      services: {
        eyebrow: "Services & Pricing",
        title1: "Clear offers,",
        title2: "no surprises",
        desc: "Every package includes hosting, maintenance, and support. You pay once — we handle the rest.",
        plans: [
          {
            name: "Starter", price: "99", cycle: "/ month",
            features: ["1-page responsive website", "Custom design", "Contact form", "Basic SEO", "Free domain 1st year", "Email support"],
            ctaContact: "Contact Me", ctaBuy: "Buy Now", featured: false
          },
          {
            name: "Growth", price: "299", cycle: "/ month",
            features: ["5-page responsive website", "Custom design", "Advanced SEO included", "Contact & booking form", "Deployment included", "Delivered in 72 hours"],
            ctaContact: "Contact Me", ctaBuy: "Buy Now", featured: false
          },
          {
            name: "Premium Basic", price: "500", cycle: "/ month",
            badge: "Most Popular",
            features: ["Up to 10 pages", "CMS integration", "eCommerce ready", "Google Ads setup", "Priority support 48h", "Monthly analytics report"],
            ctaContact: "Contact Me", ctaBuy: "Buy Now", featured: true
          },
          {
            name: "Full Scope", price: "899", cycle: "/ month",
            features: ["Unlimited pages", "Full eCommerce", "AI chatbot integration", "Advanced SEO & content", "Direct WhatsApp support", "Delivered in 72 hours"],
            ctaContact: "Contact Me", ctaBuy: "Buy Now", featured: false
          },
          {
            name: "Enterprise Pro", price: "—", cycle: "Custom pricing",
            features: ["Enterprise SaaS / multi-tenant", "Custom AI integrations", "Dedicated project manager", "SLA & uptime guarantee", "Unlimited revisions", "Priority onboarding"],
            ctaContact: "Contact Us", ctaBuy: "Get a Quote", featured: false
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
        { title: "Tarification Transparente", desc: "Pas de frais cachés ni de factures surprises." },
        { title: "SEO Intégré", desc: "Chaque site est optimisé pour se classer dès le premier jour." }
      ]
    },
    testimonials: {
      title: "Ne nous croyez pas sur parole.",
      items: [
        { quote: "Travailler avec NT Web Design a tout changé. Ils ont complètement repensé notre présence numérique et nos prospects ont doublé dès le premier mois.", name: "Jean-Michel Tremblay", role: "Propriétaire, Tremblay Excavation Inc." },
        { quote: "Rapide, professionnel et incroyablement talentueux. L'équipe a compris notre vision instantanément et a livré au-delà de nos attentes.", name: "Sophie Côté", role: "Fondatrice, SC Esthétique" },
        { quote: "Nos ventes en ligne ont explosé après la refonte. Code propre, design magnifique, aucun problème. Fortement recommandé.", name: "David Larose", role: "Directeur, Larose & Fils" },
        { quote: "Nous sommes passés de zéro présence en ligne à complet en 6 semaines. Le retour sur investissement de ce site est incroyable.", name: "Karine Beaumont", role: "PDG, Clinique Beaumont Santé" },
        { quote: "Ils ont construit notre tableau de bord SaaS de zéro et ça ressemble à un million de dollars. Nos clients complimentent toujours notre plateforme.", name: "Alexis Fontaine", role: "Co-Fondateur, Flux Analytics" },
        { quote: "Le site bilingue qu'ils ont construit pour nous est exactement ce qu'il nous fallait pour atteindre les marchés anglophone et francophone.", name: "Marc-André Ouellet", role: "Propriétaire, Bâtisseurs Nordiques Inc." }
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
      copy: "© 2026 NT Web UX. Tous droits réservés."
    },
    portfolio: {
      services: {
        eyebrow: "Services & Tarifs",
        title1: "Des offres claires,",
        title2: "sans surprise",
        desc: "Chaque forfait inclut l'hébergement, la maintenance et le support. Vous payez une fois, on s'occupe du reste.",
        plans: [
          {
            name: "Starter", price: "99", cycle: "/ mois",
            features: ["Site 1 page responsive", "Design personnalisé", "Formulaire de contact", "SEO de base", "Domaine gratuit 1re année", "Support par email"],
            ctaContact: "Me Contacter", ctaBuy: "Acheter", featured: false
          },
          {
            name: "Growth", price: "299", cycle: "/ mois",
            features: ["Site 5 pages responsive", "Design personnalisé", "SEO avancé intégré", "Formulaire & réservation", "Déploiement inclus", "Livré en 72 heures"],
            ctaContact: "Me Contacter", ctaBuy: "Acheter", featured: false
          },
          {
            name: "Premium Basic", price: "500", cycle: "/ mois",
            badge: "Le plus populaire",
            features: ["Jusqu'à 10 pages", "Intégration CMS", "Prêt pour e-commerce", "Configuration Google Ads", "Support prioritaire 48h", "Rapport mensuel Analytics"],
            ctaContact: "Me Contacter", ctaBuy: "Acheter", featured: true
          },
          {
            name: "Full Scope", price: "899", cycle: "/ mois",
            features: ["Pages illimitées", "E-commerce complet", "Intégration chatbot IA", "SEO avancé & contenu", "Support WhatsApp direct", "Livré en 72 heures"],
            ctaContact: "Me Contacter", ctaBuy: "Acheter", featured: false
          },
          {
            name: "Enterprise Pro", price: "—", cycle: "Tarif sur mesure",
            features: ["SaaS enterprise / multi-tenant", "Intégrations IA personnalisées", "Chef de projet dédié", "SLA & garantie de disponibilité", "Révisions illimitées", "Onboarding prioritaire"],
            ctaContact: "Nous Contacter", ctaBuy: "Obtenir un Devis", featured: false
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
