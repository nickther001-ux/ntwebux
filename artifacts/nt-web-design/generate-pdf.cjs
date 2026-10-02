python3 << 'PYEOF'
content = '''const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  margin: 0,
  autoFirstPage: false,
  bufferPages: true
});

const OUTPUT = '/home/runner/workspace/artifacts/nt-web-design/public/NT_WebUX_2026_Masterclass_Playbook.pdf';
const out = fs.createWriteStream(OUTPUT);
doc.pipe(out);

const B = '#2563eb';
const D = '#0a1628';
const W = '#ffffff';
const G = '#94a3b8';
const L = '#dbeafe';
const S = '#f0f7ff';

const M = 50;
const PW = 595;
const PH = 842;
const CW = PW - M * 2;

function np() { doc.addPage({ size: 'A4', margin: 0 }); }

function hdr(title) {
  doc.rect(0, 0, PW, 5).fill(B);
  doc.fill(B).fontSize(8).font('Helvetica-Bold')
    .text('NT DIGITAL GROUP  |  GUIDE PRATIQUE 2026', M, 14, { characterSpacing: 1.5 });
  doc.fill(D).fontSize(20).font('Helvetica-Bold')
    .text(title, M, 30, { width: CW });
  doc.rect(M, 68, CW, 1).fill(B);
}

function ftr(n, total) {
  doc.rect(0, PH - 22, PW, 1).fill(B);
  doc.fill(G).fontSize(8).font('Helvetica')
    .text('ntwebux.com  |  info@ntwebux.com  |  438-806-7640', M, PH - 16)
    .text('Page ' + n + ' / ' + total, PW - 70, PH - 16);
}

function bul(text, y, indent) {
  const x = indent || M;
  doc.rect(x, y + 5, 6, 6).fill(B);
  doc.fill(D).fontSize(10).font('Helvetica')
    .text(text, x + 14, y, { width: CW - (x - M) - 14, lineGap: 2 });
  const h = doc.heightOfString(text, { width: CW - (x - M) - 14 });
  return y + Math.max(22, h + 8);
}

function sub(text, y) {
  doc.fill(B).fontSize(12).font('Helvetica-Bold').text(text, M, y);
  return y + 22;
}

function body(text, y, opts) {
  const o = Object.assign({ width: CW, lineGap: 3 }, opts || {});
  doc.fill(D).fontSize(10).font('Helvetica').text(text, M, y, o);
  const h = doc.heightOfString(text, o);
  return y + h + 10;
}

function box(text, y, h, bg, border) {
  doc.rect(M, y, CW, h).fill(bg || S).stroke(border || B);
  doc.fill(D).fontSize(10).font('Helvetica')
    .text(text, M + 12, y + 10, { width: CW - 24, lineGap: 3 });
  return y + h + 12;
}

function stat3(v1, l1, v2, l2, v3, l3, y) {
  const w = CW / 3;
  [[v1, l1, 0], [v2, l2, 1], [v3, l3, 2]].forEach(([v, l, i]) => {
    const x = M + i * w;
    doc.rect(x, y, w - 6, 70).fill(i === 1 ? B : S).stroke(B);
    doc.fill(i === 1 ? W : B).fontSize(22).font('Helvetica-Bold')
      .text(v, x + 8, y + 8, { width: w - 22, align: 'center' });
    doc.fill(i === 1 ? L : D).fontSize(9).font('Helvetica')
      .text(l, x + 8, y + 40, { width: w - 22, align: 'center' });
  });
  return y + 82;
}

const TOTAL = 20;

// ══ PAGE 1 — COUVERTURE ══════════════════════════════════
np();
doc.rect(0, 0, PW, PH).fill(D);
doc.rect(0, 0, PW, 5).fill(B);
doc.rect(0, PH - 5, PW, 5).fill(B);
doc.rect(0, 0, 5, PH).fill(B);
doc.rect(PW - 5, 0, 5, PH).fill(B);
doc.fill(B).fontSize(9).font('Helvetica-Bold')
  .text('GUIDE GRATUIT 2026  —  EDITION QUEBECOISE', M + 5, 65, { characterSpacing: 2 });
doc.fill(W).fontSize(42).font('Helvetica-Bold')
  .text('Guide Pratique', M + 5, 110)
  .text("d'Automatisation", M + 5, 158);
doc.fill(B).fontSize(42).font('Helvetica-Bold')
  .text('des Entreprises', M + 5, 206)
  .text('Locales 2026', M + 5, 254);
doc.rect(M + 5, 308, 300, 2).fill(B);
doc.fill(W).fontSize(13).font('Helvetica')
  .text("Comment reduire vos frais d'exploitation de 40%,", M + 5, 322, { width: 480, lineGap: 6 })
  .text("capturer des leads 24h/24 et dominer votre marche", M + 5, 344, { width: 480, lineGap: 6 })
  .text("local avec un site web bilingue haute performance.", M + 5, 366, { width: 480 });
doc.rect(M + 5, 410, 160, 50).fill(B);
doc.fill(W).fontSize(11).font('Helvetica-Bold').text('POUR QUI EST CE GUIDE ?', M + 15, 422);
doc.fill(W).fontSize(9).font('Helvetica')
  .text('PME et entrepreneurs quebecois', M + 15, 438);
doc.rect(M + 175, 410, 160, 50).fill('#1e3a6e');
doc.fill(W).fontSize(11).font('Helvetica-Bold').text('TEMPS DE LECTURE', M + 185, 422);
doc.fill(W).fontSize(9).font('Helvetica').text('20 a 25 minutes', M + 185, 438);
doc.rect(M + 350, 410, 140, 50).fill('#1e3a6e');
doc.fill(W).fontSize(11).font('Helvetica-Bold').text('PAGES', M + 360, 422);
doc.fill(W).fontSize(9).font('Helvetica').text('20 pages illustrees', M + 360, 438);
doc.fill(B).fontSize(16).font('Helvetica-Bold').text('NT Digital Group', M + 5, 500);
doc.fill(G).fontSize(11).font('Helvetica')
  .text('Agence Web & Automatisation IA | Montreal, Quebec', M + 5, 522)
  .text('ntwebux.com  |  438-806-7640', M + 5, 540);
doc.fill(G).fontSize(8).font('Helvetica')
  .text('2026 NT Digital Group Inc. — NEQ 2281300162 — Tous droits reserves', M + 5, PH - 30);
ftr(1, TOTAL);

// ══ PAGE 2 — TABLE DES MATIERES ══════════════════════════
np();
hdr('Table des matieres');
let y = 88;
const toc = [
  ['01', 'Pourquoi agir maintenant ? Le contexte quebecois', '3'],
  ['02', 'Les 5 erreurs fatales des PME quebecoises en ligne', '4'],
  ['03', 'Pilier 1 — Automatiser pour reduire vos frais de 40%', '5-6'],
  ['04', 'Pilier 2 — Capturer des leads IA 24h/24 et 7j/7', '7-8'],
  ['05', 'Pilier 3 — Site web bilingue a fort taux de conversion', '9-10'],
  ['06', 'La Loi 96 et votre site web : ce que vous risquez', '11'],
  ['07', 'Etude de cas — Ace Esthetique (Montreal)', '12'],
  ['08', 'Etude de cas — AudreyRH (Montreal)', '13'],
  ['09', 'Checklist complete : etes-vous pret a automatiser ?', '14'],
  ['10', 'Votre plan d\'action en 72 heures', '15'],
  ['11', 'Comparaison : Agence traditionnelle vs NT Digital', '16'],
  ['12', 'Tarifs & Forfaits 2026 — Retour sur investissement', '17'],
  ['13', 'FAQ — Les 10 questions les plus posees', '18-19'],
  ['14', 'Prochaines etapes & Comment nous joindre', '20'],
];
toc.forEach(([num, title, page], i) => {
  const bg = i % 2 === 0 ? S : W;
  doc.rect(M, y, CW, 32).fill(bg);
  doc.fill(B).fontSize(10).font('Helvetica-Bold').text(num, M + 8, y + 11);
  doc.fill(D).fontSize(10).font('Helvetica').text(title, M + 32, y + 11, { width: 380 });
  doc.fill(G).fontSize(9).font('Helvetica').text(page, M + CW - 30, y + 11);
  doc.rect(M, y + 32, CW, 0.5).fill(L);
  y += 33;
});
ftr(2, TOTAL);

// ══ PAGE 3 — CONTEXTE QUEBECOIS ══════════════════════════
np();
hdr('Pourquoi agir maintenant ? Le contexte quebecois');
y = 85;
y = body("Le Quebec traverse une transformation numerique acceleree. Selon le CEFRIO (Centre facilitant la recherche et l'innovation dans les organisations), 78% des consommateurs quebecois consultent Internet avant tout achat ou engagement de service. Pourtant, 62% des PME quebecoises n'ont pas de site web optimise ou fonctionnel.", y);
y = stat3('78%', 'Quebecois recherchent en ligne avant d\'acheter', '62%', 'PME sans site web optimise', '3x', 'Plus de leads avec un site bilingue', y);
y = sub('Le cout reel de l\'inaction', y);
y = body("Chaque mois sans presence numerique optimisee, votre entreprise perd des revenus que vous ne voyez meme pas. Un client potentiel qui ne vous trouve pas sur Google ne vous appellera jamais — il appellera votre concurrent.", y);
y = bul("Un plombier a Montreal perd en moyenne 8 500$ par mois en appels manques a cause d'un site non optimise", y);
y = bul("Un salon de beaute sans systeme de reservation en ligne perd 35% de sa clientele potentielle les soirs et fins de semaine", y);
y = bul("Une consultante RH qui repond aux demandes en 72h plutot qu'en 2h perd 60% de ses leads au profit de concurrents", y);
y = sub("Le mouvement 'Quebec Numerique' — une opportunite unique", y + 5);
y = body("Le gouvernement du Quebec a investi 570 millions $ dans la transformation numerique des PME entre 2022 et 2026. Les subventions ESSOR, PME en action, et le programme Acces au numerique offrent jusqu'a 50% de financement pour la mise en place de solutions numeriques. NT Digital Group vous aide a naviguer ces programmes.", y);
ftr(3, TOTAL);

// ══ PAGE 4 — 5 ERREURS FATALES ═══════════════════════════
np();
hdr('Les 5 erreurs fatales des PME quebecoises en ligne');
y = 85;
y = body("Apres avoir travaille avec des dizaines de PME quebecoises, nous avons identifie 5 erreurs recurrentes qui sabotent leur croissance numerique. Reconnaissez-vous l'une de ces situations ?", y);
const errors = [
  ['ERREUR 1', 'Site web unilingue anglais au Quebec', "La Loi 96 exige que les entreprises servent leurs clients en francais. Un site uniquement en anglais vous expose a des amendes de l'OQLF et fait fuir 40% de votre clientele locale. Solution : un site bilingue FR/EN avec bascule instantanee."],
  ['ERREUR 2', 'Absence de systeme de reservation en ligne', "67% des prises de rendez-vous se font maintenant en dehors des heures d'ouverture. Sans systeme de reservation 24h/24, vous perdez ces clients au profit de concurrents qui offrent cette facilite. Solution : integration d'un systeme de booking automatise."],
  ['ERREUR 3', 'Temps de reponse aux leads superieur a 1 heure', "Des etudes Harvard Business Review montrent que les entreprises qui repondent a un lead en moins de 5 minutes ont 21 fois plus de chances de le convertir. La plupart des PME repondent en 24-72h. Solution : chatbot IA + notifications SMS instantanees."],
  ['ERREUR 4', 'Absence de presence sur Google Maps et Google Business', "46% de toutes les recherches Google ont une intention locale. Si votre fiche Google Business n'est pas optimisee, vous etes invisible pour les clients qui cherchent vos services 'pres de moi'. Solution : optimisation complete de votre presence locale."],
  ['ERREUR 5', 'Site web non optimise pour mobile', "Au Quebec, 73% du trafic web provient d'appareils mobiles. Un site lent ou mal affiche sur telephone fait fuir 53% des visiteurs en moins de 3 secondes. Solution : design mobile-first avec temps de chargement inferieur a 2 secondes."],
];
errors.forEach(([num, title, desc]) => {
  if (y > 680) return;
  doc.rect(M, y, 8, 45).fill(B);
  doc.fill(B).fontSize(8).font('Helvetica-Bold').text(num, M + 12, y + 3, { width: 80 });
  doc.fill(D).fontSize(11).font('Helvetica-Bold').text(title, M + 12, y + 15, { width: CW - 20 });
  doc.fill(D).fontSize(9).font('Helvetica').text(desc, M + 12, y + 32, { width: CW - 20, lineGap: 2 });
  y += 80;
});
ftr(4, TOTAL);

// ══ PAGE 5 — PILIER 1 PARTIE A ═══════════════════════════
np();
hdr('Pilier 1 — Automatiser pour reduire vos frais de 40%');
y = 85;
doc.rect(M, y, CW, 35).fill(B);
doc.fill(W).fontSize(13).font('Helvetica-Bold')
  .text('OBJECTIF : Eliminer les taches repetitives et recuperer 15-20h par semaine', M + 12, y + 11, { width: CW - 24 });
y += 47;
y = body("La majorite des PME quebecoises depensent entre 30% et 50% de leur temps de travail sur des taches qui pourraient etre entierement automatisees : repondre aux memes questions par telephone, confirmer des rendez-vous manuellement, envoyer des factures, relancer des clients impayants, faire le suivi des leads.", y);
y = sub('Quelles taches automatiser en priorite ?', y + 5);
const tasks = [
  ['RESERVATION & AGENDA', [
    'Prise de rendez-vous en ligne 24h/24 sans intervention humaine (Calendly, Acuity, systeme sur mesure)',
    'Rappels automatiques par SMS 24h et 1h avant le rendez-vous — reduit les no-shows de 60 a 90%',
    'Confirmation automatique par courriel avec adresse, instructions et formulaires a remplir',
    'Synchronisation automatique avec Google Calendar, Outlook, iCal',
    'Gestion des annulations et reprogrammations sans intervention humaine',
  ]],
  ['COMMUNICATION CLIENT', [
    'Reponse automatique aux demandes de soumission dans les 60 secondes (SMS + courriel)',
    'Sequence de suivis automatiques pour les leads qui n\'ont pas converti (J+1, J+3, J+7)',
    "Envoi automatique de factures et rappels de paiement jusqu'a reglement",
    'Notification instantanee sur votre telephone a chaque nouveau lead entrant',
  ]],
];
tasks.forEach(([title, items]) => {
  if (y > 650) return;
  doc.fill(B).fontSize(11).font('Helvetica-Bold').text(title, M, y);
  y += 18;
  items.forEach(item => { if (y < 720) y = bul(item, y); });
  y += 5;
});
ftr(5, TOTAL);

// ══ PAGE 6 — PILIER 1 PARTIE B ═══════════════════════════
np();
hdr('Pilier 1 — Calcul du retour sur investissement');
y = 85;
y = sub("Exemple concret : Cabinet de consultation (Montreal)", y);
doc.rect(M, y, CW, 160).fill(S).stroke(B);
doc.fill(D).fontSize(10).font('Helvetica-Bold').text('AVANT L\'AUTOMATISATION', M + 12, y + 10);
const before = [
  '10 appels telephoniques/jour pour confirmer des RDV = 1.5h perdue',
  'Envoi manuel de 20 factures/mois = 3h perdue',
  'Suivi des impayes = 2h/semaine',
  '5 no-shows/semaine x 120$/RDV = 600$/semaine en revenu perdu',
  'Total : 27h/semaine en taches administratives repetitives',
];
let by = y + 28;
before.forEach(t => { doc.fill(D).fontSize(9).font('Helvetica').text('• ' + t, M + 12, by, { width: CW - 24 }); by += 18; });
y += 170;
doc.rect(M, y, CW, 160).fill('#eef4ff').stroke(B);
doc.fill(B).fontSize(10).font('Helvetica-Bold').text('APRES L\'AUTOMATISATION NT DIGITAL GROUP', M + 12, y + 10);
const after = [
  'Zero appel pour confirmer des RDV — systeme automatise = 0h',
  'Facturation automatique avec relance = 15 min/mois',
  'Suivi impayes automatique = 0h/semaine',
  'No-shows reduits a 1/semaine = economie de 480$/semaine',
  'Total recupere : 25h/semaine = 100h/mois que vous reinvestissez dans votre business',
];
let ay = y + 28;
after.forEach(t => { doc.fill(D).fontSize(9).font('Helvetica').text('• ' + t, M + 12, ay, { width: CW - 24 }); ay += 18; });
y += 170;
y = stat3('25h', 'Recuperees par semaine', '480$', 'Revenus sauvegardes/semaine', '3.2x', 'ROI moyen en 90 jours', y + 10);
y = sub('Les outils qu\'on integre pour vous', y);
const tools = [
  'Make (ex-Integromat) — Automatisation de workflows complexes entre vos applications',
  'Zapier — Connexion simple entre 5 000+ applications sans code',
  'GoHighLevel — CRM tout-en-un avec automatisation marketing integree',
  'Calendly / Acuity — Systeme de reservation professionnel integre a votre site',
  'Stripe / Square — Paiements automatises et facturation recurrente',
];
tools.forEach(t => { if (y < 760) y = bul(t, y); });
ftr(6, TOTAL);

// ══ PAGE 7 — PILIER 2 PARTIE A ═══════════════════════════
np();
hdr('Pilier 2 — Capturer des leads IA 24h/24 et 7j/7');
y = 85;
doc.rect(M, y, CW, 35).fill(B);
doc.fill(W).fontSize(12).font('Helvetica-Bold')
  .text('STATISTIQUE CLE : 78% des leads choisissent le premier fournisseur qui leur repond', M + 12, y + 12, { width: CW - 24 });
y += 47;
y = body("Vos concurrents dorment. Leur telephone ne repond pas apres 18h. Leurs formulaires de contact restent sans reponse pendant 48h. C'est votre avantage competitif : avec un systeme de capture IA, vous etes le premier a repondre — a 2h du matin si necessaire.", y);
y = sub("Comment fonctionne un systeme de capture IA ?", y + 5);
y = body("Un visiteur arrive sur votre site a 22h47 un vendredi soir. Il cherche un electricien d'urgence. Sans systeme automatise, vous perdez ce lead. Avec notre systeme :", y);
const flow = [
  ['1', 'Visiteur arrive sur le site', 'Le chatbot IA l\'accueille en francais ou en anglais selon sa preference'],
  ['2', 'Qualification automatique', 'Le chatbot pose 3-4 questions cles pour qualifier le besoin et l\'urgence'],
  ['3', 'Reponse instantanee', 'Le client recoit une reponse personnalisee avec prochaines etapes en moins de 30 secondes'],
  ['4', 'Notification SMS', 'Vous recevez un SMS avec le resume complet du lead : nom, besoin, urgence, coordonnees'],
  ['5', 'Suivi automatique', 'Si aucune action dans 2h, le systeme envoie un courriel de suivi au lead automatiquement'],
];
flow.forEach(([num, title, desc]) => {
  if (y > 680) return;
  doc.rect(M, y, 28, 28).fill(B);
  doc.fill(W).fontSize(14).font('Helvetica-Bold').text(num, M + 8, y + 7);
  doc.fill(D).fontSize(10).font('Helvetica-Bold').text(title, M + 38, y + 3, { width: CW - 46 });
  doc.fill(D).fontSize(9).font('Helvetica').text(desc, M + 38, y + 17, { width: CW - 46 });
  y += 40;
});
ftr(7, TOTAL);

// ══ PAGE 8 — PILIER 2 PARTIE B ═══════════════════════════
np();
hdr('Pilier 2 — Types de systemes de capture et resultats');
y = 85;
y = sub('Les 4 types de systemes de capture qu\'on deploie', y);
const systems = [
  ['CHATBOT IA BILINGUE', "Integre directement sur votre site, il repond aux questions frequentes, qualifie les visiteurs et prend des rendez-vous autonomement. Configure en 2-3 jours. Compatible avec votre site existant ou notre nouveau site. Taux de capture moyen : 23% des visiteurs (vs 2-3% pour un formulaire statique)."],
  ['FORMULAIRES INTELLIGENTS CONDITIONNELS', "Contrairement aux formulaires statiques, nos formulaires s'adaptent selon les reponses du visiteur. Un visiteur qui cherche un service urgent verra un champ 'disponibilite immediate' apparaitre. Taux de completion : 67% (vs 23% pour les formulaires classiques)."],
  ['PAGES D\'ATTERRISSAGE (LANDING PAGES) DEDIEES', "Chaque source de trafic (Google Ads, Facebook, Instagram, bouche-a-oreille) merite sa propre page d\'atterrissage. Nous creeons des pages ultra-ciblees avec un seul objectif : capturer le contact. Taux de conversion moyen : 12-18%."],
  ['POPUP DE SORTIE INTELLIGENTE', "Quand un visiteur s'apprete a quitter votre site sans avoir pris contact, une offre personnalisee apparait (consultation gratuite, rabais, guide, etc.). Recupere 15-22% des visiteurs qui partaient sans convertir."],
];
systems.forEach(([title, desc]) => {
  if (y > 650) return;
  doc.rect(M, y, 4, 60).fill(B);
  doc.fill(B).fontSize(10).font('Helvetica-Bold').text(title, M + 12, y + 5, { width: CW - 20 });
  doc.fill(D).fontSize(9).font('Helvetica').text(desc, M + 12, y + 22, { width: CW - 20, lineGap: 2 });
  y += 78;
});
y = stat3('23%', 'Taux de capture chatbot IA vs 2-3% formulaire statique', '21x', 'Plus de conversions si reponse en moins de 5 minutes', '67%', 'Taux de completion formulaires intelligents', y + 5);
ftr(8, TOTAL);

// ══ PAGE 9 — PILIER 3 PARTIE A ═══════════════════════════
np();
hdr('Pilier 3 — Site web bilingue a fort taux de conversion');
y = 85;
doc.rect(M, y, CW, 35).fill(B);
doc.fill(W).fontSize(12).font('Helvetica-Bold')
  .text('Au Quebec, un site uniquement en anglais perd 40% de son audience potentielle et risque des amendes OQLF', M + 12, y + 12, { width: CW - 24 });
y += 47;
y = sub("Qu'est-ce qu'un site a fort taux de conversion ?", y);
y = body("Un site web beau ne suffit pas. Un site a fort taux de conversion est concu d'abord pour transformer les visiteurs en clients, pas pour impressionner. Chaque element — titre, couleurs, disposition, appels a l'action — est strategiquement positionne pour guider le visiteur vers une seule action : vous contacter.", y);
y = sub('Les 8 elements indispensables d\'un site haute performance', y + 5);
const elements = [
  ['Proposition de valeur claire en 5 secondes', "Le visiteur doit comprendre en moins de 5 secondes ce que vous faites, pour qui, et pourquoi vous etes meilleur. La majorite des sites echouent ce test."],
  ['Vitesse de chargement inferieure a 2 secondes', "Google penalise les sites lents dans ses resultats de recherche. Un delai de 1 seconde supplementaire reduit les conversions de 7%. Nous optimisons chaque image, chaque ligne de code."],
  ['Design mobile-first responsive', "73% du trafic web quebecois vient du mobile. Votre site doit etre parfait sur iPhone et Android avant tout. Nous construisons mobile d'abord."],
  ['Preuves sociales et temoignages', "83% des consommateurs font confiance aux avis en ligne autant qu'aux recommandations personnelles. Vos temoignages clients doivent etre visibles immediatement."],
  ['Appels a l\'action (CTA) strategiques', "Un bouton 'Nous contacter' en bas de page ne suffit pas. Les CTA doivent apparaitre au bon moment, avec le bon message, tout au long de la navigation."],
  ['Formulaire de capture visible et simple', "Maximum 3-4 champs. Chaque champ supplementaire reduit le taux de completion de 11%. On garde seulement l'essentiel."],
  ['SEO local optimise pour Montreal', "Vos clients vous cherchent sur Google. Sans optimisation SEO locale, vous etes invisible. On optimise pour vos mots-cles cibles et votre zone de service."],
  ['Chat en direct ou chatbot visible', "Les visiteurs qui utilisent le chat convertissent a un taux 3 fois superieur. Un bouton de chat visible augmente les conversions de 40%."],
];
elements.forEach(([title, desc]) => {
  if (y > 660) return;
  doc.fill(B).fontSize(9).font('Helvetica-Bold').text(title.toUpperCase(), M, y, { width: CW });
  doc.fill(D).fontSize(9).font('Helvetica').text(desc, M, y + 14, { width: CW, lineGap: 2 });
  y += 44;
});
ftr(9, TOTAL);

// ══ PAGE 10 — PILIER 3 PARTIE B ══════════════════════════
np();
hdr('Pilier 3 — Architecture technique et performance');
y = 85;
y = sub('Stack technique que nous utilisons', y);
const stack = [
  ['FRONTEND', 'React, Next.js, Vite — Interfaces ultra-rapides, SEO-friendly, mobile-first par defaut'],
  ['BACKEND', 'Node.js, Express, PostgreSQL — Architecture scalable, securisee, prete pour la croissance'],
  ['HEBERGEMENT', 'Vercel, Render, AWS — Disponibilite 99.9%, CDN mondial, HTTPS automatique'],
  ['CMS', 'Contentful, Sanity, WordPress headless — Vous gerez votre contenu sans toucher au code'],
  ['SEO', 'Schema.org, Core Web Vitals, sitemap XML, balises meta optimisees pour chaque page'],
  ['SECURITE', 'HTTPS, protection DDOS, sauvegardes quotidiennes, conformite PIPEDA et Loi 25'],
];
stack.forEach(([cat, desc]) => {
  if (y > 640) return;
  doc.rect(M, y, 90, 30).fill(B);
  doc.fill(W).fontSize(9).font('Helvetica-Bold').text(cat, M + 5, y + 10, { width: 80, align: 'center' });
  doc.fill(D).fontSize(9).font('Helvetica').text(desc, M + 98, y + 10, { width: CW - 98 });
  y += 38;
});
y = sub('Notre processus qualite — Ce qu\'on verifie avant de livrer', y + 5);
const quality = [
  'Temps de chargement mesure et confirme < 2 secondes sur 3G',
  'Score Google PageSpeed > 90 sur mobile ET desktop',
  'Test de compatibilite sur iPhone (Safari), Android (Chrome), Windows (Edge, Chrome, Firefox)',
  'Verification complete du bilinguisme FR/EN sur toutes les pages',
  'Test de tous les formulaires et liens — zero lien mort tolere',
  'Verification SEO : balises title uniques, meta descriptions, schema markup',
  'Test HTTPS et redirection www vers non-www (ou inverse) confirmes',
  'Verification conformite Loi 96 et Loi 25 (protection des donnees)',
];
quality.forEach(q => { if (y < 760) y = bul(q, y); });
ftr(10, TOTAL);

// ══ PAGE 11 — LOI 96 ══════════════════════════════════════
np();
hdr('La Loi 96 et votre site web : ce que vous risquez');
y = 85;
doc.rect(M, y, CW, 45).fill('#fef3c7').stroke('#d97706');
doc.fill('#92400e').fontSize(11).font('Helvetica-Bold')
  .text('AVERTISSEMENT IMPORTANT', M + 12, y + 8);
doc.fill('#92400e').fontSize(9).font('Helvetica')
  .text("Depuis le 1er juin 2023, toute entreprise faisant affaires au Quebec doit respecter la Charte de la langue francaise (Loi 96). Des amendes allant jusqu'a 30 000$ par infraction s'appliquent.", M + 12, y + 24, { width: CW - 24 });
y += 57;
y = sub("Que dit exactement la Loi 96 ?", y);
const law = [
  "Tout site web ciblant le marche quebecois doit etre disponible en francais",
  "La version francaise doit etre aussi complete que la version anglaise — pas question d'offrir moins de contenu en francais",
  "Les interfaces utilisateurs (boutons, menus, formulaires) doivent etre en francais par defaut",
  "Les contrats et documents commerciaux doivent etre disponibles en francais",
  "L'OQLF (Office quebecois de la langue francaise) peut inspecter votre site a tout moment",
  "Les plaintes peuvent venir de n'importe quel consommateur quebecois",
];
law.forEach(l => { if (y < 580) y = bul(l, y); });
y = sub("Notre Scanner Loi 96 gratuit — Testez votre site maintenant", y + 5);
y = body("NT Digital Group a developpe un scanner automatise qui analyse votre site en temps reel et genere un rapport de conformite Loi 96. Le scanner verifie : balise lang, balises hreflang, densite du vocabulaire francais, meta-descriptions, et plus.", y);
doc.rect(M, y, CW, 60).fill(B);
doc.fill(W).fontSize(14).font('Helvetica-Bold')
  .text('Testez votre site gratuitement :', M + 12, y + 10);
doc.fill(L).fontSize(12).font('Helvetica')
  .text('ntwebux.com/bill96', M + 12, y + 32)
  .text('Rapport instantane. 100% gratuit. Sans engagement.', M + 12, y + 48);
y += 72;
y = sub("Ce que comprend notre mise en conformite", y);
const compliance = [
  "Bascule linguistique FR/EN avec detection automatique de la langue du navigateur",
  "Traduction professionnelle (pas Google Translate) de tout le contenu",
  "Verification et correction de toutes les balises HTML lang et hreflang",
  "Documentation de conformite fournie pour vos dossiers d'entreprise",
];
compliance.forEach(c => { if (y < 760) y = bul(c, y); });
ftr(11, TOTAL);

// ══ PAGE 12 — ETUDE DE CAS 1 ══════════════════════════════
np();
hdr('Etude de cas — Ace Esthetique (Montreal)');
y = 85;
doc.rect(M, y, CW, 45).fill(B);
doc.fill(W).fontSize(10).font('Helvetica-Bold')
  .text('SECTEUR : Esthetique & Beaute  |  VILLE : Montreal (Plateau-Mont-Royal)  |  LIVRAISON : 4 jours', M + 12, y + 8);
doc.fill(L).fontSize(9).font('Helvetica')
  .text('PROBLEME PRINCIPAL : Gestion manuelle complete, no-shows frequents, zero presence numerique', M + 12, y + 26);
y += 57;
y = sub("La situation avant NT Digital Group", y);
y = body("Ace Esthetique, salon de beaute etabli depuis 6 ans sur le Plateau-Mont-Royal, fonctionnait entierement par telephone et messages Facebook. La proprietaire passait 3 heures par jour a gerer les appels, confirmations et no-shows. Elle perdait en moyenne 12 rendez-vous par semaine — soit 85$ chacun.", y);
y = sub("Ce que nous avons livre en 4 jours", y + 5);
const delivered = [
  "Site web bilingue 8 pages avec galerie de realisations, services et tarifs",
  "Systeme de reservation en ligne integre (Acuity) avec paiement d'acompte",
  "Rappels SMS automatiques 24h et 1h avant chaque rendez-vous",
  "Page Google Business optimisee avec photos et heures mises a jour",
  "Chatbot IA qui repond aux 10 questions les plus frequentes automatiquement",
  "Tableau de bord analytique pour suivre les reservations et revenus en temps reel",
];
delivered.forEach(d => { if (y < 560) y = bul(d, y); });
y = sub("Resultats mesures apres 60 jours", y + 5);
y = stat3('90%', 'Reduction des no-shows (de 12 a 1 par semaine)', '35%', 'Augmentation des nouvelles reservations', '8h', 'Economisees en administration par semaine', y);
const quotes_detail = [
  "Revenue mensuel : +2 400$ (12 rendez-vous recuperes x 85$ x 4 semaines)",
  "Temps recupere : 8h/semaine soit 32h/mois reinvesties dans le service",
  "Avis Google : passe de 12 a 47 avis en 60 jours grace au suivi automatique post-visite",
  "ROI : investissement recupere en 28 jours",
];
quotes_detail.forEach(d => { if (y < 720) y = bul(d, y); });
doc.rect(M, y + 5, CW, 50).fill(S).stroke(B);
doc.fill(G).fontSize(10).font('Helvetica-Oblique')
  .text('"Avant, je passais mes soirees a confirmer des rendez-vous. Maintenant, le systeme le fait pendant que je suis avec mes clientes. Mon chiffre d\'affaires a augmente de 40% en 2 mois."', M + 12, y + 13, { width: CW - 24 });
doc.fill(B).fontSize(9).font('Helvetica-Bold').text('— Sophie, Proprietaire, Ace Esthetique', M + 12, y + 42);
ftr(12, TOTAL);

// ══ PAGE 13 — ETUDE DE CAS 2 ══════════════════════════════
np();
hdr('Etude de cas — AudreyRH (Montreal)');
y = 85;
doc.rect(M, y, CW, 45).fill(B);
doc.fill(W).fontSize(10).font('Helvetica-Bold')
  .text('SECTEUR : Ressources humaines & Subventions  |  VILLE : Montreal  |  LIVRAISON : 5 jours', M + 12, y + 8);
doc.fill(L).fontSize(9).font('Helvetica')
  .text('PROBLEME PRINCIPAL : Excel partout, delais de 72h, incapacite a scaler sans embaucher', M + 12, y + 26);
y += 57;
y = sub("La situation avant NT Digital Group", y);
y = body("AudreyRH est une consultante RH specialisee dans l'acquisition de talents immigrants au Quebec et la navigation des programmes de subventions gouvernementales (PRIIME, Connexion Emploi, Programme Acces Emploi). Elle gerait 25 dossiers actifs dans des fichiers Excel disperses, avec des suivis manuels et des delais de reponse atteignant 72h.", y);
y = sub("Ce que nous avons livre en 5 jours", y + 5);
const rh_delivered = [
  "Plateforme web complete avec espace client securise (connexion unique par dossier)",
  "CRM sur mesure integre : suivi des dossiers, etapes, documents et echeances",
  "Automatisation des courriels de suivi : le systeme relance automatiquement a chaque etape",
  "Formulaire d'intake client qui collecte toutes les informations requises des le depart",
  "Tableau de bord en temps reel : pipeline de dossiers, statuts, revenus, prochaines actions",
  "Intégration des subventions disponibles avec alertes automatiques pour les delais",
  "Site bilingue FR/EN conforme Loi 96 avec blog de contenu RH pour le SEO",
];
rh_delivered.forEach(d => { if (y < 580) y = bul(d, y); });
y = sub("Resultats mesures apres 90 jours", y + 5);
y = stat3('2h', 'Delai de reponse (vs 72h avant)', '+40%', 'Capacite de dossiers simultanement', '0', 'Perte de donnees critiques', y);
const rh_detail = [
  "Capacite de dossiers : passe de 25 a 35 dossiers actifs simultanement sans embauche additionnelle",
  "Revenus : +18 000$/trimestre grace a la capacite supplementaire",
  "Satisfaction client : score NPS passe de 67 a 94/100",
  "Visibilite Google : classee page 1 pour 'consultante RH immigrants Montreal' en 6 semaines",
];
rh_detail.forEach(d => { if (y < 730) y = bul(d, y); });
doc.rect(M, y + 5, CW, 50).fill(S).stroke(B);
doc.fill(G).fontSize(10).font('Helvetica-Oblique')
  .text('"Je pouvais pas croire qu\'en 5 jours, j\'aurais un systeme plus performant que ce que certaines grandes firmes utilisent. J\'ai recupere 3 clients que j\'avais perdu faute de suivi. Le ROI etait la en 3 semaines."', M + 12, y + 13, { width: CW - 24 });
doc.fill(B).fontSize(9).font('Helvetica-Bold').text('— Audrey, Fondatrice AudreyRH', M + 12, y + 42);
ftr(13, TOTAL);

// ══ PAGE 14 — CHECKLIST ═══════════════════════════════════
np();
hdr('Checklist — Etes-vous pret a automatiser ?');
y = 85;
y = body("Evaluez l'etat actuel de votre presence numerique. Pour chaque element absent, vous laissez de l'argent sur la table. Cochez ce que vous avez deja en place :", y);
const checks = [
  ['PRESENCE EN LIGNE', [
    'Site web professionnel disponible en francais ET en anglais',
    'Site web charge en moins de 3 secondes sur mobile',
    'Fiche Google Business completement remplie et verificiee',
    'Avis Google : minimum 10 avis avec une note superieure a 4.0',
    'Presence sur les reseaux sociaux pertinents a votre secteur',
  ]],
  ['CAPTURE DE LEADS', [
    'Formulaire de contact visible sur toutes les pages importantes',
    'Systeme de reservation ou prise de rendez-vous en ligne',
    'Chatbot ou chat en direct actif 24h/24',
    'Reponse automatique aux nouvelles demandes en moins de 5 minutes',
    'Page de destination (landing page) dediee a votre service principal',
  ]],
  ['AUTOMATISATION', [
    'Rappels automatiques par SMS ou courriel avant les rendez-vous',
    'Suivi automatique des leads qui n\'ont pas converti',
    'Facturation et relances de paiement automatisees',
    'CRM ou systeme de suivi des clients en place',
    'Rapport de performance mensuel genere automatiquement',
  ]],
  ['CONFORMITE & SECURITE', [
    'Site web conforme a la Loi 96 (francais en priorite)',
    'Politique de confidentialite conforme a la Loi 25',
    'Certificat SSL (HTTPS) actif sur votre site',
    'Sauvegardes quotidiennes de votre site et de vos donnees',
    'Formulaires de consentement pour la collecte de donnees',
  ]],
];
checks.forEach(([cat, items]) => {
  if (y > 680) return;
  doc.rect(M, y, CW, 20).fill(B);
  doc.fill(W).fontSize(10).font('Helvetica-Bold').text(cat, M + 8, y + 5);
  y += 22;
  items.forEach(item => {
    if (y > 730) return;
    doc.rect(M, y, 14, 14).stroke(B);
    doc.fill(D).fontSize(9).font('Helvetica').text(item, M + 20, y + 2, { width: CW - 20 });
    y += 20;
  });
  y += 5;
});
doc.rect(M, y, CW, 35).fill(S).stroke(B);
doc.fill(D).fontSize(10).font('Helvetica')
  .text('Score 0-5 : Urgent — contactez-nous cette semaine   |   6-10 : En progression — optimisons ensemble   |   11-15 : Bien — maximisons vos resultats   |   16-20 : Excellent — restons en contact pour la croissance', M + 8, y + 10, { width: CW - 16 });
ftr(14, TOTAL);

// ══ PAGE 15 — PLAN 72H ════════════════════════════════════
np();
hdr("Votre plan d'action en 72 heures");
y = 85;
doc.rect(M, y, CW, 35).fill(B);
doc.fill(W).fontSize(12).font('Helvetica-Bold')
  .text('Notre sprint de 72h : de zero a un site professionnel en ligne en 3 jours', M + 12, y + 12, { width: CW - 24 });
y += 47;
const days = [
  ['JOUR 1 — STRATEGIE & ARCHITECTURE (Heures 0 a 24)', B, W, [
    'Appel de demarrage de 45 minutes : objectifs, clientele cible, ton de marque, concurrents',
    'Audit de votre presence actuelle : site existant, Google Business, reseaux sociaux',
    'Architecture de l\'information : quelles pages, quel contenu, quelle structure de navigation',
    'Selection du design et de la palette de couleurs (3 options vous sont presentees)',
    'Plan technique : quelles integrations, quel CRM, quel systeme de reservation',
    'Collecte des elements : logo, photos, textes existants, acces au nom de domaine',
    'Livrable fin de journee : maquette fil de fer (wireframe) de toutes les pages approuvee',
  ]],
  ['JOUR 2 — DESIGN & DEVELOPPEMENT (Heures 24 a 48)', '#1e3a6e', W, [
    'Design complet de toutes les pages en francais ET en anglais',
    'Developpement frontend : HTML, CSS, JavaScript, React ou framework adapte',
    'Integration du systeme de reservation ou de contact selon votre besoin',
    'Optimisation des images et performance : objectif < 2 secondes de chargement',
    'Integration du chatbot IA ou formulaire de capture avance',
    'Configuration SEO : balises, sitemap, schema markup, Google Analytics',
    'Livrable fin de journee : version de review sur URL privee pour votre approbation',
  ]],
  ['JOUR 3 — REVISIONS, LANCEMENT & FORMATION (Heures 48 a 72)', S, D, [
    'Presentation detaillee du site complet (video Loom + appel si desiree)',
    'Integration de vos retours et corrections (jusqu\'a 3 cycles de revisions inclus)',
    'Tests complets : tous les formulaires, liens, boutons, affichage mobile et desktop',
    'Mise en ligne sur votre domaine avec configuration DNS',
    'Configuration et verification HTTPS, redirections www, vitesse finale',
    'Soumission du sitemap a Google Search Console pour indexation',
    'Formation de 20 minutes : comment mettre a jour votre site, gerer les reservations, lire vos stats',
    'Remise des acces : tableau de bord, Google Analytics, systeme de reservation',
  ]],
];
days.forEach(([title, bg, fg, items]) => {
  if (y > 620) return;
  doc.rect(M, y, CW, 20).fill(bg);
  doc.fill(fg).fontSize(10).font('Helvetica-Bold').text(title, M + 8, y + 5);
  y += 22;
  items.forEach(item => {
    if (y > 730) { return; }
    y = bul(item, y);
  });
  y += 4;
});
ftr(15, TOTAL);

// ══ PAGE 16 — COMPARAISON ═════════════════════════════════
np();
hdr('Comparaison : Agence traditionnelle vs NT Digital Group');
y = 85;
y = body("Avant de prendre une decision, comparez objectivement ce que vous obtenez avec une agence traditionnelle versus notre approche sprint.", y + 5);
const compare_headers = ['CRITERE', 'AGENCE TRADITIONNELLE', 'NT DIGITAL GROUP'];
const compare_rows = [
  ['Delai de livraison', '6 a 12 semaines (souvent plus)', '72 heures garanti'],
  ['Prix moyen', '8 000$ a 25 000$+', '1 200$ a 4 200$'],
  ['Interlocuteur', 'Chef de projet, designer, dev, account manager...', 'Vous parlez directement avec le developpeur'],
  ['Revisions incluses', '2-3 revisions, puis facturation supplementaire', '3 revisions incluses (Premium : illimitees)'],
  ['Bilinguisme', 'Option payante, souvent mal faite', 'Inclus dans tous les forfaits, natif'],
  ['SEO de base', 'Option payante (+500$ a 2 000$)', 'Inclus dans tous les forfaits'],
  ['Support post-lancement', '1 mois, puis contrat de maintenance', '30 a 90 jours selon le forfait'],
  ['Transparence des prix', 'Soumission apres 3 reunions', 'Prix fixes et transparents des le depart'],
  ['Specialisation Quebec', 'Generalement non', 'Oui — Loi 96, Loi 25, marche local'],
  ['Disponibilite', 'Heures de bureau', 'Reponse en moins de 4h, 7 jours/7'],
];
const colW = [160, 165, 165];
const colX = [M, M + 165, M + 330];
doc.rect(M, y, CW, 22).fill(B);
compare_headers.forEach((h, i) => {
  doc.fill(W).fontSize(9).font('Helvetica-Bold').text(h, colX[i] + 5, y + 7, { width: colW[i] - 10 });
});
y += 22;
compare_rows.forEach((row, ri) => {
  const bg = ri % 2 === 0 ? S : W;
  doc.rect(M, y, CW, 30).fill(bg);
  row.forEach((cell, ci) => {
    const color = ci === 2 ? B : (ci === 1 ? '#dc2626' : D);
    const bold = ci === 0 || ci === 2;
    doc.fill(color).fontSize(8).font(bold ? 'Helvetica-Bold' : 'Helvetica')
      .text(cell, colX[ci] + 5, y + 9, { width: colW[ci] - 10 });
  });
  doc.rect(M, y + 30, CW, 0.5).fill(L);
  y += 31;
});
y = sub("Notre garantie", y + 10);
doc.rect(M, y, CW, 50).fill(B);
doc.fill(W).fontSize(11).font('Helvetica-Bold')
  .text("Garantie de satisfaction 14 jours", M + 12, y + 8);
doc.fill(L).fontSize(9).font('Helvetica')
  .text("Si vous n'etes pas satisfait de votre site dans les 14 jours suivant la livraison, nous le retravaillons jusqu'a ce que vous soyez heureux — ou nous vous remboursons integralement.", M + 12, y + 26, { width: CW - 24 });
ftr(16, TOTAL);

// ══ PAGE 17 — TARIFS ══════════════════════════════════════
np();
hdr('Tarifs & Forfaits 2026 — Retour sur investissement');
y = 85;
y = body("Nos tarifs sont fixes et transparents. Pas de mauvaises surprises, pas de facturation supplementaire pour les revisions. Ce que vous voyez est ce que vous payez.", y);
const plans = [
  {
    name: 'STARTER', price: '1 200$', sub: 'CAD', color: S, tc: D, bc: B, features: [
      'Site 5 pages bilingue FR/EN',
      'Design professionnel sur mesure',
      'Mobile-first responsive',
      'Formulaire de contact integre',
      'SEO de base (balises, sitemap)',
      'HTTPS + hebergement 1 an offert',
      '1 revision incluse',
      'Support technique 30 jours',
      'Livraison garantie en 72h',
    ]
  },
  {
    name: 'PROFESSIONNEL', price: '2 400$', sub: 'CAD — LE PLUS POPULAIRE', color: B, tc: W, bc: L, features: [
      'Site 10 pages bilingue FR/EN',
      'Design premium + animations',
      'Systeme de reservation integre',
      'Chatbot IA de base',
      'CRM basique (suivi leads)',
      'SEO avance + Blog',
      'Google Analytics configure',
      '3 revisions incluses',
      'Support technique 60 jours',
      'Livraison garantie en 72h',
    ]
  },
  {
    name: 'PREMIUM', price: '4 200$', sub: 'CAD', color: S, tc: D, bc: B, features: [
      'Site illimite bilingue FR/EN',
      'Design exclusif + identite visuelle',
      'Automatisation IA complete',
      'CRM sur mesure',
      'Integrations avancees (API)',
      'SEO complet + Contenu',
      'Dashboard analytique personnalise',
      'Revisions illimitees',
      'Support prioritaire 90 jours',
      'Livraison 72h-5 jours selon scope',
    ]
  },
];
const planW = CW / 3;
plans.forEach((plan, i) => {
  const px = M + i * planW;
  doc.rect(px, y, planW - 4, 230).fill(plan.color).stroke(plan.bc);
  doc.fill(plan.tc === W ? W : plan.bc).fontSize(11).font('Helvetica-Bold')
    .text(plan.name, px + 8, y + 10, { width: planW - 16 });
  doc.fill(plan.tc === W ? W : D).fontSize(24).font('Helvetica-Bold')
    .text(plan.price, px + 8, y + 30, { width: planW - 16 });
  doc.fill(plan.tc === W ? L : G).fontSize(8).font('Helvetica')
    .text(plan.sub, px + 8, y + 60, { width: planW - 16 });
  let fy = y + 75;
  plan.features.forEach(f => {
    if (fy < y + 225) {
      doc.fill(plan.tc === W ? L : D).fontSize(8).font('Helvetica')
        .text('• ' + f, px + 8, fy, { width: planW - 16 });
      fy += 16;
    }
  });
});
y += 240;
y = sub("Calcul simplifie du ROI — Exemple Forfait Professionnel (2 400$)", y + 5);
const roi = [
  "1 rendez-vous manque recupere par semaine = 75$ x 52 semaines = 3 900$/an",
  "Reduction no-shows de 60% = economie de 150$/semaine = 7 800$/an",
  "Nouveau client via Google toutes les 2 semaines = 200$ x 26 = 5 200$/an",
  "TOTAL IMPACT ANNUEL ESTIME : +16 900$ en revenus et economies",
  "ROI sur investissement de 2 400$ : 604% la premiere annee",
];
roi.forEach(r => { if (y < 760) y = bul(r, y); });
ftr(17, TOTAL);

// ══ PAGE 18 — FAQ PARTIE A ════════════════════════════════
np();
hdr('FAQ — Les 10 questions les plus posees (1/2)');
y = 85;
const faq1 = [
  ["72 heures, c'est vraiment possible ? Sans compromis sur la qualite ?", "Oui, et voici pourquoi : contrairement aux agences traditionnelles, nous ne perdons pas de temps en reunions de statut, approbations inter-departementales et back-and-forth inutiles. Notre processus est discipline et optimise. Nous avons livre plus de 50 sites en 72h. Le secret : une collecte d'information complete le Jour 1, un travail de design et developpement intensif le Jour 2, et un lancement propre le Jour 3. Le resultat est professionnel parce que nous sommes des experts, pas des debutants qui rushent."],
  ["Est-ce que je peux modifier mon site moi-meme apres la livraison ?", "Oui, absolument. Selon votre forfait, nous integrons un systeme de gestion de contenu (CMS) qui vous permet de modifier textes, images, et ajouter des articles de blog sans aucune connaissance technique. La formation de 20 minutes incluse dans chaque livraison vous apprend a faire 90% des modifications courantes en autonomie."],
  ["Que se passe-t-il si je ne suis pas satisfait ?", "Nous offrons une garantie de satisfaction 14 jours. Si apres la livraison vous n'etes pas satisfait du resultat, nous retravaillons le site jusqu'a ce que vous soyez heureux. Si apres 3 cycles de corrections supplementaires vous etes toujours insatisfait, nous vous remboursons integralement. Nous avons un taux de satisfaction de 98% — cette garantie est rarement invoquee."],
  ["Comment se passe le paiement ?", "Nous demandons 50% a la signature du contrat (pour reserver votre creneau dans notre calendrier) et 50% a la livraison finale avant la mise en ligne. Nous acceptons virement Interac, carte de credit (Visa, Mastercard), et transfert bancaire. Pour les entreprises etablies avec bon historique, nous pouvons discuter de modalites de paiement."],
  ["Est-ce que vous fournissez l'hebergement et le nom de domaine ?", "L'hebergement est inclus la premiere annee dans tous nos forfaits. Pour le nom de domaine, si vous n'en avez pas encore, nous vous aidons a en acquerir un (cout d'environ 15-25$/an transferable a votre nom). Si vous avez deja un domaine, nous nous occupons de la configuration DNS sans frais supplementaires."],
];
faq1.forEach(([q, a]) => {
  if (y > 660) return;
  doc.rect(M, y, CW, 18).fill(B);
  doc.fill(W).fontSize(9).font('Helvetica-Bold').text('Q : ' + q, M + 8, y + 5, { width: CW - 16 });
  y += 20;
  const h = doc.heightOfString('R : ' + a, { width: CW - 16, lineGap: 2 });
  doc.rect(M, y, CW, h + 16).fill(S);
  doc.fill(D).fontSize(9).font('Helvetica').text('R : ' + a, M + 8, y + 8, { width: CW - 16, lineGap: 2 });
  y += h + 22;
});
ftr(18, TOTAL);

// ══ PAGE 19 — FAQ PARTIE B ════════════════════════════════
np();
hdr('FAQ — Les 10 questions les plus posees (2/2)');
y = 85;
const faq2 = [
  ["Et si mon projet est plus complexe que ce que vous livrez en 72h ?", "Le sprint 72h est notre produit phare pour les sites web de 5 a 15 pages avec des integrations standard. Pour les projets plus complexes — applications web sur mesure, plateformes SaaS, systemes CRM complexes, integrations API avancees — nous avons un processus de developpement sur mesure qui s'etend sur 2 a 6 semaines selon la portee. Ces projets sont devis sur mesure. Contactez-nous pour discuter de votre besoin specifique."],
  ["Est-ce que vous pouvez reprendre et ameliorer mon site existant ?", "Oui. Nous faisons des audits et refonte de sites existants. Selon l'etat de votre site actuel, ca peut aller d'une optimisation SEO et vitesse (a partir de 500$) jusqu'a une refonte complete qui part de zero. Nous faisons une evaluation gratuite de votre site actuel et vous remettons un rapport avec nos recommandations avant tout engagement."],
  ["Qui s'occupe de mon projet ? Est-ce que mon travail sera sous-traite ?", "Votre projet est gere directement par notre equipe interne a Montreal. Nous ne sous-traitons pas le developpement a l'etranger. Vous communiquez directement avec la personne qui construit votre site. C'est un de nos avantages cles versus les grandes agences."],
  ["Comment fonctionne le support apres le lancement ?", "Chaque forfait inclut une periode de support post-lancement : 30 jours (Starter), 60 jours (Professionnel), 90 jours (Premium). Durant cette periode, nous corrigeons tout bug ou probleme technique sans frais. Apres cette periode, nous offrons des forfaits de maintenance mensuelle (a partir de 99$/mois) qui incluent les mises a jour de securite, sauvegardes, et 1h de modifications mensuelles."],
  ["Est-ce que vous pouvez m'aider a obtenir des subventions pour financer mon site web ?", "Oui. Nous connaissons bien les programmes de financement disponibles pour les PME quebecoises : ESSOR, PCAN (Programme Connectivite et Acces au Numerique), et d'autres programmes sectoriels. Nous vous guidons dans la preparation de votre dossier et pouvons fournir la documentation requise. Dans certains cas, jusqu'a 50% des couts peuvent etre couverts."],
];
faq2.forEach(([q, a]) => {
  if (y > 660) return;
  doc.rect(M, y, CW, 18).fill(B);
  doc.fill(W).fontSize(9).font('Helvetica-Bold').text('Q : ' + q, M + 8, y + 5, { width: CW - 16 });
  y += 20;
  const h = doc.heightOfString('R : ' + a, { width: CW - 16, lineGap: 2 });
  doc.rect(M, y, CW, h + 16).fill(S);
  doc.fill(D).fontSize(9).font('Helvetica').text('R : ' + a, M + 8, y + 8, { width: CW - 16, lineGap: 2 });
  y += h + 22;
});
ftr(19, TOTAL);

// ══ PAGE 20 — CTA FINAL ═══════════════════════════════════
np();
doc.rect(0, 0, PW, PH).fill(D);
doc.rect(0, 0, PW, 5).fill(B);
doc.rect(0, PH - 5, PW, 5).fill(B);
doc.fill(B).fontSize(9).font('Helvetica-Bold')
  .text('NT DIGITAL GROUP  |  MONTREAL, QUEBEC  |  2026', M, 20, { characterSpacing: 1.5 });
doc.fill(W).fontSize(36).font('Helvetica-Bold')
  .text('Pret a passer a', M, 60)
  .text("l'action ?", M, 100);
doc.rect(M, 148, 200, 3).fill(B);
doc.fill(W).fontSize(14).font('Helvetica-Bold')
  .text('Voici vos 3 prochaines etapes :', M, 165);
const steps = [
  ['01', 'Testez votre site gratuitement', 'Utilisez notre Scanner Loi 96 sur ntwebux.com/bill96 pour voir exactement ou vous en etes et ce qui doit etre corrige.'],
  ['02', 'Reservez votre appel strategie (30 min gratuit)', 'On analyse votre situation actuelle, vos objectifs et on vous propose un plan concret. Sans engagement. Sans pression.'],
  ['03', 'Lancez votre sprint 72h', 'Si tout vous convient, on demarre immediatement. Votre site professionnel bilingue est en ligne dans les 72 heures suivantes.'],
];
let sy = 195;
steps.forEach(([num, title, desc]) => {
  doc.rect(M, sy, 36, 36).fill(B);
  doc.fill(W).fontSize(18).font('Helvetica-Bold').text(num, M + 6, sy + 9);
  doc.fill(W).fontSize(12).font('Helvetica-Bold').text(title, M + 46, sy + 5, { width: CW - 46 });
  doc.fill(G).fontSize(10).font('Helvetica').text(desc, M + 46, sy + 23, { width: CW - 46, lineGap: 3 });
  sy += 65;
});
doc.rect(M, sy + 10, CW, 1).fill(B);
doc.fill(W).fontSize(15).font('Helvetica-Bold').text('Contactez-nous maintenant', M, sy + 20);
doc.fill(G).fontSize(11).font('Helvetica')
  .text('ntwebux.com', M, sy + 44)
  .text('info@ntwebux.com', M, sy + 62)
  .text('438-806-7640', M, sy + 80)
  .text('Montreal, Quebec, Canada', M, sy + 98);
doc.rect(M, sy + 120, CW, 50).fill(B);
doc.fill(W).fontSize(12).font('Helvetica-Bold')
  .text('Consultation strategique gratuite de 30 minutes', M + 12, sy + 130, { width: CW - 24 });
doc.fill(L).fontSize(10).font('Helvetica')
  .text('Reservez sur : ntwebux.com  |  ou appelez le 438-806-7640', M + 12, sy + 148, { width: CW - 24 });
doc.fill(G).fontSize(8).font('Helvetica')
  .text('2026 NT Digital Group Inc. — NEQ 2281300162 — Tous droits reserves — Montreal, Quebec, Canada', M, PH - 20);
ftr(20, TOTAL);

doc.end();
out.on('finish', () => {
  const size = require('fs').statSync(OUTPUT).size;
  console.log('SUCCESS — PDF genere : ' + (size / 1024).toFixed(1) + 'KB — 20 pages');
});
'''

with open('/home/runner/workspace/artifacts/nt-web-design/generate-pdf.cjs', 'w') as f:
f.write(content)

print("Script ecrit avec succes !")
PYEOF