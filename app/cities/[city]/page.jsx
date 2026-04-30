import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/lib/cities';
import { PROJECTS } from '../../../lib/projects';

export async function generateStaticParams() {
  return CITIES.map(c => ({ city: c.slug }));
}

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Construction Company in ${city.name} | BuildRight`,
    description: `Best construction company in ${city.name}. Residential homes, commercial complexes & shops. ${city.projectCount}+ projects completed. Free estimate. Call now.`,
    keywords: [
      `construction company in ${city.shortName}`,
      `house construction ${city.shortName}`,
      `building contractor ${city.shortName}`,
      `construction services ${city.shortName}`,
      `${city.shortName} construction cost`,
    ],
  };
}

export default async function CityPage({ params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  // Get projects in this city
  const cityProjects = PROJECTS.filter(p => p.city === citySlug).slice(0, 3);

  const ratePerSqft = {
    basic:    Math.round(1700 * city.multiplier),
    standard: Math.round(2200 * city.multiplier),
    premium:  Math.round(3000 * city.multiplier),
  };

  return (
    <>
      <style>{`
        .city-feature-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 12px; padding: 24px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .city-feature-card:hover { border-color: var(--accent); transform: translateY(-3px); }

        .area-tag {
          display: inline-block; padding: 7px 14px; border-radius: 99px;
          background: var(--bg-card); border: 1px solid var(--border);
          font-size: 13px; font-family: var(--font-body); font-weight: 500;
          color: var(--ink-muted); transition: all 0.18s;
        }
        .area-tag:hover { border-color: var(--accent); color: var(--accent-dark); background: var(--accent-bg); }

        .service-row {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 0; border-bottom: 1px solid var(--border);
        }
        .service-row:last-child { border-bottom: none; }

        .city-project-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 12px; overflow: hidden; text-decoration: none; display: block;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .city-project-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }

        .rate-card {
          border-radius: 12px; padding: 24px; text-align: center;
          border: 2px solid transparent; transition: border-color 0.2s;
          cursor: pointer;
        }
        .rate-card:hover { border-color: var(--accent); }

        @media (max-width: 900px) {
          .city-main-grid { grid-template-columns: 1fr !important; }
          .city-rates-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .city-projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        background: 'var(--ink)', paddingTop: 120, paddingBottom: 64,
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(200,137,26,0.06)' }} />
        <div aria-hidden style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(200,137,26,0.04)' }} />

        <div className="container" style={{ position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <Link href="/cities" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Cities</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{city.name}</span>
          </div>

          <div className="city-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,26,0.15)', border: '1px solid rgba(200,137,26,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {city.state}
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,5vw,58px)',
                fontWeight: 900, color: 'white', lineHeight: 1.08,
                letterSpacing: '-0.02em', marginBottom: 16,
              }}>
                Construction Company<br />
                in <span style={{ color: 'var(--accent-light)' }}>{city.name}</span>
              </h1>

              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
                {city.about}
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/estimate" style={{ background: 'var(--accent)', color: 'white', padding: '13px 28px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                  Get Free Estimate
                </Link>
                <Link href="/contact" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', padding: '13px 28px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                  Call Us
                </Link>
              </div>
            </div>

            {/* City stats card */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28 }}>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                {city.name} At a Glance
              </p>
              {[
                { label: 'Projects Completed', value: `${city.projectCount}+` },
                { label: 'Avg Cost / sq ft',   value: city.avgCost },
                { label: 'City Population',     value: city.population },
                { label: 'Response Time',        value: '< 2 hours' },
                { label: 'Free Site Visit',      value: '✅ Yes' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'white', fontFamily: 'var(--font-body)' }}>{value}</span>
                </div>
              ))}
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210'}?text=${encodeURIComponent(`Hi, I'm looking for construction services in ${city.name}. Can you help?`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', background: '#25D366', color: 'white', padding: '12px', borderRadius: 8, textAlign: 'center', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, textDecoration: 'none', marginTop: 4 }}>
                💬 WhatsApp Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Construction rates ── */}
      <section style={{ background: 'var(--bg)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Local Pricing</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
              Construction Cost in {city.name}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
              Approximate rates per sq ft — inclusive of materials, labour and supervision
            </p>
          </div>

          <div className="city-rates-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 24 }}>
            {[
              { tier: 'Basic',    rate: ratePerSqft.basic,    color: '#F5F2ED', border: '#E0DBD3', desc: 'Standard materials, functional finishes', tags: ['ISI Cement', 'Standard Tiles', 'Basic Fixtures'] },
              { tier: 'Standard', rate: ratePerSqft.standard,  color: '#FDF6E7', border: 'rgba(200,137,26,0.3)', desc: 'Mid-range materials, better finishes', tags: ['Ultratech Cement', 'Vitrified Tiles', 'CP Fittings'] },
              { tier: 'Premium',  rate: ratePerSqft.premium,   color: '#1A1714', border: 'var(--accent)', desc: 'Top-grade materials, architect-supervised', tags: ['ACC Gold', 'Italian Marble', 'Branded Fixtures'] },
            ].map(({ tier, rate, color, border, desc, tags }) => {
              const isDark = tier === 'Premium';
              return (
                <div key={tier} className="rate-card" style={{ background: color, border: `2px solid ${border}` }}>
                  {tier === 'Standard' && (
                    <div style={{ background: 'var(--accent)', color: 'white', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 99, display: 'inline-block', marginBottom: 12 }}>
                      Most Popular
                    </div>
                  )}
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: isDark ? 'white' : 'var(--ink)', marginBottom: 6 }}>{tier}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: isDark ? 'var(--accent-light)' : 'var(--accent)', lineHeight: 1, marginBottom: 4 }}>
                    ₹{rate.toLocaleString()}
                  </p>
                  <p style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.4)' : 'var(--ink-light)', fontFamily: 'var(--font-body)', marginBottom: 16 }}>per sq ft</p>
                  <p style={{ fontSize: 13, color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--ink-muted)', fontFamily: 'var(--font-body)', marginBottom: 16, lineHeight: 1.5 }}>{desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                    {tags.map(t => (
                      <span key={t} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 99, background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(200,137,26,0.1)', color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--accent-dark)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)' }}>
            ⚠️ Rates are indicative and vary by design complexity, soil conditions, and material availability. <Link href="/estimate" style={{ color: 'var(--accent)', fontWeight: 600 }}>Get an exact estimate →</Link>
          </p>
        </div>
      </section>

      {/* ── Services + Areas ── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {/* Services */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--ink)', marginBottom: 24 }}>
                What We Build in {city.shortName}
              </h2>
              {[
                { icon: '🏠', label: 'Residential Homes', desc: 'Independent houses, villas, duplex' },
                { icon: '🏢', label: 'Commercial Complexes', desc: 'Offices, malls, multi-storey buildings' },
                { icon: '🏪', label: 'Shops & Showrooms', desc: 'Retail outlets, showrooms, restaurants' },
                { icon: '🔧', label: 'Renovation & Remodelling', desc: 'Upgrades, extensions, interiors' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="service-row">
                  <div style={{ width: 44, height: 44, background: 'var(--accent-bg)', border: '1px solid rgba(200,137,26,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>{desc}</p>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: 18 }}>→</span>
                </div>
              ))}
            </div>

            {/* Areas served */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--ink)', marginBottom: 24 }}>
                Areas We Cover in {city.shortName}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
                {city.areas.map(area => (
                  <span key={area} className="area-tag">{area}</span>
                ))}
                <span className="area-tag" style={{ color: 'var(--accent)', borderColor: 'rgba(200,137,26,0.3)' }}>+ More areas</span>
              </div>

              {/* Popular constructions */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Popular in {city.shortName}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {city.popular.map(item => (
                    <span key={item} style={{ fontSize: 13, padding: '6px 12px', borderRadius: 6, background: 'var(--accent-bg)', color: 'var(--accent-dark)', fontFamily: 'var(--font-body)', fontWeight: 500, border: '1px solid rgba(200,137,26,0.15)' }}>
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Local projects ── */}
      {cityProjects.length > 0 && (
        <section style={{ background: 'var(--bg)', padding: '64px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'var(--ink)' }}>
                Our Projects in {city.shortName}
              </h2>
              <Link href="/projects" style={{ fontSize: 14, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none' }}>
                View all projects →
              </Link>
            </div>
            <div className="city-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {cityProjects.map(project => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="city-project-card">
                  <div style={{ height: 180, background: project.color, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35))' }} />
                    <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.9)', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-body)', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {project.typeLabel}
                    </div>
                  </div>
                  <div style={{ padding: '18px 20px' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{project.title}</p>
                    <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
                      <span>📐 {project.area.toLocaleString()} sq ft</span>
                      <span>💰 {project.budget}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonial ── */}
      {city.testimonial && (
        <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <div style={{ background: 'var(--ink)', borderRadius: 16, padding: '40px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden style={{ position: 'absolute', top: -30, right: -30, fontSize: 140, opacity: 0.04, fontFamily: 'Georgia', lineHeight: 1, color: 'white' }}>"</div>
              <div style={{ fontSize: 14, color: 'var(--accent-light)', letterSpacing: 2, marginBottom: 20 }}>★★★★★</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px,2vw,22px)', fontStyle: 'italic', color: 'white', lineHeight: 1.65, marginBottom: 24 }}>
                &ldquo;{city.testimonial.text}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'white' }}>
                  {city.testimonial.name.charAt(0)}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'white' }}>{city.testimonial.name}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>{city.name} · {city.testimonial.project}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, color: 'var(--ink)', marginBottom: 12 }}>
            Start Your {city.shortName} Project Today
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', marginBottom: 32, lineHeight: 1.7 }}>
            Free consultation, free site visit, no obligation. Our team in {city.name} is ready to help.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/estimate" style={{ background: 'var(--accent)', color: 'white', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(200,137,26,0.3)' }}>
              Get Free Estimate
            </Link>
            <Link href="/contact" style={{ background: 'var(--bg-card)', color: 'var(--ink)', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1.5px solid var(--border-strong)' }}>
              Contact Us
            </Link>
          </div>

          {/* Other cities */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: 13, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginBottom: 14 }}>We also build in:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {CITIES.filter(c => c.slug !== citySlug).slice(0, 8).map(c => (
                <Link key={c.slug} href={`/cities/${c.slug}`} style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 500, textDecoration: 'none', padding: '4px 12px', borderRadius: 99, border: '1px solid rgba(200,137,26,0.25)', background: 'var(--accent-bg)' }}>
                  {c.shortName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}