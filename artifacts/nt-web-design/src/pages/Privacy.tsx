import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';

const TITLE = 'Privacy & Digital Data Policy — NT Web UX';
const DESC  = 'How NT Digital Group (NT Web UX) collects, uses, and protects your personal data. Compliant with Quebec Law 25 and Canadian PIPEDA.';

const bi = <T,>(en: T, fr: T, lang: string): T => (lang === 'fr' ? fr : en);

export default function Privacy() {
  const { lang } = useLanguage();

  const sections = [
    {
      h: bi('1. Information We Collect', '1. Renseignements que nous recueillons', lang),
      p: bi(
        'We collect personal and non-personal data to provide our services effectively.',
        'Nous recueillons des données personnelles et non personnelles afin de fournir nos services efficacement.',
        lang,
      ),
      list: [
        bi(
          'Information You Provide to Us: When you fill out our contact form, request a quote, or communicate with us, we collect your First Name, Last Name, Email Address, Phone Number, and any project details you share regarding the services needed.',
          'Renseignements que vous nous fournissez : lorsque vous remplissez notre formulaire de contact, demandez un devis ou communiquez avec nous, nous recueillons votre prénom, nom, adresse courriel, numéro de téléphone et tout détail de projet partagé.',
          lang,
        ),
        bi(
          'Automated Digital Data: When you browse our website, we automatically collect technical data, including your IP address, browser type, operating system, pages viewed, and navigation patterns.',
          'Données numériques automatisées : lorsque vous naviguez sur notre site, nous recueillons automatiquement des données techniques telles que votre adresse IP, type de navigateur, système d\u2019exploitation, pages consultées et habitudes de navigation.',
          lang,
        ),
      ],
    },
    {
      h: bi('2. How We Use Your Information', '2. Comment nous utilisons vos renseignements', lang),
      p: bi(
        'We use the collected data strictly for business operations, including:',
        'Nous utilisons les données recueillies strictement pour nos activités commerciales, notamment :',
        lang,
      ),
      list: [
        bi('Providing custom proposals, strategy sessions, and responding to your inquiries.', 'Fournir des propositions personnalisées, des séances de stratégie et répondre à vos demandes.', lang),
        bi('Delivering custom web development, AI automation, and digital growth services.', 'Livrer des services de développement web sur mesure, d\u2019automatisation par IA et de croissance numérique.', lang),
        bi('Managing client relationships, billing, and project administration.', 'Gérer les relations clients, la facturation et l\u2019administration de projets.', lang),
        bi('Improving our website\u2019s user experience (UX) and analyzing visitor traffic.', 'Améliorer l\u2019expérience utilisateur (UX) de notre site et analyser le trafic des visiteurs.', lang),
      ],
    },
    {
      h: bi('3. Cookies and Tracking Technologies', '3. Témoins et technologies de suivi', lang),
      p: bi(
        'Our website uses cookies and similar tracking technologies to enhance user experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our website may not function optimally.',
        'Notre site utilise des témoins (cookies) et des technologies similaires pour améliorer l\u2019expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser tous les témoins ou pour indiquer quand un témoin est envoyé. Cependant, certaines parties du site peuvent ne pas fonctionner de façon optimale sans témoins.',
        lang,
      ),
    },
    {
      h: bi('4. Data Sharing and Third-Party Services', '4. Partage des données et services tiers', lang),
      p: bi(
        'We do not sell, rent, or trade your personal information. We may share your data only in the following circumstances:',
        'Nous ne vendons, ne louons ni n\u2019échangeons vos renseignements personnels. Nous pouvons partager vos données uniquement dans les circonstances suivantes :',
        lang,
      ),
      list: [
        bi(
          'Service Providers: With trusted third-party platforms that facilitate our business operations (e.g., hosting providers like Render, CRM systems, or analytics tools). These parties are bound by strict confidentiality agreements.',
          'Fournisseurs de services : avec des plateformes tierces de confiance qui facilitent nos opérations (p. ex. hébergeurs comme Render, CRM ou outils d\u2019analyse). Ces parties sont liées par des accords de confidentialité stricts.',
          lang,
        ),
        bi(
          'Legal Compliance: If required by law, subpoena, or regulatory request, including compliance with Quebec and Canadian privacy authorities.',
          'Conformité légale : si la loi, une assignation ou une demande réglementaire l\u2019exige, y compris en conformité avec les autorités de protection de la vie privée du Québec et du Canada.',
          lang,
        ),
      ],
    },
    {
      h: bi('5. Data Security and Retention', '5. Sécurité et conservation des données', lang),
      p: bi(
        'We implement industry-standard security measures, including encryption and secure server hosting, to protect your personal information from unauthorized access, alteration, or disclosure. We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as legally required.',
        'Nous mettons en œuvre des mesures de sécurité conformes aux normes de l\u2019industrie, incluant le chiffrement et l\u2019hébergement sécurisé, afin de protéger vos renseignements contre tout accès, altération ou divulgation non autorisés. Nous conservons vos données personnelles uniquement aussi longtemps que nécessaire pour atteindre les objectifs énoncés dans cette politique ou tel que requis par la loi.',
        lang,
      ),
    },
    {
      h: bi('6. Your Rights (Compliance with Law 25 & PIPEDA)', '6. Vos droits (conformité Loi 25 et LPRPDE)', lang),
      p: bi(
        'If you are a resident of Quebec or Canada, you hold specific rights regarding your digital data:',
        'Si vous résidez au Québec ou au Canada, vous disposez de droits spécifiques concernant vos données numériques :',
        lang,
      ),
      list: [
        bi('Right to Access: You may request a copy of the personal data we hold about you.', 'Droit d\u2019accès : vous pouvez demander une copie des renseignements personnels que nous détenons.', lang),
        bi('Right to Rectification: You can request corrections to any inaccurate or incomplete data.', 'Droit de rectification : vous pouvez demander la correction de toute donnée inexacte ou incomplète.', lang),
        bi('Right to Erasure (Right to be Forgotten): You may request that we delete your personal information from our systems.', 'Droit à l\u2019effacement (droit à l\u2019oubli) : vous pouvez demander la suppression de vos renseignements personnels de nos systèmes.', lang),
        bi('Right to Withdraw Consent: You may withdraw your consent for data processing at any time.', 'Droit de retirer votre consentement : vous pouvez retirer votre consentement au traitement à tout moment.', lang),
      ],
    },
    {
      h: bi('7. Changes to This Policy', '7. Modifications de cette politique', lang),
      p: bi(
        'We may update this Privacy Policy periodically to reflect changes in our practices or regulatory requirements. We encourage you to review this page occasionally. Continued use of our website after modifications constitutes acceptance of the updated policy.',
        'Nous pouvons mettre à jour cette politique périodiquement pour refléter les changements dans nos pratiques ou les exigences réglementaires. Nous vous encourageons à consulter cette page régulièrement. L\u2019utilisation continue du site après modifications constitue une acceptation de la politique mise à jour.',
        lang,
      ),
    },
    {
      h: bi('8. Contact Our Privacy Officer', '8. Contacter notre responsable de la vie privée', lang),
      p: bi(
        'To exercise your data rights or if you have any questions regarding how we handle your digital data, please contact our designated Privacy Officer:',
        'Pour exercer vos droits ou pour toute question concernant la gestion de vos données numériques, veuillez contacter notre responsable de la vie privée désigné :',
        lang,
      ),
      contact: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://ntwebux.com/privacy" />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />

        <main style={{ paddingTop: '140px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{
              display: 'inline-block', padding: '6px 14px', borderRadius: '999px',
              background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#93c5fd', marginBottom: '20px',
            }}>
              {bi('Legal', 'Mentions légales', lang)}
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1,
              letterSpacing: '-0.02em', margin: '0 0 16px', color: '#fff',
            }}>
              {bi('Privacy & Digital Data Policy', 'Politique de confidentialité et de données numériques', lang)}
            </h1>

            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: '0 0 8px' }}>
              {bi('Last Updated:', 'Dernière mise à jour :', lang)} {bi('April 17, 2026', '17 avril 2026', lang)}
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: '0 0 48px' }}>
              {bi('Company:', 'Compagnie :', lang)} NT Digital Group ({bi('operating as', 'opérant sous')} NT Web UX)
            </p>

            <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(255,255,255,0.72)', marginBottom: '48px' }}>
              {bi(
                'At NT Digital Group, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy and Digital Data Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (ntwebux.com) or engage with our digital services.',
                'Chez NT Digital Group, nous nous engageons à protéger votre vie privée et à assurer la sécurité de vos données personnelles. La présente politique explique comment nous recueillons, utilisons, divulguons et protégeons vos renseignements lorsque vous visitez notre site (ntwebux.com) ou utilisez nos services numériques.',
                lang,
              )}
            </p>

            {sections.map((s, i) => (
              <section key={i} style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '22px', fontWeight: 700, color: '#fff',
                  margin: '0 0 14px', letterSpacing: '-0.01em',
                }}>{s.h}</h2>

                {s.p && (
                  <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', margin: '0 0 14px' }}>
                    {s.p}
                  </p>
                )}

                {s.list && (
                  <ul style={{ paddingLeft: '20px', margin: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {s.list.map((item, j) => (
                      <li key={j} style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {s.contact && (
                  <div style={{
                    marginTop: '16px', padding: '20px 22px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <p style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 600, color: '#fff' }}>
                      Nickson Thermidor
                    </p>
                    <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                      {bi('Founder, NT Digital Group', 'Fondateur, NT Digital Group', lang)}
                    </p>
                    <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      Email:&nbsp;
                      <a href="mailto:info@ntwebux.com" style={{ color: '#93c5fd', textDecoration: 'none' }}>
                        info@ntwebux.com
                      </a>
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
