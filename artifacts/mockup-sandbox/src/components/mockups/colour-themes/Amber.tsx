export function Amber() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#080808', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', top: '-120px', left: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '80px', right: '-80px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg,#f59e0b,#f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '13px', color: '#fff' }}>N</div>
          <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', color: '#fff' }}>NTWEBUX</span>
        </div>
        <div style={{ display: 'flex', gap: '28px' }}>
          {['Services','Process','Pricing','Contact'].map(n => (
            <span key={n} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{n}</span>
          ))}
        </div>
        <button style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', border: 'none', borderRadius: '8px', padding: '9px 20px', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
          Get a Free Quote
        </button>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '64px 40px 40px', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '32px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f59e0b' }}>✦ Web Design Studio · Montréal</span>
        </div>
        <h1 style={{ fontSize: 'clamp(42px,6vw,72px)', fontWeight: 900, lineHeight: 1.05, color: '#fff', marginBottom: '16px' }}>
          Your business<br />
          <span style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>online.</span>
        </h1>
        <h2 style={{ fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 900, lineHeight: 1.05, background: 'linear-gradient(135deg,#fcd34d,#fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '28px' }}>
          Built to convert.
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 36px' }}>
          We build high-performance, conversion-focused websites for growing businesses. Stand out, attract more clients, and scale your brand.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', border: 'none', borderRadius: '10px', padding: '14px 28px', color: '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>Start My Project →</button>
          <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '14px 28px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '15px', cursor: 'pointer' }}>See How It Works</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', maxWidth: '800px', margin: '48px auto 0', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
        {[['200+','Websites Delivered'],['14d','Avg. Turnaround'],['98%','Client Satisfaction'],['5★','Average Rating']].map(([v,l],i) => (
          <div key={l} style={{ padding: '28px 16px', textAlign: 'center', borderRight: i<3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, background: 'linear-gradient(135deg,#fcd34d,#fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
