import CostEstimator from '../../components/estimate/CostEstimator';

export const metadata = {
  title: 'Free Construction Cost Estimator',
  description: 'Get an instant construction cost estimate for your home, commercial complex or shop. Enter area, quality and city — results in 2 minutes.',
};

const FAQS = [
  {
    q: 'How accurate is this estimate?',
    a: 'This tool provides a ±10–15% indicative range based on current market rates. Actual cost depends on soil condition, design complexity, and local material availability. A site visit gives you a precise quote.',
  },
  {
    q: 'What is included in the estimate?',
    a: 'Structure, civil work, finishing (flooring, paint, plaster), electrical, plumbing, doors & windows, and labour. It excludes land cost, architect fees, government approvals, and interior furnishings.',
  },
  {
    q: 'How long does construction take?',
    a: 'A 1,000 sq ft home typically takes 10–14 months. Commercial projects vary widely by size. We provide a detailed timeline during the project planning phase.',
  },
  {
    q: 'Do you offer EMI or payment plans?',
    a: 'Yes. We work with milestone-based payment plans — advance, foundation, slab, brick work, finishing, and possession. We can also connect you with bank loan partners.',
  },
];

export default function EstimatePage() {
  return (
    <>
      <style>{`
        .faq-item { border-bottom: 1px solid var(--border); padding: 20px 0; }
        .faq-q { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .faq-a { font-family: var(--font-body); font-size: 14px; color: var(--ink-muted); line-height: 1.7; }
        .trust-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px; padding: 6px 14px;
          font-family: var(--font-body); font-size: 13px; color: rgba(255,255,255,0.8);
        }
        @media (max-width: 900px) {
          .estimate-main-grid { grid-template-columns: 1fr !important; }
          .estimate-sidebar { padding-top: 0 !important; }
        }
        @media (max-width: 600px) {
          .estimate-card { padding: 24px 20px !important; }
        }
      `}</style>

      {/* ── Page header ── */}
      <section style={{ background: 'var(--ink)', paddingTop: 120, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(200,137,26,0.08)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,26,0.15)', border: '1px solid rgba(200,137,26,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Free Tool</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Construction Cost<br /><span style={{ color: 'var(--accent-light)' }}>Estimator</span>
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: 28, maxWidth: 520 }}>
              Get an instant ballpark cost for your construction project. 5 simple questions, 2 minutes, no registration needed.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['✓ No registration', '✓ Instant results', '✓ 100% free', '✓ Pan India rates'].map(t => (
                <span key={t} className="trust-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Estimator + Sidebar ── */}
      <section style={{ background: 'var(--bg)', padding: '0 0 80px' }}>
        <div className="container">
          <div className="estimate-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start', marginTop: 40 }}>

            {/* Estimator card */}
            <div className="estimate-card" style={{ background: 'white', borderRadius: 16, padding: '40px', boxShadow: '0 8px 48px rgba(0,0,0,0.1)', border: '1px solid var(--border)' }}>
              <CostEstimator />
            </div>

            {/* Sidebar */}
            <div className="estimate-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 0 }}>

              {/* Why us */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>Why choose BuildRight?</p>
                {[
                  { icon: '🏆', text: '150+ projects delivered on time' },
                  { icon: '💰', text: 'Transparent pricing, no hidden costs' },
                  { icon: '📋', text: 'Detailed written contract upfront' },
                  { icon: '🔍', text: 'Site engineer assigned to every project' },
                  { icon: '📸', text: 'Weekly photo updates to client' },
                  { icon: '✅', text: '1-year structural defect warranty' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                    <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Call CTA */}
              <div style={{ background: 'var(--accent)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 6 }}>Want to talk directly?</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', marginBottom: 16 }}>Call us for a free 15-minute consultation</p>
                <a href="tel:+919876543210" style={{ display: 'block', background: 'white', color: 'var(--accent)', padding: '11px 20px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                  📞 +91 78912 50008
                </a>
              </div>

              {/* Recent project */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
                <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Recent Project</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>Verma Villa, Indore</p>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>3,200 sq ft · Premium · Delivered 12 days early</p>
                <div style={{ display: 'flex', gap: 16 }}>
                  {[['₹1.2 Cr', 'Final Cost'], ['16 mo', 'Duration'], ['5 ★', 'Rating']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color: 'var(--ink)' }}>{v}</p>
                      <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 40, textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {FAQS.map(({ q, a }) => (
            <div key={q} className="faq-item">
              <p className="faq-q">{q}</p>
              <p className="faq-a">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}