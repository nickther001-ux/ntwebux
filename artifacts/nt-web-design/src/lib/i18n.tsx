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
      s2: { v: "72h", l: "Avg. Turnaround" },
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
        { title: "Fast Turnaround", desc: "Most projects delivered in 72 hours." },
        { title: "Real Humans, Real Support", desc: "Direct communication with your design team." },
        { title: "Built to Convert", desc: "We design for ROI, not just aesthetics." },
        { title: "Transparent Pricing", desc: "No hidden fees or surprise invoices." },
        { title: "SEO Built-In", desc: "Every site is optimized to rank from day one." }
      ]
    },
    testimonials: {
      title: "Don't just take our word for it.",
      items: [
        { quote: "They revamped our entire digital presence. Our lead form submissions doubled in the first month and the site was live in under 72 hours. Incredible value.", name: "Jean-Michel Tremblay", role: "Owner, Tremblay Excavation Inc.", metric: "2× leads", metricLabel: "in 30 days", img: "proj-construction.webp", industry: "Construction" },
        { quote: "Our booking system went from phone-only to fully online. We're at 95% capacity every week now. The site basically runs the front desk for us.", name: "Dr. Aline Côté", role: "Founder, Physio Optimal", metric: "95% capacity", metricLabel: "since launch", img: "proj-medical.webp", industry: "Healthcare" },
        { quote: "NT Web UX built our online presence from scratch. We're taking reservations and takeout orders 24/7 now — revenue is up 40% since we launched.", name: "Marie-Claire Joseph", role: "Owner, Saveurs d'Haïti MTL", metric: "+40% revenue", metricLabel: "since launch", img: "proj-restaurant.webp", industry: "Restaurant" },
        { quote: "We went from zero online presence to fully booked in 6 weeks. The ROI on this website has been incredible. Best investment we've made.", name: "Karine Beaumont", role: "CEO, Beaumont Wellness Clinic", metric: "6 weeks", metricLabel: "to fully booked", img: "proj-wellness.webp", industry: "Wellness" },
        { quote: "They built our SaaS dashboard from scratch and it looks like a million dollars. Clients constantly compliment our platform's design.", name: "Alexis Fontaine", role: "Co-Founder, Flux Analytics", metric: "5★", metricLabel: "client rating", img: "proj-saas.webp", industry: "SaaS" },
        { quote: "The bilingual site they built for us is exactly what we needed to reach both English and French markets. Our organic traffic jumped 67%.", name: "Marc-André Ouellet", role: "Owner, Bâtisseurs Nordiques Inc.", metric: "+67% traffic", metricLabel: "organic growth", img: "proj-construction2.webp", industry: "Construction" }
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
    chat: {
      name: "Nickson 2.4",
      subName: "NT Digital Group",
      status: "Online · Instant replies",
      welcome: "Welcome to NT Digital Group. I am Nickson 2.4. Are you here to Scale a Foundation or Automate your Revenue?",
      placeholder: "Write a message…",
      scaleChip: "Scale a Foundation",
      automateChip: "Automate Revenue",
      rules: {
        price:    "Our Digital Foundations start at $997, and our AI OS starts at $297/month. Would you like to see the pricing table?",
        ai:       "We specialize in AI Text-Back and Auto-Booking systems that recover lost revenue. You can calculate your potential ROI using our Audit tool on this page.",
        website:  "We build high-performance, bilingual sites with a Silicon Valley aesthetic. Check our showreel in the Foundations section above.",
        hello:    "I am Nickson 2.4, the NT Digital assistant. I can help you navigate our services or book a technical consultation with our team.",
        scale:    "Digital Foundations start with Website Design, eCommerce, and CMS — all built with a Silicon Valley aesthetic and delivered in 72 hours.",
        automate: "Our AI OS includes Text-Back automation, auto-booking, and review management — starting at $297/month. Use the ROI Audit above to see your numbers.",
        global:   "We operate a borderless agency model with hubs in Montreal and Japan. This allows us to offer 24/7 technical architecture and bilingual (FR/EN) solutions that bridge the gap between markets.",
        quality:  "We don't use generic templates. Every Digital Foundation we build is bespoke, using high-performance frameworks like Next.js to ensure Silicon Valley-level speed and security.",
        why:      "Most agencies build websites; we build revenue engines. We combine world-class aesthetics with AI automations like Text-Back to ensure every missed call is recovered as a lead.",
        timeline: "We move at startup speed. Foundations are typically delivered in 72 hours. We can begin your AI implementation immediately after a quick technical audit.",
        audit:    "You should try our ROI calculator on the main page. Most of our clients discover they are losing thousands of dollars a month in missed calls before we step in.",
        fallback: "I'm still learning the intricacies of your business. Would you like to book a direct technical session with our team to discuss your specific architecture?",
      },
    },
    footer: {
      tagline: "Technical architecture and AI automation for borderless enterprises. We engineer digital foundations for high-performance service businesses.",
      hubsLabel: "Global Hubs",
      foundationsLabel: "Foundations",
      foundationsLinks: [
        { label: "Website Design",  href: "#services" },
        { label: "eCommerce",       href: "#services" },
        { label: "CMS Integration", href: "#services" },
      ],
      aiLabel: "Enterprise AI",
      aiLinks: [
        { label: "AI Text-Back",    href: "/business" },
        { label: "SaaS Development", href: "/business" },
        { label: "ROI Audit",       href: "/business" },
      ],
      companyLabel: "Company",
      companyLinks: [
        { label: "About",           href: "/about"   },
        { label: "Contact",         href: "#contact" },
        { label: "Privacy Policy",  href: "/privacy" },
      ],
      statusLabel: "All Systems Operational",
      copy: "© 2026 NT Digital Group. All rights reserved.",
    },
    portfolio: {
      services: {
        eyebrow: "Services & Pricing",
        title1: "Clear offers,",
        title2: "no surprises",
        desc: "Every package includes hosting, maintenance, and support. You pay once — we handle the rest.",
        toggle: {
          web: "Digital Foundations (Project)",
          ai:  "Enterprise AI (Monthly SaaS)"
        },
        webPlans: [
          {
            name: "Starter", price: "997", cycle: "One-time project fee",
            features: ["5-page responsive website", "Custom design", "Basic SEO", "Contact form"],
            cta: "Start Project", featured: false
          },
          {
            name: "Growth", price: "2,497", cycle: "One-time project fee",
            badge: "Most Popular",
            features: ["Up to 10 pages", "CMS integration", "E-commerce ready", "Advanced SEO"],
            cta: "Start Project", featured: true
          },
          {
            name: "Enterprise", price: "Custom", cycle: "Tailored scope",
            features: ["Unlimited pages", "Custom web apps", "Dedicated project manager", "SLA & priority support"],
            cta: "Talk to Sales", featured: false, isCustom: true
          }
        ],
        aiPlans: [
          {
            name: "Starter", price: "97", cycle: "/ month",
            features: ["Basic CRM", "AI Web Chat", "Email Support"],
            cta: "Start Free Trial", featured: false
          },
          {
            name: "Professional", price: "297", cycle: "/ month",
            badge: "Most Popular",
            features: ["Full AI Text-Back", "Auto-Booking", "Review Engine"],
            cta: "Claim Beta Spot", featured: true
          },
          {
            name: "Full Scope", price: "899", cycle: "/ month",
            features: ["Custom AI Voice Agents", "Multi-tenant SaaS setup", "WhatsApp Support"],
            cta: "Talk to Sales", featured: false
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
      s2: { v: "72h", l: "Délai Moyen" },
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
        { title: "Délais Rapides", desc: "La plupart des projets livrés en 72 heures." },
        { title: "De Vrais Humains, Un Vrai Support", desc: "Communication directe avec votre équipe de conception." },
        { title: "Conçu pour Convertir", desc: "Nous concevons pour le ROI, pas seulement pour l'esthétique." },
        { title: "Tarification Transparente", desc: "Pas de frais cachés ni de factures surprises." },
        { title: "SEO Intégré", desc: "Chaque site est optimisé pour se classer dès le premier jour." }
      ]
    },
    testimonials: {
      title: "Ne nous croyez pas sur parole.",
      items: [
        { quote: "Ils ont complètement repensé notre présence numérique. Nos demandes ont doublé le premier mois et le site était en ligne en moins de 72 heures. Une valeur incroyable.", name: "Jean-Michel Tremblay", role: "Propriétaire, Tremblay Excavation Inc.", metric: "2× clients", metricLabel: "en 30 jours", img: "proj-construction.webp", industry: "Construction" },
        { quote: "Notre système de réservation est passé du téléphone au 100% en ligne. On est à 95% de capacité chaque semaine. Le site fait le travail de la réceptionniste.", name: "Dre. Aline Côté", role: "Fondatrice, Physio Optimal", metric: "95% capacité", metricLabel: "depuis le lancement", img: "proj-medical.webp", industry: "Santé" },
        { quote: "NT Web UX a créé notre présence en ligne de zéro. On prend des réservations et commandes 24/7 maintenant — les revenus ont augmenté de 40% depuis le lancement.", name: "Marie-Claire Joseph", role: "Propriétaire, Saveurs d'Haïti MTL", metric: "+40% revenus", metricLabel: "depuis le lancement", img: "proj-restaurant.webp", industry: "Restaurant" },
        { quote: "On est passé de zéro présence en ligne à complet en 6 semaines. Le retour sur investissement de ce site est incroyable. Meilleur investissement qu'on ait fait.", name: "Karine Beaumont", role: "PDG, Clinique Beaumont Santé", metric: "6 semaines", metricLabel: "pour complet", img: "proj-wellness.webp", industry: "Bien-être" },
        { quote: "Ils ont construit notre tableau de bord SaaS de zéro et ça ressemble à un million de dollars. Nos clients complimentent toujours le design de notre plateforme.", name: "Alexis Fontaine", role: "Co-Fondateur, Flux Analytics", metric: "5★", metricLabel: "satisfaction client", img: "proj-saas.webp", industry: "SaaS" },
        { quote: "Le site bilingue qu'ils ont construit est exactement ce qu'il nous fallait. Notre trafic organique a bondi de 67% en quelques mois.", name: "Marc-André Ouellet", role: "Propriétaire, Bâtisseurs Nordiques Inc.", metric: "+67% trafic", metricLabel: "croissance organique", img: "proj-construction2.webp", industry: "Construction" }
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
    chat: {
      name: "Nickson 2.4",
      subName: "NT Digital Group",
      status: "En ligne · Réponses instantanées",
      welcome: "Bienvenue chez NT Digital Group. Je suis Nickson 2.4. Êtes-vous ici pour Construire des Fondations ou Automatiser vos Revenus ?",
      placeholder: "Écrivez votre message…",
      scaleChip: "Construire des Fondations",
      automateChip: "Automatiser mes Revenus",
      rules: {
        price:    "Nos Fondations Numériques débutent à 997 $, et notre IA OS commence à 297 $/mois. Souhaitez-vous voir le tableau des tarifs ?",
        ai:       "Nous sommes spécialisés dans les systèmes IA Text-Back et de réservation automatique qui récupèrent les revenus perdus. Calculez votre ROI potentiel avec l'outil d'audit sur cette page.",
        website:  "Nous créons des sites haute performance et bilingues avec une esthétique Silicon Valley. Consultez notre showreel dans la section Fondations ci-dessus.",
        hello:    "Je suis Nickson 2.4, l'assistant NT Digital. Je peux vous aider à naviguer dans nos services ou à réserver une consultation technique.",
        scale:    "Les Fondations Numériques incluent le design web, l'e-commerce et le CMS — livrés en 72h avec une esthétique Silicon Valley.",
        automate: "Notre IA OS inclut l'automatisation Text-Back, la réservation automatique et la gestion des avis — à partir de 297 $/mois. Utilisez l'Audit ROI ci-dessus.",
        global:   "Nous opérons un modèle d'agence sans frontières avec des bureaux à Montréal et au Japon. Cela nous permet d'offrir une architecture technique 24h/24 et des solutions bilingues (FR/EN) qui créent des ponts entre les marchés.",
        quality:  "Nous n'utilisons pas de templates génériques. Chaque Fondation Numérique est sur mesure, construite avec des frameworks haute performance comme Next.js pour garantir vitesse et sécurité de niveau Silicon Valley.",
        why:      "La plupart des agences créent des sites web ; nous, nous construisons des moteurs de revenus. Nous combinons une esthétique de classe mondiale avec des automatisations IA comme le Text-Back pour transformer chaque appel manqué en prospect.",
        timeline: "Nous avançons à la vitesse d'une startup. Les Fondations sont livrées en 72 heures. Nous pouvons démarrer votre implémentation IA immédiatement après un audit technique rapide.",
        audit:    "Essayez notre calculateur ROI sur la page principale. La plupart de nos clients découvrent qu'ils perdent des milliers de dollars par mois en appels manqués avant que nous intervenions.",
        fallback: "J'apprends encore les subtilités de votre activité. Souhaitez-vous réserver une session technique directe avec notre équipe pour discuter de votre architecture spécifique ?",
      },
    },
    footer: {
      tagline: "Architecture technique et automatisation IA pour les entreprises sans frontières. Nous construisons les fondations numériques pour les entreprises haute performance.",
      hubsLabel: "Bureaux Mondiaux",
      foundationsLabel: "Fondations",
      foundationsLinks: [
        { label: "Design Web",       href: "#services" },
        { label: "eCommerce",        href: "#services" },
        { label: "Intégration CMS",  href: "#services" },
      ],
      aiLabel: "IA Entreprise",
      aiLinks: [
        { label: "IA Text-Back",     href: "/business" },
        { label: "Développement SaaS", href: "/business" },
        { label: "Audit ROI",        href: "/business" },
      ],
      companyLabel: "Entreprise",
      companyLinks: [
        { label: "À propos",         href: "/about"   },
        { label: "Contact",          href: "#contact" },
        { label: "Politique de confidentialité", href: "/privacy" },
      ],
      statusLabel: "Tous Systèmes Opérationnels",
      copy: "© 2026 NT Digital Group. Tous droits réservés.",
    },
    portfolio: {
      services: {
        eyebrow: "Services & Tarifs",
        title1: "Des offres claires,",
        title2: "sans surprise",
        desc: "Chaque forfait inclut l'hébergement, la maintenance et le support. Vous payez une fois, on s'occupe du reste.",
        toggle: {
          web: "Fondations Numériques (Projet)",
          ai:  "IA Entreprise (SaaS Mensuel)"
        },
        webPlans: [
          {
            name: "Starter", price: "997", cycle: "Tarif unique du projet",
            features: ["Site 5 pages responsive", "Design personnalisé", "SEO de base", "Formulaire de contact"],
            cta: "Démarrer le Projet", featured: false
          },
          {
            name: "Growth", price: "2 497", cycle: "Tarif unique du projet",
            badge: "Le plus populaire",
            features: ["Jusqu'à 10 pages", "Intégration CMS", "Prêt pour e-commerce", "SEO avancé"],
            cta: "Démarrer le Projet", featured: true
          },
          {
            name: "Enterprise", price: "Sur mesure", cycle: "Portée sur mesure",
            features: ["Pages illimitées", "Applications web sur mesure", "Chef de projet dédié", "SLA & support prioritaire"],
            cta: "Parler aux Ventes", featured: false, isCustom: true
          }
        ],
        aiPlans: [
          {
            name: "Starter", price: "97", cycle: "/ mois",
            features: ["CRM de base", "Chat Web IA", "Support par email"],
            cta: "Essai Gratuit", featured: false
          },
          {
            name: "Professional", price: "297", cycle: "/ mois",
            badge: "Le plus populaire",
            features: ["AI Text-Back complet", "Réservation auto", "Moteur d'avis clients"],
            cta: "Réserver Bêta", featured: true
          },
          {
            name: "Full Scope", price: "899", cycle: "/ mois",
            features: ["Agents vocaux IA sur mesure", "SaaS multi-tenant", "Support WhatsApp"],
            cta: "Parler aux Ventes", featured: false
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
