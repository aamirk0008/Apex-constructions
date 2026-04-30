import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description: 'BuildRight Construction — 18 years of building quality homes and commercial spaces across India. Meet our team and learn our story.',
};

const TIMELINE = [
  { year: '2006', title: 'Founded in Indore', desc: 'Started as a small contractor firm with 3 workers and a single residential project in Vijay Nagar, Indore.' },
  { year: '2009', title: 'First Commercial Project', desc: 'Delivered our first commercial complex in Bhopal — a 4,000 sq ft retail space on MP Nagar. A turning point.' },
  { year: '2012', title: 'Expanded to 5 Cities', desc: 'Opened operations in Delhi, Pune, and Jaipur. Team grew to 45 engineers, supervisors and skilled workers.' },
  { year: '2015', title: 'RERA Registration', desc: 'Became one of the first contractors in MP to register under RERA, cementing our commitment to transparency.' },
  { year: '2018', title: '100 Projects Milestone', desc: 'Crossed 100 completed projects. Expanded to Bangalore, Hyderabad and Mumbai with dedicated site teams.' },
  { year: '2021', title: 'ISO 9001 Certified', desc: 'Achieved ISO 9001:2015 certification for quality management systems — the only ISO-certified contractor in our region.' },
  { year: '2024', title: '150+ Projects, 20+ Cities', desc: 'Today we operate across 20+ cities with 80+ team members and ₹200Cr+ worth of construction delivered.' },
];

const TEAM = [
  { name: 'Mohammad Arif Sheikh', role: 'Founder & Managing Director', exp: '25 years experience', initial: 'MA', desc: 'Civil Engineer from NIT Bhopal. Built the company from a 3-person team to a 80-member organization.' },
  { name: 'Rahul Sharma', role: 'Chief Engineer', exp: '18 years experience', initial: 'RS', desc: 'Structural specialist with expertise in high-rise commercial buildings and earthquake-resistant design.' },
  { name: 'Priya Verma', role: 'Head of Projects', exp: '12 years experience', initial: 'PV', desc: 'Manages all ongoing projects simultaneously. Known for never missing a deadline in 12 years.' },
  { name: 'Aakash Gupta', role: 'Business Development', exp: '8 years experience', initial: 'AG', desc: 'Manages client relationships and new project acquisition across all 20+ cities we operate in.' },
];

const VALUES = [
  { icon: '🤝', title: 'Transparency First', desc: 'Detailed written contracts, milestone-wise billing, and weekly photo updates to every client. No surprises.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: '94% of our projects are delivered on or before schedule. We treat your timeline as seriously as our own.' },
  { icon: '🏆', title: 'Quality Without Compromise', desc: 'We use only branded materials — Ultratech, ACC, Havells, Legrand. Never substituted without client approval.' },
  { icon: '🔍', title: 'Engineer on Every Site', desc: 'Every project has a dedicated site engineer who reports daily and is reachable by client at all times.' },
  { icon: '💰', title: 'Fair Pricing', desc: 'Our estimates are detailed line-item quotes — not lump sums. You know exactly what you are paying for.' },
  { icon: '✅', title: 'Post-Completion Warranty', desc: '1-year structural warranty on every project. We come back and fix any defect that appears, no questions asked.' },
];

const STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '18',   label: 'Years in Business' },
  { value: '80+',  label: 'Team Members' },
  { value: '20+',  label: 'Cities Covered' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '₹200Cr+', label: 'Value Constructed' },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        .timeline-item { display: flex; gap: 28px; position: relative; padding-bottom: 36px; }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-item:last-child .timeline-line { display: none; }
        .timeline-line {
          position: absolute; left: 19px; top: 40px; bottom: 0;
          width: 2px; background: linear-gradient(to bottom, var(--accent), var(--border));
        }
        .timeline-dot {
          width: 40px; height: 40px; border-radius: '50%'; flex-shrink: 0;
          border-radius: 50%; background: var(--ink);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-size: 11px; font-weight: 800;
          color: var(--accent-light); letter-spacing: -0.02em; z-index: 1;
          position: relative;
        }

        .team-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 14px; padding: 28px 24px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .team-card:hover { border-color: var(--accent); transform: translateY(-3px); }

        .value-card {
          background: var(--bg); border: 1px solid var(--border);
          border-radius: 12px; padding: 28px 24px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .value-card:hover { border-color: var(--accent); box-shadow: 0 8px 32px rgba(200,137,26,0.1); }

        .cert-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 10px; padding: 14px 20px;
        }

        @media (max-width: 768px) {
          .about-hero-grid  { grid-template-columns: 1fr !important; }
          .team-grid        { grid-template-columns: 1fr 1fr !important; }
          .values-grid      { grid-template-columns: 1fr !important; }
          .stats-grid-about { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 480px) {
          .team-grid        { grid-template-columns: 1fr !important; }
          .stats-grid-about { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--ink)', paddingTop: 120, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: -120, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(200,137,26,0.06)' }} />

        <div className="container">
          <div className="about-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,26,0.15)', border: '1px solid rgba(200,137,26,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Our Story</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 20 }}>
                18 Years of Building<br /><span style={{ color: 'var(--accent-light)' }}>India&apos;s Dreams.</span>
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>
                What started as a 3-person team in Indore in 2006 has grown into one of India&apos;s most trusted construction companies — 150+ projects, 20+ cities, and thousands of happy families and businesses.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link href="/projects" style={{ background: 'var(--accent)', color: 'white', padding: '13px 28px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                  View Our Work
                </Link>
                <Link href="/contact" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', padding: '13px 28px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                  Meet the Team
                </Link>
              </div>
            </div>

            {/* Stats card */}
            <div>
              <div className="stats-grid-about" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
                {STATS.map(({ value, label }, i) => (
                  <div key={label} style={{
                    background: i === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: i === 0 ? '12px 0 0 0' : i === 2 ? '0 12px 0 0' : i === 3 ? '0 0 0 12px' : i === 5 ? '0 0 12px 0' : '0',
                    padding: '24px 20px', textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: 'white', lineHeight: 1, marginBottom: 4 }}>{value}</p>
                    <p style={{ fontSize: 11, color: i === 0 ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', lineHeight: 1.3 }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['RERA Registered', 'ISO 9001:2015', '18 Yrs Experience'].map(c => (
                  <div key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '6px 14px' }}>
                    <span style={{ color: 'var(--accent)', fontSize: 12 }}>✓</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Story (prose) ── */}
      <section style={{ background: 'var(--bg)', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 100 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 900, color: 'var(--accent)', lineHeight: 1, opacity: 0.2 }}>Our<br />Story</p>
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--ink)', marginBottom: 20 }}>
                Built on Trust, One Project at a Time
              </h2>
              <p style={{ fontSize: 16, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.85, marginBottom: 20 }}>
                In 2006, Mohammad Arif Sheikh — a young civil engineer from NIT Bhopal — started BuildRight with a simple belief: that construction clients deserve honesty, quality, and respect. The industry was riddled with contractors who overpromised and underdelivered. He wanted to change that.
              </p>
              <p style={{ fontSize: 16, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.85, marginBottom: 20 }}>
                The first project — a modest 1,200 sq ft home in Vijay Nagar, Indore — was delivered 5 days early and ₹40,000 under budget. The client referred 3 more families. Word spread. The team grew.
              </p>
              <p style={{ fontSize: 16, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.85 }}>
                Today, 18 years later, BuildRight operates across 20+ cities, has completed ₹200Cr+ worth of construction, and holds an ISO 9001:2015 certification. But the core belief remains the same — build right, every single time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Journey</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: 'var(--ink)' }}>
              18 Years in the Making
            </h2>
          </div>

          <div>
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="timeline-item">
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div className="timeline-dot">{item.year.slice(2)}</div>
                  {i < TIMELINE.length - 1 && <div className="timeline-line" />}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: 'var(--ink)' }}>{item.title}</p>
                    <span style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, background: 'var(--accent-bg)', padding: '2px 10px', borderRadius: 99, border: '1px solid rgba(200,137,26,0.2)' }}>{item.year}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ background: 'var(--bg)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>What We Stand For</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: 'var(--ink)' }}>Our Values</h2>
          </div>
          <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="value-card">
                <div style={{ width: 48, height: 48, background: 'var(--accent-bg)', border: '1px solid rgba(200,137,26,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>The People</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: 'var(--ink)' }}>Meet Our Leadership</h2>
          </div>
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {TEAM.map(({ name, role, exp, initial, desc }) => (
              <div key={name} className="team-card">
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--accent-light)', marginBottom: 16 }}>
                  {initial}
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{name}</p>
                <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 2 }}>{role}</p>
                <p style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>{exp}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '56px 0' }}>
        <div className="container">
          <p style={{ fontSize: 13, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24, textAlign: 'center' }}>Certifications & Credentials</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {[
              { icon: '🏛️', title: 'RERA Registered', sub: 'MP RERA No. P-12345' },
              { icon: '✅', title: 'ISO 9001:2015', sub: 'Quality Management Systems' },
              { icon: '🔒', title: 'GST Registered', sub: 'GSTIN: 23XXXXX1234Z1' },
              { icon: '⭐', title: '98% Client Satisfaction', sub: 'Based on 150+ projects' },
              { icon: '🛡️', title: '1-Year Warranty', sub: 'Structural defect coverage' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="cert-badge">
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 2 }}>{title}</p>
                  <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--ink)', padding: '72px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 14 }}>
            Ready to Build With Us?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginBottom: 36, lineHeight: 1.7 }}>
            18 years of trust, 150+ completed projects, and a team that treats your project like their own.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/estimate" style={{ background: 'var(--accent)', color: 'white', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Get Free Estimate
            </Link>
            <Link href="/projects" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}