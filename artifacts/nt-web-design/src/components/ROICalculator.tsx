import { useState } from 'react';

const SUBSCRIPTION = 297;

function formatDollar(n: number) {
  return '$' + Math.round(n).toLocaleString('en-CA');
}

export function ROICalculator() {
  const [jobValue, setJobValue]     = useState(500);
  const [missedCalls, setMissedCalls] = useState(5);
  const [teamSize, setTeamSize]     = useState(3);

  const monthlyLost    = jobValue * missedCalls * 4;
  const yearlyGain     = monthlyLost * 12 * teamSize;
  const subscriptionAnnual = SUBSCRIPTION * 12;
  const roi            = Math.round((yearlyGain - subscriptionAnnual) / subscriptionAnnual * 100);

  const sliders = [
    {
      label:   `Average Job Value: ${formatDollar(jobValue)}`,
      value:   jobValue,
      min:     100,
      max:     5000,
      step:    50,
      onChange: (v: number) => setJobValue(v),
    },
    {
      label:   `Missed Calls per Week: ${missedCalls}`,
      value:   missedCalls,
      min:     1,
      max:     50,
      step:    1,
      onChange: (v: number) => setMissedCalls(v),
    },
    {
      label:   `Team Size: ${teamSize} ${teamSize === 1 ? 'person' : 'people'}`,
      value:   teamSize,
      min:     1,
      max:     25,
      step:    1,
      onChange: (v: number) => setTeamSize(v),
    },
  ];

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        {/* Card */}
        <div style={{
          background: 'rgba(10,20,40,0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(59,130,246,0.18)',
          borderRadius: '24px',
          padding: 'clamp(28px, 6vw, 52px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>
          {/* Heading */}
          <div style={{ marginBottom: '36px' }}>
            <span style={{
              display: 'inline-block',
              marginBottom: '12px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#3b82f6',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '20px',
              padding: '4px 14px',
            }}>ROI Calculator</span>
            <h2 style={{
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              margin: '0 0 10px',
              background: 'linear-gradient(135deg, #93c5fd 0%, #bfdbfe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Stop Leaving Money on the Table
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>
              Drag the sliders to see your real revenue opportunity.
            </p>
          </div>

          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '36px' }}>
            {sliders.map((s) => (
              <div key={s.label.split(':')[0]}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: '10px' }}>
                  {s.label}
                </label>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.value}
                  onChange={(e) => s.onChange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer', height: '4px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>
                  <span>{s.min}</span>
                  <span>{s.max}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Results grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '32px' }}>
            {/* Monthly lost */}
            <div style={{
              padding: '20px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '16px',
            }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f87171', margin: '0 0 8px' }}>Monthly Revenue Lost</p>
              <p style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: '#ef4444', margin: 0, letterSpacing: '-0.02em' }}>{formatDollar(monthlyLost)}</p>
            </div>

            {/* Yearly opportunity */}
            <div style={{
              padding: '20px',
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '16px',
            }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4ade80', margin: '0 0 8px' }}>Yearly Opportunity</p>
              <p style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: '#22c55e', margin: 0, letterSpacing: '-0.02em' }}>{formatDollar(yearlyGain)}</p>
            </div>
          </div>

          {/* ROI banner */}
          <div style={{
            textAlign: 'center',
            padding: '28px',
            background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
          }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: '0 0 6px' }}>FieldOps Pro Estimated ROI</p>
            <p style={{ fontSize: 'clamp(44px, 10vw, 64px)', fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {roi > 0 ? `${roi.toLocaleString()}%` : '—'}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>Based on a $297/mo subscription</p>
          </div>
        </div>
      </div>
    </section>
  );
}
