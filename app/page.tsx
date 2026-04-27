import Link from 'next/link';

/* ─── Data ─────────────────────────────────────────────── */

const STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '18',   label: 'Years Experience' },
  { value: '20+',  label: 'Cities Served' },
  { value: '98%',  label: 'Client Satisfaction' },
];

const SERVICES = [
  {
    icon: '🏠',
    title: 'Residential Homes',
    desc: 'Turnkey home construction from plot to possession. Custom designs, vastu-compliant layouts, premium finishes.',
    href: '/services#residential',
  },
  {
    icon: '🏢',
    title: 'Commercial Complexes',
    desc: 'Offices, malls, and multi-storey commercial buildings built to last with structural integrity guaranteed.',
    href: '/services#commercial',
  },
  {
    icon: '🏪',
    title: 'Shops & Showrooms',
    desc: 'Retail-ready construction with attractive facades, strong flooring, and optimised interior layouts.',
    href: '/services#retail',
  },
  {
    icon: '🔧',
    title: 'Renovation & Remodelling',
    desc: 'Transform your existing property with structural upgrades, fresh interiors, and modern extensions.',
    href: '/services#renovation',
  },
];

const PROJECTS = [
  { title: 'Sharma Residence',      location: 'New Delhi', type: 'Residential', area: '2,800 sq ft', color: '#C8891A' },
  { title: 'Sunrise Commercial Hub', location: 'Pune',      type: 'Commercial',  area: '12,000 sq ft', color: '#4A7C59' },
  { title: 'Gupta Shopping Centre',  location: 'Bhopal',    type: 'Retail',      area: '6,400 sq ft',  color: '#5B6FA6' },
];

const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma', city: 'New Delhi', project: 'Residential Home', initials: 'RS',
    text: 'BuildRight delivered my dream home on time and within budget. Their team was transparent throughout and the quality is outstanding. I get compliments from every visitor.',
  },
  {
    name: 'Priya Mehta', city: 'Pune', project: 'Office Complex', initials: 'PM',
    text: 'We needed a commercial building with specific structural requirements. The team understood our vision, handled all permissions and delivered a world-class office space.',
  },
  {
    name: 'Suresh Patel', city: 'Bhopal', project: 'Shopping Centre', initials: 'SP',
    text: 'From the free estimate to handover, every step was professional. The cost estimator tool on their website gave me an accurate range before I even called them. Impressive!',
  },
];

const CITIES = ['Delhi', 'Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Bhopal', 'Indore', 'Lucknow', 'Jaipur', 'Ahmedabad', 'Surat', 'Nagpur'];

/* ─── Page ──────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <style>{`
        /* Service cards */
        .service-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px;
          display: block;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .service-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(200,137,26,0.12);
        }

        /* Project cards */
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          display: block;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.1);
        }

        /* Navbar link hover (inside page, not layout) */
        .hero-link-primary {
          background: var(--accent); color: white;
          padding: 16px 32px; border-radius: 4px;
          font-family: var(--font-body); font-size: 16px; font-weight: 500;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background 0.2s;
          box-shadow: 0 4px 20px rgba(200,137,26,0.3);
          text-decoration: none;
        }
        .hero-link-primary:hover { background: var(--accent-dark); }

        .hero-link-secondary {
          background: transparent; color: var(--ink);
          padding: 16px 32px; border-radius: 4px;
          font-family: var(--font-body); font-size: 16px; font-weight: 500;
          border: 1px solid var(--border-strong);
          display: inline-flex; align-items: center; gap: 8px;
          transition: border-color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .hero-link-secondary:hover { border-color: var(--ink); background: rgba(26,23,20,0.04); }

        .estimate-cta-btn {
          background: var(--ink); color: white;
          padding: 18px 40px; border-radius: 4px; white-space: nowrap;
          font-family: var(--font-body); font-size: 16px; font-weight: 500;
          transition: background 0.2s; text-decoration: none; display: inline-block;
        }
        .estimate-cta-btn:hover { background: #333; }

        .final-cta-primary {
          background: var(--accent); color: white;
          padding: 18px 40px; border-radius: 4px;
          font-family: var(--font-body); font-size: 16px; font-weight: 500;
          box-shadow: 0 4px 24px rgba(200,137,26,0.35);
          transition: background 0.2s; text-decoration: none; display: inline-block;
        }
        .final-cta-primary:hover { background: var(--accent-dark); }

        .final-cta-secondary {
          background: transparent; color: white;
          padding: 18px 40px; border-radius: 4px;
          font-family: var(--font-body); font-size: 16px; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.2);
          transition: border-color 0.2s; text-decoration: none; display: inline-block;
        }
        .final-cta-secondary:hover { border-color: rgba(255,255,255,0.5); }

        .view-all-link {
          font-size: 14px; color: var(--ink-muted);
          font-family: var(--font-body); font-weight: 500;
          border-bottom: 1px solid var(--border-strong); padding-bottom: 2px;
          transition: color 0.2s; text-decoration: none;
        }
        .view-all-link:hover { color: var(--ink); }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
          .estimate-cta-grid { grid-template-columns: 1fr !important; }
          .estimate-cta-btn { text-align: center; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', paddingTop: 68,
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', background: 'var(--bg)',
      }}>
        {/* Background geometric decoration */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, right: 0,
          width: '55%', height: '100%',
          background: 'var(--bg-card)',
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }} />
        {/* Accent top bar */}
        <div aria-hidden style={{
          position: 'absolute', top: 68, left: 0, right: 0,
          height: 3, background: 'var(--accent)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* Left: Text */}
            <div>
              <div className="fade-up fade-up-1" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--accent-bg)', border: '1px solid rgba(200,137,26,0.2)',
                borderRadius: 20, padding: '6px 14px', marginBottom: 28,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                <span style={{ fontSize: 13, color: 'var(--accent-dark)', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                  Pan India Construction Services
                </span>
              </div>

              <h1 className="fade-up fade-up-2" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 5vw, 68px)',
                fontWeight: 900, lineHeight: 1.08,
                color: 'var(--ink)', marginBottom: 24, letterSpacing: '-0.02em',
              }}>
                We Build<br />
                <span style={{ color: 'var(--accent)' }}>Structures</span><br />
                That Last.
              </h1>

              <p className="fade-up fade-up-3" style={{
                fontSize: 18, color: 'var(--ink-muted)', lineHeight: 1.7,
                marginBottom: 40, maxWidth: 440, fontFamily: 'var(--font-body)',
              }}>
                From a single home to a commercial complex — BuildRight delivers quality construction across 20+ cities in India with complete transparency and on-time delivery.
              </p>

              <div className="fade-up fade-up-4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/estimate" className="hero-link-primary">
                  Get Free Estimate
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/projects" className="hero-link-secondary">View Projects</Link>
              </div>

              {/* Trust badges */}
              <div className="fade-up fade-up-5" style={{
                display: 'flex', alignItems: 'center', gap: 24,
                marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)',
              }}>
                {['RERA Registered', 'ISO Certified', '18 Yrs Experience'].map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--accent)', fontSize: 14 }}>✓</span>
                    <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual card stack */}
            <div className="hero-visual fade-up fade-up-3" style={{ position: 'relative', height: 420 }}>
              {/* Main dark card */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: '90%', height: 260,
                background: 'var(--ink)', borderRadius: 12,
                display: 'flex', alignItems: 'flex-end', padding: 24, overflow: 'hidden',
              }}>
                <div aria-hidden style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(135deg, rgba(200,137,26,0.15) 0%, transparent 60%)',
                }} />
                <div style={{ position: 'relative' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'white', fontWeight: 700 }}>
                    Sharma Residence
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: 4 }}>
                    New Delhi · 2,800 sq ft · Residential
                  </p>
                </div>
                <div style={{
                  position: 'absolute', top: 24, right: 24,
                  background: 'var(--accent)', borderRadius: 20,
                  padding: '4px 12px', fontSize: 12, color: 'white',
                  fontFamily: 'var(--font-body)', fontWeight: 500,
                }}>
                  Completed
                </div>
              </div>

              {/* Stats card */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '75%',
                background: 'white', borderRadius: 12, padding: 24,
                boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border)',
              }}>
                <p style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Project Stats
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[['₹85L', 'Budget'], ['14 mo', 'Duration'], ['A++', 'Grade'], ['★ 5.0', 'Rating']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{v}</p>
                      <p style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accent dot */}
              <div style={{
                position: 'absolute', top: '40%', left: '-16px',
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--accent)', opacity: 0.8,
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section style={{ background: 'var(--accent)', padding: '36px 0' }}>
        <div className="container stats-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24, textAlign: 'center',
        }}>
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'white', lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)', marginTop: 4 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              What We Build
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'var(--ink)' }}>
              Our Services
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {SERVICES.map(({ icon, title, desc, href }) => (
              <Link key={title} href={href} className="service-card">
                <div style={{
                  width: 52, height: 52, background: 'var(--accent-bg)',
                  border: '1px solid rgba(200,137,26,0.15)',
                  borderRadius: 8, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 22, marginBottom: 20,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                  {desc}
                </p>
                <p style={{ marginTop: 20, fontSize: 13, color: 'var(--accent)', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Estimate CTA Banner ───────────────────────────── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '64px 0' }}>
        <div className="container estimate-cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
              Wondering how much your project will cost?
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
              Use our free interactive estimator — get an instant cost range in 2 minutes. No registration needed.
            </p>
          </div>
          <Link href="/estimate" className="estimate-cta-btn">Try Cost Estimator →</Link>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                Our Work
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'var(--ink)' }}>
                Featured Projects
              </h2>
            </div>
            <Link href="/projects" className="view-all-link">View all 150+ projects →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {PROJECTS.map(({ title, location, type, area, color }) => (
              <Link key={title} href="/projects" className="project-card">
                {/* Image placeholder */}
                <div style={{
                  height: 200, background: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <span style={{ fontSize: 48, opacity: 0.25 }}>🏗️</span>
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'rgba(255,255,255,0.9)', borderRadius: 20,
                    padding: '4px 12px', fontSize: 12,
                    fontFamily: 'var(--font-body)', fontWeight: 500, color: 'var(--ink)',
                  }}>{type}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                    {title}
                  </h3>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
                    <span>📍 {location}</span>
                    <span>📐 {area}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              Client Stories
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'var(--ink)' }}>
              What Our Clients Say
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {TESTIMONIALS.map(({ name, city, project, text, initials }) => (
              <div key={name} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 32 }}>
                <div style={{ fontSize: 14, color: 'var(--accent)', marginBottom: 20, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: 28, fontStyle: 'italic' }}>
                  "{text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'white',
                  }}>{initials}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, color: 'var(--ink)' }}>{name}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-light)' }}>{city} · {project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cities Marquee ────────────────────────────────── */}
      <section style={{ padding: '48px 0', overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track">
            {[...CITIES, ...CITIES].map((city, i) => (
              <span key={`${city}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '0 32px', whiteSpace: 'nowrap' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--ink-muted)' }}>{city}</span>
                <span style={{ color: 'var(--accent)', fontSize: 12 }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section style={{ background: 'var(--ink)', padding: '96px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Start Today
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
            Let&apos;s Build Something<br />
            <span style={{ color: 'var(--accent-light)' }}>Extraordinary Together.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', maxWidth: 500, margin: '0 auto 48px' }}>
            Talk to our team today. Free consultation, honest pricing, and a commitment to quality.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/estimate" className="final-cta-primary">Get Free Estimate</Link>
            <Link href="/contact"  className="final-cta-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}