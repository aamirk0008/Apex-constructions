import Link from 'next/link';

const SERVICES = ['Residential Homes', 'Commercial Complexes', 'Shops & Showrooms', 'Renovations', 'Interiors'];
const CITIES   = ['Delhi', 'Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Bhopal', 'Indore', 'Lucknow'];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)', color: 'rgba(255,255,255,0.65)',
      fontFamily: 'var(--font-body)',
    }}>
      <style>{`
        .footer-link {
          display: block; margin-bottom: 10px; font-size: 14px;
          color: rgba(255,255,255,0.65); transition: color 0.2s; text-decoration: none;
        }
        .footer-link:hover { color: white; }
        .footer-city-link {
          font-size: 14px; color: rgba(255,255,255,0.65);
          transition: color 0.2s; text-decoration: none;
        }
        .footer-city-link:hover { color: white; }
        .footer-bottom-link {
          color: rgba(255,255,255,0.65); transition: color 0.2s; text-decoration: none;
        }
        .footer-bottom-link:hover { color: white; }
        .footer-cta-btn {
          background: var(--accent); color: white;
          padding: 14px 32px; border-radius: 4px;
          font-weight: 500; font-size: 15px; white-space: nowrap;
          transition: background 0.2s; text-decoration: none; display: inline-block;
        }
        .footer-cta-btn:hover { background: var(--accent-dark); }
        .footer-social-icon {
          width: 36px; height: 36px; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; cursor: pointer; transition: border-color 0.2s;
        }
        .footer-social-icon:hover { border-color: rgba(255,255,255,0.35); }
      `}</style>

      {/* Top CTA strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '48px 0' }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 6 }}>
              Ready to build your dream project?
            </p>
            <p style={{ fontSize: 15 }}>Get a free cost estimate in under 2 minutes.</p>
          </div>
          <Link href="/estimate" className="footer-cta-btn">Get Free Estimate →</Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container" style={{ padding: '64px 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40 }}>
          {/* Brand */}
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 12 }}>
              Build<span style={{ color: 'var(--accent)' }}>Right</span>
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Building quality structures across India since 2008. Over 150 completed projects, 20+ cities.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['📞', '📧', '📍'].map((icon, i) => (
                <span key={i} className="footer-social-icon">{icon}</span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ color: 'white', fontWeight: 500, marginBottom: 16, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Services</p>
            {SERVICES.map(s => (
              <Link key={s} href="/services" className="footer-link">{s}</Link>
            ))}
          </div>

          {/* Cities */}
          <div>
            <p style={{ color: 'white', fontWeight: 500, marginBottom: 16, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>We Serve</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 8px' }}>
              {CITIES.map(c => (
                <Link key={c} href={`/cities/${c.toLowerCase()}`} className="footer-city-link">{c}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: 'white', fontWeight: 500, marginBottom: 16, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Contact</p>
            {[
              { icon: '📞', text: '+91 98765 43210' },
              { icon: '📧', text: 'hello@buildright.in' },
              { icon: '📍', text: 'New Delhi, India' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 10, marginBottom: 14, fontSize: 14 }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(200,137,26,0.12)', border: '1px solid rgba(200,137,26,0.25)', borderRadius: 4 }}>
              <p style={{ fontSize: 12, color: 'var(--accent-light)', marginBottom: 4 }}>Response time</p>
              <p style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>Within 2 hours on weekdays</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: 13 }}>
          <p>© {new Date().getFullYear()} BuildRight Construction. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/privacy"     className="footer-bottom-link">Privacy Policy</Link>
            <Link href="/terms"       className="footer-bottom-link">Terms</Link>
            <Link href="/sitemap.xml" className="footer-bottom-link">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}