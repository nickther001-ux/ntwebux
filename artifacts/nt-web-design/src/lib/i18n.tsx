import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    [key: string]: any;
  };
}

const translations: Translations = {
  en: {
    nav: { services: "Services", process: "Process", whyUs: "Why Us", contact: "Contact", quote: "Get a Free Audit" },
    hero: {
      eyebrow: "Web Design Studio",
      h1_1: "YOUR", h1_2: "BUSINESS", h1_3: "ONLINE.", h1_4: "DONE RIGHT.",
      sub: "We build your custom bilingual website and automate your client acquisition. Most sites go live in 3 days. Complex builds take a little longer — never months.",
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
        { quote: "They revamped our entire digital presence. Lead form submissions nearly doubled in the first month and the site went live in under 72 hours. Genuinely surprised by the pace.", name: "Jean-Michel Tremblay", role: "Owner, Tremblay Excavation Inc.", metric: "~2× leads", metricLabel: "first 30 days", img: "proj-construction.webp", industry: "Construction", stars: 4.8 },
        { quote: "Our booking system went from phone-only to mostly online. We went from scrambling for appointments to running closer to 87% capacity most weeks. Big shift for us.", name: "Dr. Aline Côté", role: "Founder, Physio Optimal", metric: "87% capacity", metricLabel: "avg since launch", img: "proj-medical.webp", industry: "Healthcare", stars: 4.9 },
        { quote: "NT Web UX built our online presence from scratch. We're taking reservations and takeout orders around the clock now — revenue is up roughly 38% since we launched.", name: "Marie-Claire Joseph", role: "Owner, Saveurs d'Haïti MTL", metric: "+38% revenue", metricLabel: "since launch", img: "proj-restaurant.webp", industry: "Restaurant", stars: 4.0 },
        { quote: "We went from zero online presence to consistently fully booked in about 7 weeks. There were some growing pains early on, but the ROI has been real. Would recommend.", name: "Karine Beaumont", role: "CEO, Beaumont Wellness Clinic", metric: "7 weeks", metricLabel: "to fully booked", img: "proj-wellness.webp", industry: "Wellness", stars: 4.5 },
        { quote: "They built our SaaS dashboard from scratch and it looks polished. Clients notice the design quality. A few revision rounds but they got it right in the end.", name: "Alexis Fontaine", role: "Co-Founder, Flux Analytics", metric: "4.9★", metricLabel: "avg client rating", img: "proj-saas.webp", industry: "SaaS", stars: 5.0 },
        { quote: "The bilingual site they built helped us reach both markets properly. Organic traffic climbed around 61% over three months — better than I expected.", name: "Marc-André Ouellet", role: "Owner, Bâtisseurs Nordiques Inc.", metric: "+61% traffic", metricLabel: "organic, 3 months", img: "proj-construction2.webp", industry: "Construction", stars: 4.7 }
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
      name: "Silas 2.5",
      subName: "NT Digital Group",
      status: "Online · Instant replies",
      welcome: "Welcome to NT Digital Group. I am Silas 2.5. Are you here to Scale a Foundation or Automate your Revenue?",
      placeholder: "Write a message…",
      scaleChip: "Scale a Foundation",
      automateChip: "Automate Revenue",
      rules: {
        price:    "Our Website Foundations start at $997, and our AI OS starts at $297/month. Would you like to see the pricing table?",
        ai:       "We specialize in AI Text-Back and Auto-Booking systems that recover lost revenue. You can calculate your potential ROI using our Audit tool on this page.",
        website:  "We build high-performance, bilingual sites with a Silicon Valley aesthetic. Check our showreel in the Foundations section above.",
        hello:    "I am Silas 2.5, the NT Digital assistant. I can help you navigate our services or book a technical consultation with our team.",
        scale:    "Website Foundations start with Website Design, eCommerce, and CMS — all built with a Silicon Valley aesthetic and delivered in 72 hours.",
        automate: "Our AI OS includes Text-Back automation, auto-booking, and review management — starting at $297/month. Use the ROI Audit above to see your numbers.",
        global:   "We operate a borderless agency model with hubs in Montreal and Japan. This allows us to offer 24/7 technical architecture and bilingual (FR/EN) solutions that bridge the gap between markets.",
        quality:  "We don't use generic templates. Every Website Foundation we build is bespoke, using high-performance frameworks like Next.js to ensure Silicon Valley-level speed and security.",
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
          web: "Website Foundations (Project)",
          ai:  "Enterprise AI (Monthly SaaS)"
        },
        webPlans: [
          {
            name: "Starter", price: "997", cycle: "One-time project fee", delivery: "Typically delivered in 2–3 business days",
            features: ["5-page responsive website", "Custom design", "Basic SEO", "Contact form", "Includes 2 revision rounds"],
            cta: "Start Project", featured: false
          },
          {
            name: "Growth", price: "2,497", cycle: "One-time project fee", delivery: "Typically delivered in 4–6 business days",
            badge: "Most Popular",
            features: ["Up to 10 pages", "CMS integration", "E-commerce ready", "Advanced SEO"],
            cta: "Start Project", featured: true
          },
          {
            name: "Enterprise", price: "Custom", cycle: "Tailored scope", delivery: "Timeline scoped per project",
            features: ["Unlimited pages", "Custom web apps", "Dedicated project manager", "SLA & priority support"],
            cta: "Let's Talk", featured: false, isCustom: true
          }
        ],
        aiPlans: [
          {
            name: "Starter", price: "297", cycle: "/ month",
            note: "No contracts. Cancel anytime.",
            features: [
              "CRM & contact management",
              "AI web chat widget",
              "Missed-call text-back (SMS)",
              "Lead capture forms",
              "Email support",
              "1 pipeline",
              "Up to 500 contacts",
              "Mobile app access"
            ],
            cta: "Get Started", featured: false
          },
          {
            name: "Professional", price: "497", cycle: "/ month",
            badge: "Most Popular",
            note: "Most popular for growing service businesses.",
            features: [
              "Everything in Starter",
              "Full AI text & email automation",
              "Auto-booking & calendar integration",
              "Google review request engine",
              "2-way SMS & email conversations",
              "Social media DM integration (Facebook, Instagram)",
              "Unlimited pipelines",
              "Up to 2,500 contacts",
              "Reputation dashboard",
              "Priority support"
            ],
            cta: "Claim Beta Spot", featured: true
          },
          {
            name: "Full Scope", price: "899", cycle: "/ month",
            note: "Built for operators scaling across multiple locations.",
            features: [
              "Everything in Professional",
              "Custom AI voice agent (inbound calls)",
              "WhatsApp automation",
              "Multi-location or multi-tenant setup",
              "Advanced reporting & analytics dashboard",
              "Custom onboarding & dedicated setup call",
              "AI content generation (emails, SMS, social posts)",
              "Unlimited contacts",
              "White-glove support with monthly strategy call",
              "API access & custom integrations"
            ],
            cta: "Let's Talk", featured: false
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
        aiDesc: "Real SaaS products and AI integrations we've shipped — from multi-tenant platforms to automated revenue engines.",
        aiItems: [
          { tag: "SaaS Platform", title: "FieldOps Pro", desc: "Multi-tenant field service management SaaS with AI scheduling, real-time GPS tracking, and automated invoicing.", large: true },
          { tag: "AI Integration", title: "Silas AI Assistant", desc: "Custom GPT-powered chat agent with CRM sync, multilingual support, and context-aware lead qualification.", large: false },
          { tag: "Automation Suite", title: "LeadFlow CRM Engine", desc: "End-to-end lead nurturing: SMS/email sequences, auto-booking, Google review funnel, and reputation dashboard.", large: false }
        ],
        ctaText: "Have a project in mind?",
        ctaBtn: "Let's Talk →"
      }
    }
  },
  fr: {
    nav: { services: "Services", process: "Processus", whyUs: "Pourquoi Nous", contact: "Contact", quote: "Obtenir un audit gratuit" },
    hero: {
      eyebrow: "Studio Web Design",
      h1_1: "VOTRE", h1_2: "ENTREPRISE", h1_3: "EN LIGNE.", h1_4: "BIEN FAIT.",
      sub: "On construit votre site web bilingue sur mesure et on automatise votre acquisition de clients. La plupart de nos sites sont en ligne en 3 jours. Les projets complexes prennent un peu plus — jamais des mois.",
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
        { quote: "Ils ont complètement repensé notre présence numérique. Nos demandes ont quasi doublé le premier mois et le site était en ligne en moins de 72 heures. Honnêtement surpris par la rapidité.", name: "Jean-Michel Tremblay", role: "Propriétaire, Tremblay Excavation Inc.", metric: "~2× clients", metricLabel: "premiers 30 jours", img: "proj-construction.webp", industry: "Construction", stars: 4.8 },
        { quote: "Notre système de réservation est passé du téléphone au majoritairement en ligne. On tourne autour de 87% de capacité la plupart des semaines. Un vrai changement pour la clinique.", name: "Dre. Aline Côté", role: "Fondatrice, Physio Optimal", metric: "87% capacité", metricLabel: "moy. depuis lancement", img: "proj-medical.webp", industry: "Santé", stars: 4.9 },
        { quote: "NT Web UX a créé notre présence en ligne de zéro. On prend des réservations et commandes en continu maintenant — les revenus ont augmenté d'environ 38% depuis le lancement.", name: "Marie-Claire Joseph", role: "Propriétaire, Saveurs d'Haïti MTL", metric: "+38% revenus", metricLabel: "depuis le lancement", img: "proj-restaurant.webp", industry: "Restaurant", stars: 4.0 },
        { quote: "On est passé de zéro présence en ligne à régulièrement complet en environ 7 semaines. Quelques ajustements au départ, mais le retour sur investissement est bien réel. Je recommande.", name: "Karine Beaumont", role: "PDG, Clinique Beaumont Santé", metric: "7 semaines", metricLabel: "pour complet", img: "proj-wellness.webp", industry: "Bien-être", stars: 4.5 },
        { quote: "Ils ont construit notre tableau de bord SaaS de zéro et le résultat est soigné. Nos clients remarquent la qualité du design. Quelques allers-retours, mais ils ont livré.", name: "Alexis Fontaine", role: "Co-Fondateur, Flux Analytics", metric: "4.9★", metricLabel: "satisfaction client", img: "proj-saas.webp", industry: "SaaS", stars: 5.0 },
        { quote: "Le site bilingue qu'ils ont construit nous a vraiment aidés à atteindre les deux marchés. Notre trafic organique a grimpé d'environ 61% en trois mois — mieux que prévu.", name: "Marc-André Ouellet", role: "Propriétaire, Bâtisseurs Nordiques Inc.", metric: "+61% trafic", metricLabel: "organique, 3 mois", img: "proj-construction2.webp", industry: "Construction", stars: 4.7 }
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
      name: "Silas 2.5",
      subName: "NT Digital Group",
      status: "En ligne · Réponses instantanées",
      welcome: "Bienvenue chez NT Digital Group. Je suis Silas 2.5. Êtes-vous ici pour Construire des Fondations ou Automatiser vos Revenus ?",
      placeholder: "Écrivez votre message…",
      scaleChip: "Construire des Fondations",
      automateChip: "Automatiser mes Revenus",
      rules: {
        price:    "Nos Fondations Web débutent à 997 $, et notre IA OS commence à 297 $/mois. Souhaitez-vous voir le tableau des tarifs ?",
        ai:       "Nous sommes spécialisés dans les systèmes IA Text-Back et de réservation automatique qui récupèrent les revenus perdus. Calculez votre ROI potentiel avec l'outil d'audit sur cette page.",
        website:  "Nous créons des sites haute performance et bilingues avec une esthétique Silicon Valley. Consultez notre showreel dans la section Fondations ci-dessus.",
        hello:    "Je suis Silas 2.5, l'assistant NT Digital. Je peux vous aider à naviguer dans nos services ou à réserver une consultation technique.",
        scale:    "Les Fondations Web incluent le design web, l'e-commerce et le CMS — livrés en 72h avec une esthétique Silicon Valley.",
        automate: "Notre IA OS inclut l'automatisation Text-Back, la réservation automatique et la gestion des avis — à partir de 297 $/mois. Utilisez l'Audit ROI ci-dessus.",
        global:   "Nous opérons un modèle d'agence sans frontières avec des bureaux à Montréal et au Japon. Cela nous permet d'offrir une architecture technique 24h/24 et des solutions bilingues (FR/EN) qui créent des ponts entre les marchés.",
        quality:  "Nous n'utilisons pas de templates génériques. Chaque Fondation Web est sur mesure, construite avec des frameworks haute performance comme Next.js pour garantir vitesse et sécurité de niveau Silicon Valley.",
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
          web: "Fondations Web (Projet)",
          ai:  "IA Entreprise (SaaS Mensuel)"
        },
        webPlans: [
          {
            name: "Starter", price: "997", cycle: "Tarif unique du projet", delivery: "Livré en 2–3 jours ouvrables en moyenne",
            features: ["Site 5 pages responsive", "Design personnalisé", "SEO de base", "Formulaire de contact", "Inclut 2 rondes de révision"],
            cta: "Démarrer le Projet", featured: false
          },
          {
            name: "Growth", price: "2 497", cycle: "Tarif unique du projet", delivery: "Livré en 4–6 jours ouvrables en moyenne",
            badge: "Le plus populaire",
            features: ["Jusqu'à 10 pages", "Intégration CMS", "Prêt pour e-commerce", "SEO avancé"],
            cta: "Démarrer le Projet", featured: true
          },
          {
            name: "Enterprise", price: "Sur mesure", cycle: "Portée sur mesure", delivery: "Délai établi selon la portée du projet",
            features: ["Pages illimitées", "Applications web sur mesure", "Chef de projet dédié", "SLA & support prioritaire"],
            cta: "Réserver un appel", featured: false, isCustom: true
          }
        ],
        aiPlans: [
          {
            name: "Starter", price: "297", cycle: "/ mois",
            note: "Sans engagement. Annulez en tout temps.",
            features: [
              "CRM & gestion des contacts",
              "Widget de chat web IA",
              "Texto de rappel automatique (SMS)",
              "Formulaires de capture de leads",
              "Support par email",
              "1 pipeline",
              "Jusqu'à 500 contacts",
              "Accès application mobile"
            ],
            cta: "Commencer", featured: false
          },
          {
            name: "Professional", price: "497", cycle: "/ mois",
            badge: "Le plus populaire",
            note: "Le plus populaire pour les entreprises en croissance.",
            features: [
              "Tout ce qui est dans Starter",
              "Automatisation IA complète (texto & email)",
              "Réservation auto & intégration calendrier",
              "Moteur de demandes d'avis Google",
              "Conversations SMS & email bidirectionnelles",
              "Intégration DM réseaux sociaux (Facebook, Instagram)",
              "Pipelines illimités",
              "Jusqu'à 2 500 contacts",
              "Tableau de bord réputation",
              "Support prioritaire"
            ],
            cta: "Réclamer ma place bêta", featured: true
          },
          {
            name: "Full Scope", price: "899", cycle: "/ mois",
            note: "Conçu pour les opérateurs qui évoluent sur plusieurs sites.",
            features: [
              "Tout ce qui est dans Professional",
              "Agent vocal IA sur mesure (appels entrants)",
              "Automatisation WhatsApp",
              "Configuration multi-sites ou multi-tenant",
              "Tableau de bord analytique avancé",
              "Intégration personnalisée & appel de démarrage dédié",
              "Génération de contenu IA (emails, SMS, publications)",
              "Contacts illimités",
              "Support blanc avec appel stratégique mensuel",
              "Accès API & intégrations sur mesure"
            ],
            cta: "Réserver un appel", featured: false
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
        aiDesc: "De vrais produits SaaS et intégrations IA qu'on a livrés — de plateformes multi-tenant à des moteurs de revenus automatisés.",
        aiItems: [
          { tag: "Plateforme SaaS", title: "FieldOps Pro", desc: "SaaS de gestion de terrain multi-tenant avec planification IA, suivi GPS en temps réel et facturation automatisée.", large: true },
          { tag: "Intégration IA", title: "Silas Assistant IA", desc: "Agent de chat propulsé par GPT avec synchronisation CRM, support multilingue et qualification de leads contextuelle.", large: false },
          { tag: "Suite d'automatisation", title: "Moteur CRM LeadFlow", desc: "Gestion complète des leads : séquences SMS/email, réservation automatique, tunnel d'avis Google et tableau de bord réputation.", large: false }
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
