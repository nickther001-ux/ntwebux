export interface IndustryPage {
  slug: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  services: { title: string; desc: string }[];
  badge: string;
  accent: string;
}

export interface LocationPage {
  slug: string;
  city: string;
  province: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  neighborhoods: string[];
  badge: string;
  accent: string;
}

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    slug: 'saas-development',
    badge: 'SaaS & Software',
    accent: '#06b6d4',
    metaTitle: 'SaaS Web Design & Development — NT Web UX',
    metaDesc: 'We design high-converting SaaS websites and web apps that turn visitors into paying subscribers. Clean UI, fast onboarding flows, and dashboard UX.',
    h1: 'SaaS Web Design That Converts Visitors Into Subscribers',
    intro: 'Your SaaS product is powerful — your website should be too. We build sleek, conversion-optimised SaaS landing pages and web apps that communicate value fast, reduce churn, and accelerate your MRR growth.',
    services: [
      { title: 'SaaS Landing Pages', desc: 'High-converting pages that explain your product clearly and drive sign-ups.' },
      { title: 'Onboarding Flow UX', desc: 'Frictionless user flows that get new customers to their "aha moment" fast.' },
      { title: 'Dashboard & App UI', desc: 'Clean, intuitive interfaces your users actually enjoy working with daily.' },
      { title: 'Pricing Page Optimisation', desc: 'Strategic pricing page design that reduces drop-off and increases plan upgrades.' },
      { title: 'SEO for SaaS', desc: 'Technical SEO and content strategy that compounds organic growth month over month.' },
      { title: 'CRO Audits', desc: 'Conversion rate audits that identify and fix leaks in your acquisition funnel.' },
    ],
  },
  {
    slug: 'ecommerce-websites',
    badge: 'E-Commerce',
    accent: '#ec4899',
    metaTitle: 'E-Commerce Website Design — NT Web UX',
    metaDesc: 'Custom Shopify and WooCommerce stores built to sell. We design e-commerce experiences that boost average order value and reduce cart abandonment.',
    h1: 'E-Commerce Websites Built to Sell More, Every Day',
    intro: 'A beautiful store is only half the battle. We build e-commerce experiences that guide shoppers from discovery to checkout with as little friction as possible — increasing your conversion rate and average order value.',
    services: [
      { title: 'Custom Shopify Design', desc: 'Bespoke Shopify themes tailored to your brand, not generic templates.' },
      { title: 'WooCommerce Stores', desc: 'Flexible WordPress e-commerce setups with complete control over your catalogue.' },
      { title: 'Product Page Optimisation', desc: 'Persuasive product pages with trust signals, reviews, and clear CTAs.' },
      { title: 'Cart & Checkout UX', desc: 'Streamlined checkout flows that minimise abandonment and maximise completions.' },
      { title: 'Mobile-First Design', desc: 'Over 70% of shoppers buy on mobile — we build for that audience first.' },
      { title: 'Email & Retention Setup', desc: 'Post-purchase flows and loyalty mechanics that bring customers back.' },
    ],
  },
  {
    slug: 'restaurant-websites',
    badge: 'Food & Hospitality',
    accent: '#f97316',
    metaTitle: 'Restaurant Website Design — NT Web UX',
    metaDesc: 'We design restaurant and hospitality websites that fill tables, take online orders, and showcase your menu. Mobile-optimised and SEO-ready.',
    h1: 'Restaurant Websites That Fill Tables and Drive Orders',
    intro: 'Your restaurant deserves a website as good as your food. We design beautiful, mobile-first restaurant sites that showcase your menu, accept online reservations, and show up when hungry locals search Google.',
    services: [
      { title: 'Menu Design & Display', desc: 'Visually stunning menus that make every dish look irresistible online.' },
      { title: 'Online Reservation System', desc: 'Seamless booking integrations with OpenTable, Resy, or a custom form.' },
      { title: 'Online Ordering Setup', desc: 'Commission-free online ordering that keeps revenue in your pocket.' },
      { title: 'Local SEO for Restaurants', desc: 'Rank #1 when locals search "best restaurant near me" in your area.' },
      { title: 'Google Business Optimisation', desc: 'Profile setup and management that drives map clicks and foot traffic.' },
      { title: 'Photography Direction', desc: 'Art direction for food photography that makes your site pop.' },
    ],
  },
  {
    slug: 'real-estate-websites',
    badge: 'Real Estate',
    accent: '#f59e0b',
    metaTitle: 'Real Estate Website Design — NT Web UX',
    metaDesc: 'Custom real estate agent and brokerage websites with MLS integration, lead capture, and local SEO. Stand out in a crowded market.',
    h1: 'Real Estate Websites That Generate Quality Leads on Autopilot',
    intro: 'In real estate, your digital presence is your first impression. We build professional real estate websites that capture leads, integrate with MLS listings, and rank in local searches so buyers and sellers find you first.',
    services: [
      { title: 'Agent & Brokerage Sites', desc: 'Professional sites that build credibility and showcase your listings portfolio.' },
      { title: 'MLS / IDX Integration', desc: 'Live property search that keeps buyers on your site, not the portals.' },
      { title: 'Lead Capture Systems', desc: 'Smart forms and CTAs that convert browsers into booked consultations.' },
      { title: 'Neighbourhood Pages', desc: 'Hyper-local landing pages that rank for "homes for sale in [area]" searches.' },
      { title: 'Virtual Tour Integration', desc: 'Embedded 3D tours and video walk-throughs that close deals remotely.' },
      { title: 'CRM Integration', desc: 'Automated lead routing to your CRM so no enquiry ever falls through.' },
    ],
  },
  {
    slug: 'healthcare-websites',
    badge: 'Healthcare & Medical',
    accent: '#14b8a6',
    metaTitle: 'Healthcare Website Design — NT Web UX',
    metaDesc: 'HIPAA-aware healthcare and medical clinic websites with online booking, patient portals, and local SEO. Trusted by clinics and practitioners.',
    h1: 'Healthcare Websites That Patients Trust and Google Ranks',
    intro: 'Patients research before they book. We design healthcare websites that convey trust, meet accessibility standards, and convert first-time visitors into long-term patients — with online booking built right in.',
    services: [
      { title: 'Medical Clinic Websites', desc: 'Professional, welcoming sites that build patient confidence before the first visit.' },
      { title: 'Online Appointment Booking', desc: 'Integrated scheduling that reduces front-desk calls and no-shows.' },
      { title: 'Provider Profile Pages', desc: 'Individual doctor and practitioner pages that personalise your practice.' },
      { title: 'Healthcare SEO', desc: 'Rank for condition-based and "near me" searches in your specialty.' },
      { title: 'Patient Education Content', desc: 'SEO-optimised blog and FAQ content that educates and attracts new patients.' },
      { title: 'Telehealth Integration', desc: 'Virtual consultation links and video appointment flows built into your site.' },
    ],
  },
  {
    slug: 'law-firm-websites',
    badge: 'Legal Services',
    accent: '#8b5cf6',
    metaTitle: 'Law Firm Website Design — NT Web UX',
    metaDesc: 'Professional law firm and attorney websites with strong trust signals, practice area pages, and local SEO. Generate more qualified client enquiries.',
    h1: 'Law Firm Websites That Build Authority and Win Clients',
    intro: 'Potential clients judge your firm before they ever call. We build authoritative law firm websites with strong trust signals, clear practice area pages, and local SEO that puts you at the top of search results when it matters most.',
    services: [
      { title: 'Practice Area Pages', desc: 'Dedicated pages for each specialty that rank for high-intent legal queries.' },
      { title: 'Attorney Bio Pages', desc: 'Compelling professional profiles that establish credibility and approachability.' },
      { title: 'Legal SEO Strategy', desc: 'Content and keyword strategy targeting the exact searches your clients make.' },
      { title: 'Client Intake Forms', desc: 'Secure, streamlined intake forms that qualify leads and save admin time.' },
      { title: 'Case Results Showcase', desc: 'Strategic display of results and testimonials that convert sceptical visitors.' },
      { title: 'Local Citation Building', desc: 'Directory and legal portal listings that reinforce your local authority.' },
    ],
  },
  {
    slug: 'construction-websites',
    badge: 'Construction & Trades',
    accent: '#84cc16',
    metaTitle: 'Construction Company Website Design — NT Web UX',
    metaDesc: 'Websites for contractors, builders, and construction companies that generate project enquiries. Portfolio showcases, local SEO, and lead capture built-in.',
    h1: 'Construction Websites That Generate Project Enquiries',
    intro: 'Word-of-mouth is great, but your next big project is searching Google right now. We build construction and contractor websites that showcase your work, establish trust, and rank locally so clients find you before the competition.',
    services: [
      { title: 'Project Portfolio Showcase', desc: 'Before/after galleries and project case studies that prove your craftsmanship.' },
      { title: 'Service Area Pages', desc: 'Location-specific pages that rank when homeowners search in your service area.' },
      { title: 'Quote Request System', desc: 'Simple estimate request forms that pre-qualify leads before the first call.' },
      { title: 'Local SEO for Contractors', desc: 'Google Business profile optimisation and local citation building.' },
      { title: 'Licence & Insurance Display', desc: 'Trust badges and credentials prominently displayed to convert hesitant leads.' },
      { title: 'Review Generation System', desc: 'Automated post-project review requests that build your online reputation.' },
    ],
  },
  {
    slug: 'fitness-studio-websites',
    badge: 'Health & Fitness',
    accent: '#10b981',
    metaTitle: 'Fitness Studio Website Design — NT Web UX',
    metaDesc: 'Gym, yoga studio, and personal trainer websites with class scheduling, membership sign-ups, and local SEO. Grow your client base online.',
    h1: 'Fitness Studio Websites That Turn Browsers Into Members',
    intro: 'Your community is your product. We design fitness studio, gym, and personal trainer websites that communicate your culture, make booking a class effortless, and keep members engaged long after their first visit.',
    services: [
      { title: 'Class Schedule Integration', desc: 'Live timetables and booking widgets synced with Mindbody, Acuity, or Glofox.' },
      { title: 'Membership & Pricing Pages', desc: 'Strategic pricing pages designed to convert free trial sign-ups into paying members.' },
      { title: 'Trainer Profiles', desc: 'Individual coach pages that showcase expertise and build personal connections.' },
      { title: 'Fitness Studio SEO', desc: 'Rank for "gym near me" and niche class searches in your neighbourhood.' },
      { title: 'Challenge & Programme Pages', desc: 'High-energy landing pages for challenges, transformations, and special programmes.' },
      { title: 'Mobile App Integration', desc: 'Deep links and handoffs to your branded fitness app for seamless member UX.' },
    ],
  },
];

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: 'toronto-web-design',
    city: 'Toronto',
    province: 'Ontario',
    badge: 'Toronto, ON',
    accent: '#3b82f6',
    metaTitle: 'Web Design Toronto — NT Web UX',
    metaDesc: 'Professional web design and development agency serving Toronto businesses. Custom websites, e-commerce, and SEO. Fast delivery, no templates.',
    h1: 'Toronto Web Design Agency — Custom Sites That Convert',
    intro: "Toronto's market is competitive. Your website can't just look good — it has to rank, convert, and represent your brand at the highest level. NT Web UX designs and builds custom websites for Toronto businesses ready to dominate their market.",
    neighborhoods: ['Downtown Toronto', 'North York', 'Scarborough', 'Etobicoke', 'Mississauga', 'Brampton', 'Markham', 'Richmond Hill'],
  },
  {
    slug: 'montreal-web-design',
    city: 'Montréal',
    province: 'Québec',
    badge: 'Montréal, QC',
    accent: '#6366f1',
    metaTitle: 'Web Design Montréal — NT Web UX | Sites bilingues EN/FR',
    metaDesc: 'Agence web design Montréal. Sites web bilingues EN/FR, e-commerce et SEO pour entreprises montréalaises. Livraison rapide, 0 gabarit.',
    h1: 'Agence Web Design Montréal — Sites Bilingues Qui Convertissent',
    intro: "Montréal est un marché dynamique qui exige une présence numérique irréprochable en français ET en anglais. NT Web UX conçoit des sites web bilingues sur mesure pour les entreprises montréalaises prêtes à se démarquer.",
    neighborhoods: ['Plateau-Mont-Royal', 'Mile End', 'Griffintown', 'Rosemont', 'Saint-Laurent', 'Laval', 'Longueuil', 'Brossard'],
  },
  {
    slug: 'vancouver-web-design',
    city: 'Vancouver',
    province: 'British Columbia',
    badge: 'Vancouver, BC',
    accent: '#10b981',
    metaTitle: 'Web Design Vancouver — NT Web UX',
    metaDesc: 'Custom web design for Vancouver businesses. Modern, fast, SEO-optimised websites built to convert. Serving Greater Vancouver and the Lower Mainland.',
    h1: 'Vancouver Web Design — Modern Sites for a Modern City',
    intro: "Vancouver's fast-paced, tech-savvy market demands websites that are fast, beautiful, and built to convert. Whether you're in Gastown or Richmond, NT Web UX delivers custom digital experiences that make your business stand out.",
    neighborhoods: ['Downtown Vancouver', 'Gastown', 'Kitsilano', 'Mount Pleasant', 'Burnaby', 'Richmond', 'Surrey', 'North Vancouver'],
  },
  {
    slug: 'calgary-web-design',
    city: 'Calgary',
    province: 'Alberta',
    badge: 'Calgary, AB',
    accent: '#f59e0b',
    metaTitle: 'Web Design Calgary — NT Web UX',
    metaDesc: 'Professional web design for Calgary businesses. Custom websites, SEO, and e-commerce solutions. Serving Calgary and surrounding areas.',
    h1: 'Calgary Web Design — Built for Alberta Businesses That Mean Business',
    intro: "Calgary's energy sector, real estate market, and growing tech scene all need websites that work as hard as they do. NT Web UX builds custom, high-performance websites for Calgary businesses ready to grow their digital footprint.",
    neighborhoods: ['Downtown Calgary', 'Beltline', 'Inglewood', 'Mission', 'Airdrie', 'Cochrane', 'Okotoks', 'Chestermere'],
  },
  {
    slug: 'ottawa-web-design',
    city: 'Ottawa',
    province: 'Ontario',
    badge: 'Ottawa, ON',
    accent: '#f43f5e',
    metaTitle: 'Web Design Ottawa — NT Web UX',
    metaDesc: 'Web design and development for Ottawa businesses and government contractors. Bilingual EN/FR websites, SEO, and custom web solutions.',
    h1: 'Ottawa Web Design — Professional Bilingual Websites for the Capital',
    intro: "Ottawa's bilingual, government-adjacent business environment demands websites that are professional, accessible, and available in both official languages. NT Web UX specialises in exactly that — custom sites built for the Ottawa market.",
    neighborhoods: ['ByWard Market', 'Centretown', 'Hintonburg', 'Glebe', 'Gatineau', 'Kanata', 'Orleans', 'Barrhaven'],
  },
  {
    slug: 'quebec-city-web-design',
    city: 'Québec City',
    province: 'Québec',
    badge: 'Québec City, QC',
    accent: '#d946ef',
    metaTitle: 'Web Design Québec City — NT Web UX',
    metaDesc: 'Agence web design à Québec. Sites web professionnels en français, e-commerce et référencement SEO pour les entreprises de la région de Québec.',
    h1: 'Web Design Québec City — Sites Web Professionnels en Français',
    intro: "La région de Québec regorge d'entreprises locales qui méritent une présence numérique à la hauteur de leur expertise. NT Web UX crée des sites web sur mesure, en français, qui reflètent l'authenticité et le professionnalisme des entreprises québécoises.",
    neighborhoods: ['Vieux-Québec', 'Sainte-Foy', 'Limoilou', 'Beauport', 'Lévis', 'Charlesbourg', 'Sillery', 'Cap-Rouge'],
  },
  {
    slug: 'edmonton-web-design',
    city: 'Edmonton',
    province: 'Alberta',
    badge: 'Edmonton, AB',
    accent: '#06b6d4',
    metaTitle: 'Web Design Edmonton — NT Web UX',
    metaDesc: 'Custom web design for Edmonton businesses. Fast, modern, SEO-optimised websites. Serving Edmonton, St. Albert, Sherwood Park, and surrounding areas.',
    h1: 'Edmonton Web Design — Fast Sites for a City That Moves Fast',
    intro: "Edmonton's booming economy and diverse business landscape deserve websites that keep up. From Oil Sands contractors to Whyte Ave restaurants, NT Web UX builds custom digital experiences for every corner of the Edmonton market.",
    neighborhoods: ['Downtown Edmonton', 'Whyte Ave', 'Glenora', 'Oliver', 'St. Albert', 'Sherwood Park', 'Leduc', 'Spruce Grove'],
  },
  {
    slug: 'winnipeg-web-design',
    city: 'Winnipeg',
    province: 'Manitoba',
    badge: 'Winnipeg, MB',
    accent: '#84cc16',
    metaTitle: 'Web Design Winnipeg — NT Web UX',
    metaDesc: 'Professional web design for Winnipeg businesses. Custom websites, local SEO, and e-commerce. Serving all of Winnipeg and surrounding communities.',
    h1: 'Winnipeg Web Design — Local Expertise, World-Class Results',
    intro: "Winnipeg's tight-knit business community rewards trust and expertise. NT Web UX builds custom websites for Winnipeg businesses that communicate professionalism, show up in local search, and convert visitors into customers.",
    neighborhoods: ['The Exchange District', 'Osborne Village', 'St. Boniface', 'River Heights', 'Transcona', 'St. James', 'Charleswood', 'East Kildonan'],
  },
];

export function getIndustryPage(slug: string): IndustryPage | undefined {
  return INDUSTRY_PAGES.find(p => p.slug === slug);
}

export function getLocationPage(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find(p => p.slug === slug);
}
