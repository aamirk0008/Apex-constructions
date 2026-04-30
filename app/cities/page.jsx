import Link from 'next/link';
import { CITIES } from '../../lib/cities';

export const metadata = {
  title: 'Construction Services Across India | BuildRight',
  description: 'BuildRight offers construction services across 20+ cities in India including Delhi, Mumbai, Bangalore, Pune, Hyderabad, Indore, Bhopal and more.',
};

export default function CitiesPage() {
  return (
    <>
      <style>{`
        .city-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 14px; padding: 28px 24px; text-decoration: none;
          display: block; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          position: relative; overflow: hidden;
        }
        .city-card:hover {
          border-color: var(--accent); transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(200,137,26,0.12);
        }
        .city-card:hover .city-arrow { transform: translateX(4px); }
        .city-arrow { transition: transform 0.2s; display: inline-block; }
        @media (max-width: 640px) {
          .cities-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .cities-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: 'var(--ink)', paddingTop: 120, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(200,137,26,0.06)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,26,0.15)', border: '1px solid rgba(200,137,26,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Pan India</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 16 }}>
              We Build Across<br /><span style={{ color: 'var(--accent-light)' }}>20+ Cities in India</span>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>
              From Delhi to Bangalore, Mumbai to Indore — BuildRight brings the same quality, transparency and on-time delivery to every city we operate in.
            </p>
          </div>
        </div>
      </section>

      {/* Cities grid */}
      <section style={{ background: 'var(--bg)', padding: '64px 0 80px' }}>
        <div className="container">
          <div className="cities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {CITIES.map((city, i) => (
              <Link key={city.slug} href={`/cities/${city.slug}`} className="city-card">
                {/* Background number */}
                <div aria-hidden style={{ position: 'absolute', top: -10, right: 16, fontFamily: 'var(--font-display)', fontSize: 80, fontWeight: 900, color: 'rgba(200,137,26,0.06)', lineHeight: 1, userSelect: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{city.state}</p>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>{city.shortName}</h2>
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-bg)', border: '1px solid rgba(200,137,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="city-arrow" style={{ color: 'var(--accent)', fontSize: 16 }}>→</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>{city.projectCount}+</p>
                    </div>
                    <div style={{ width: 1, background: 'var(--border)' }} />
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rate / sq ft</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>{city.avgCost}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {city.popular.slice(0, 2).map(s => (
                      <span key={s} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 99, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--accent)', padding: '56px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 6 }}>
              Your city not listed?
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>
              We take projects in cities beyond this list. Contact us and we&apos;ll let you know.
            </p>
          </div>
          <Link href="/contact" style={{ background: 'white', color: 'var(--accent)', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Ask About Your City →
          </Link>
        </div>
      </section>
    </>
  );
}