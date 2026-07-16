import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Contact } from '@/components/sections/Contact';
import { getLocationPage, LOCATION_PAGES } from '@/lib/seo-pages';
import { useSEO } from '@/lib/useSEO';
import NotFound from './not-found';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};

const SERVICES = [
  { title: 'Custom Web Design', desc: 'Fully bespoke websites tailored to your brand — no templates, no compromise.' },
  { title: 'E-Commerce Development', desc: 'Online stores built to convert browsers into paying customers.' },
  { title: 'Local SEO', desc: 'Rank #1 when your city searches for your service. We know local search.' },
  { title: 'Speed Optimisation', desc: 'Sub-2-second load times that keep visitors on your page and Google happy.' },
  { title: 'Bilingual Websites (EN/FR)', desc: 'Full English and French support for businesses serving both markets.' },
  { title: 'Ongoing Maintenance', desc: 'Monthly updates, security patches, and content edits so you stay fresh.' },
];

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getLocationPage(slug ?? '');

  useSEO({
    title: page?.metaTitle ?? 'Web Design — NT Web UX',
    description: page?.metaDesc ?? 'Custom web design by NT Web UX.',
    canonical: `https://ntweb.design/locations/${slug}`,
  });

  if (!page) return <NotFound />;

  const rgb = page.accent.slice(1).match(/.{2}/g)!.map(x => parseInt(x, 16)).join(',');

  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ padding: '140px 24px 100px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-65%)', width: '800px', height: '500px', borderRadius: '50%', background: `radial-gradient(ellipse, rgba(${rgb},0.12) 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', marginBottom: '28px' }}>
              <span className="pill-label" style={{ color: page.accent, borderColor: `rgba(${rgb},0.3)`, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={11} /> {page.badge}
              </span>
            </motion.div>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="show"
              style={{ fontSize: 'clamp(2rem,5.5vw,4rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', marginBottom: '24px' }}
            >
              {page.h1}
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="show"
              style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: '620px', margin: '0 auto 40px' }}
            >
              {page.intro}
            </motion.p>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-violet" style={{ padding: '14px 28px', fontSize: '15px', gap: '8px', background: page.accent, border: 'none' }}>
                Get a Free Quote <ArrowRight size={16} />
              </a>
              <Link href="/" className="btn-outline" style={{ padding: '14px 28px', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <ArrowLeft size={15} /> Back to Home
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services for this city */}
        <section style={{ padding: '80px 24px 100px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span className="pill-label" style={{ display: 'inline-flex', marginBottom: '20px' }}>Our {page.city} Services</span>
              <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                What we build for {page.city} businesses
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {SERVICES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  style={{
                    padding: '28px', borderRadius: '16px',
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid rgba(${rgb},0.15)`,
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `rgba(${rgb},0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: page.accent }} />
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{s.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighbourhoods */}
        <section style={{ padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <span className="pill-label" style={{ display: 'inline-flex', marginBottom: '20px' }}>Service Area</span>
                <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.2rem)', fontWeight: 800, color: '#fff', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                  Serving all of {page.city} & surrounding areas
                </h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '28px' }}>
                  We work remotely with clients across {page.province} and beyond. Where you're located doesn't limit what we can build together.
                </p>
                <a href="#contact" className="btn-violet" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '14px', textDecoration: 'none' }}>
                  Start Your Project <ArrowRight size={14} />
                </a>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {page.neighborhoods.map(n => (
                  <span key={n} style={{
                    padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                    color: page.accent,
                    background: `rgba(${rgb},0.08)`,
                    border: `1px solid rgba(${rgb},0.2)`,
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                  }}>
                    <MapPin size={10} /> {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.location-grid{grid-template-columns:1fr!important}}`}</style>
        </section>

        {/* Other Cities */}
        <section style={{ padding: '60px 24px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '36px' }}>
              <span className="pill-label" style={{ display: 'inline-flex', marginBottom: '16px' }}>Other Locations</span>
              <h3 style={{ fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                We also serve
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {LOCATION_PAGES.filter(p => p.slug !== slug).map(p => (
                <Link
                  key={p.slug}
                  href={`/locations/${p.slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <MapPin size={11} /> {p.city} <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
