import Link from 'next/link';

export const metadata = {
  title: 'Construction Services',
  description: 'BuildRight offers residential home construction, commercial complexes, shops, showrooms and renovation services across 20+ cities in India.',
};

const SERVICES = [
  {
    id: 'residential',
    icon: '🏠',
    title: 'Residential Construction',
    tagline: 'Your dream home, built right.',
    color: '#C8891A',
    desc: 'We build independent homes, villas, duplexes and bungalows from foundation to finishing — with vastu-compliant layouts, premium materials and complete transparency at every stage.',
    includes: [
      'Site survey & soil testing',
      'Architectural & structural design',
      'Foundation & RCC frame',
      'Brick masonry & plastering',
      'Electrical & plumbing works',
      'Flooring, tiles & painting',
      'Doors, windows & ironmongery',
      'Kitchen & bathroom fitting',
      'Exterior finishing & landscaping',
      'Final inspection & handover',
    ],
    popular: ['Independent Houses', 'Luxury Villas', 'Duplex Homes', 'Farm Houses', 'Builder Floors'],
    timeline: '10–20 months',
    startingAt: '₹1,600/sq ft',
    cta: 'Get Home Estimate',
  },
  {
    id: 'commercial',
    icon: '🏢',
    title: 'Commercial Construction',
    tagline: 'Spaces that mean business.',
    color: '#4A7C59',
    desc: 'From single-floor offices to multi-storey commercial complexes — we build RERA-compliant commercial structures engineered for longevity, functionality and impressive aesthetics.',
    includes: [
      'Feasibility & zoning analysis',
      'Structural engineering & design',
      'High-load bearing foundations',
      'RCC frame with commercial specs',
      'Glass facades & curtain walls',
      'Lift shafts & escalator provision',
      'Fire safety & sprinkler systems',
      'Parking & drainage infrastructure',
      'Common area finishing',
      'Occupancy certificate support',
    ],
    popular: ['Office Complexes', 'Shopping Malls', 'IT Parks', 'Hotels', 'Hospitals'],
    timeline: '18–36 months',
    startingAt: '₹1,900/sq ft',
    cta: 'Get Commercial Estimate',
  },
  {
    id: 'retail',
    icon: '🏪',
    title: 'Shops & Showrooms',
    tagline: 'First impressions built in brick.',
    color: '#5B6FA6',
    desc: 'Retail spaces that attract customers and maximise footfall. We specialise in showroom construction, strip malls, food courts and standalone retail — with high-quality facades and optimised interiors.',
    includes: [
      'Retail layout planning',
      'High-ceiling construction',
      'Glass front facades',
      'Mezzanine floors',
      'Display area optimisation',
      'Strong flooring (vitrified/marble)',
      'LED & ambient lighting provision',
      'HVAC provision',
      'Signage mounting infrastructure',
      'Fire NOC support',
    ],
    popular: ['Automobile Showrooms', 'Clothing Outlets', 'Restaurants', 'Medical Clinics', 'Banks'],
    timeline: '6–14 months',
    startingAt: '₹1,750/sq ft',
    cta: 'Get Retail Estimate',
  },
  {
    id: 'renovation',
    icon: '🔧',
    title: 'Renovation & Remodelling',
    tagline: 'Transform what you already have.',
    color: '#9B6B9B',
    desc: 'Breathe new life into your existing structure without the cost of rebuilding. We handle complete renovations — structural upgrades, new interiors, kitchen & bathroom overhaul, and building extensions.',
    includes: [
      'Structural assessment',
      'Demolition & debris removal',
      'RCC strengthening if needed',
      'New electrical rewiring',
      'Plumbing replacement',
      'New flooring throughout',
      'Modular kitchen installation',
      'Bathroom renovation',
      'Fresh plastering & painting',
      'Door & window replacement',
    ],
    popular: ['Home Renovation', 'Office Makeovers', 'Kitchen Remodelling', 'Bathroom Upgrades', 'Building Extensions'],
    timeline: '3–8 months',
    startingAt: '₹900/sq ft',
    cta: 'Get Renovation Estimate',
  },
];

const PROCESS = [
  { n: '01', title: 'Free Consultation', desc: 'Call us or fill the form. We discuss your requirements, timeline and budget — completely free, no obligation.' },
  { n: '02', title: 'Site Visit', desc: 'Our engineer visits your site for a detailed assessment, soil check and feasibility review. Also free.' },
  { n: '03', title: 'Detailed Quote', desc: 'We send a line-item written quotation — not a lump sum. You know exactly what every rupee goes into.' },
  { n: '04', title: 'Contract Signing', desc: 'A clear contract covers scope, timeline, milestones, payment schedule and warranty terms. No surprises.' },
  { n: '05', title: 'Construction Begins', desc: 'Your dedicated site engineer starts work. You get weekly photo updates and can call them directly any time.' },
  { n: '06', title: 'Handover & Warranty', desc: 'Final walkthrough, snag list cleared, and keys handed over. 1-year structural warranty begins from this date.' },
];

export default function ServicesPage() {
  return (
    <>
      <style>{`
        .service-section { scroll-margin-top: 80px; }

        .include-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 0; border-bottom: 1px solid var(--border);
          font-size: 14px; color: var(--ink-muted); font-family: var(--font-body);
        }
        .include-item:last-child { border-bottom: none; }

        .popular-tag {
          display: inline-block; padding: 5px 12px; border-radius: 99px;
          background: var(--bg); border: 1px solid var(--border);
          font-size: 12px; font-family: var(--font-body); font-weight: 500;
          color: var(--ink-muted);
        }

        .service-cta {
          display: inline-block; padding: 12px 24px; border-radius: 8px;
          font-family: var(--font-body); font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.2s;
          background: var(--ink); color: white;
        }
        .service-cta:hover { background: var(--accent); transform: translateY(-1px); }

        .process-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 12px; padding: 28px 24px;
          transition: border-color 0.2s;
        }
        .process-card:hover { border-color: var(--accent); }

        .nav-pill {
          padding: 8px 18px; border-radius: 99px; text-decoration: none;
          font-size: 13px; font-family: var(--font-body); font-weight: 500;
          background: var(--bg-card); border: 1px solid var(--border);
          color: var(--ink-muted); transition: all 0.18s; white-space: nowrap;
        }
        .nav-pill:hover { border-color: var(--accent); color: var(--accent-dark); background: var(--accent-bg); }

        @media (max-width: 900px) {
          .service-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 540px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--ink)', paddingTop: 120, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(200,137,26,0.06)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,26,0.15)', border: '1px solid rgba(200,137,26,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>What We Build</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 18 }}>
              Construction Services<br /><span style={{ color: 'var(--accent-light)' }}>For Every Need.</span>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.75, marginBottom: 36, maxWidth: 500 }}>
              From a single home to a 20,000 sq ft commercial complex — we bring the same precision, transparency and quality to every project.
            </p>

            {/* Quick nav */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SERVICES.map(s => (
                <a key={s.id} href={`#${s.id}`} className="nav-pill">{s.icon} {s.title.split(' ')[0]}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Service sections ── */}
      {SERVICES.map((service, i) => (
        <section key={service.id} id={service.id} className="service-section"
          style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '72px 0' }}>
          <div className="container">
            <div className="service-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>

              {/* Left */}
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: service.color + '18', border: `1px solid ${service.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                    {service.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Service</p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--ink)' }}>{service.title}</h2>
                  </div>
                </div>

                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: service.color, marginBottom: 16, fontWeight: 600 }}>
                  &ldquo;{service.tagline}&rdquo;
                </p>

                <p style={{ fontSize: 15, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.8, marginBottom: 24 }}>
                  {service.desc}
                </p>

                {/* Key stats */}
                <div style={{ display: 'flex', gap: 24, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Timeline</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>{service.timeline}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Starting At</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: service.color }}>{service.startingAt}</p>
                  </div>
                </div>

                {/* Popular types */}
                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Popular Types</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {service.popular.map(p => <span key={p} className="popular-tag">{p}</span>)}
                  </div>
                </div>

                <Link href="/estimate" className="service-cta">{service.cta} →</Link>
              </div>

              {/* Right: What's included */}
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: 28 }}>
                  <p style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                    What&apos;s Included
                  </p>
                  {service.includes.map((item, idx) => (
                    <div key={idx} className="include-item">
                      <span style={{ color: service.color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}

                  {/* Guarantee strip */}
                  <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--accent-bg)', border: '1px solid rgba(200,137,26,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>🛡️</span>
                    <p style={{ fontSize: 13, color: 'var(--accent-dark)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                      1-year structural warranty included on all projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Our Process ── */}
      <section style={{ background: 'var(--ink)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>How It Works</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: 'white' }}>
              From First Call to Handover
            </h2>
          </div>

          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {PROCESS.map(({ n, title, desc }) => (
              <div key={n} className="process-card" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'var(--accent)', opacity: 0.6, lineHeight: 1, marginBottom: 12 }}>{n}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 8 }}>{title}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 580 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, color: 'var(--ink)', marginBottom: 12 }}>
            Not sure which service you need?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', marginBottom: 32, lineHeight: 1.7 }}>
            Tell us about your project and we&apos;ll recommend the right approach, timeline and cost — for free.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/estimate" style={{ background: 'var(--accent)', color: 'white', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(200,137,26,0.3)' }}>
              Get Free Estimate
            </Link>
            <Link href="/contact" style={{ background: 'var(--bg-card)', color: 'var(--ink)', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1.5px solid var(--border-strong)' }}>
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}