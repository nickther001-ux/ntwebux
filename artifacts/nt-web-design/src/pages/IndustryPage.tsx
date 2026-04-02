import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Contact } from '@/components/sections/Contact';
import { getIndustryPage, INDUSTRY_PAGES } from '@/lib/seo-pages';
import { useSEO } from '@/lib/useSEO';
import NotFound from './not-found';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getIndustryPage(slug ?? '');

  useSEO({
    title: page?.metaTitle ?? 'Industry Web Design — NT Web UX',
    description: page?.metaDesc ?? 'Custom web design for your industry by NT Web UX.',
    canonical: `https://ntweb.design/industry/${slug}`,
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
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
              <span className="pill-label" style={{ color: page.accent, borderColor: `rgba(${rgb},0.3)` }}>
                {page.badge}
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

        {/* Services Grid */}
        <section style={{ padding: '80px 24px 100px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span className="pill-label" style={{ display: 'inline-flex', marginBottom: '20px' }}>What We Deliver</span>
              <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                Everything your {page.badge} business needs online
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {page.services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  style={{
                    padding: '28px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid rgba(${rgb},0.15)`,
                    transition: 'border-color 0.25s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <CheckCircle2 size={18} color={page.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{s.title}</div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{s.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Industries */}
        <section style={{ padding: '60px 24px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '36px' }}>
              <span className="pill-label" style={{ display: 'inline-flex', marginBottom: '16px' }}>More Industries</span>
              <h3 style={{ fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                We also specialise in
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {INDUSTRY_PAGES.filter(p => p.slug !== slug).map(p => (
                <Link
                  key={p.slug}
                  href={`/industry/${p.slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {p.badge} <ArrowRight size={12} />
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
