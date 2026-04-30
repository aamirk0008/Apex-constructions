import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, PROJECTS } from '@/lib/projects';

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.location}`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = PROJECTS
    .filter(p => p.slug !== project.slug && p.type === project.type)
    .slice(0, 3);

  return (
    <>
      <style>{`
        .highlight-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 99px;
          background: var(--accent-bg); border: 1px solid rgba(200,137,26,0.2);
          font-size: 13px; font-family: var(--font-body); font-weight: 500;
          color: var(--accent-dark);
        }
        .related-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 12px; overflow: hidden; text-decoration: none; display: block;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .related-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .detail-cta-btn {
          display: block; padding: 14px 24px; border-radius: 8px; text-align: center;
          font-family: var(--font-body); font-size: 15px; font-weight: 600;
          text-decoration: none; transition: all 0.2s;
        }
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero image area ── */}
      <section style={{
        background: project.color, paddingTop: 68,
        minHeight: 420, position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          fontSize: 160, opacity: 0.07, lineHeight: 1,
        }}>
          {project.type === 'residential' ? '🏠' : project.type === 'commercial' ? '🏢' : project.type === 'retail' ? '🏪' : '🔧'}
        </div>

        <div className="container" style={{ position: 'relative', paddingBottom: 40 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <Link href="/projects" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Projects</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{project.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '4px 12px', marginBottom: 12, fontSize: 12, color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {project.typeLabel}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 10 }}>
                {project.title}
              </h1>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>📍 {project.location}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>📅 {project.year}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>{'★'.repeat(project.rating)} {project.rating}.0</span>
              </div>
            </div>
            <Link href="/estimate" style={{
              background: 'white', color: 'var(--accent)',
              padding: '12px 24px', borderRadius: 8,
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              Get Similar Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ background: 'var(--bg)', padding: '56px 0 80px' }}>
        <div className="container">
          <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' }}>

            {/* Left: Main content */}
            <div>
              {/* Project description */}
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--ink)', marginBottom: 14 }}>
                  About This Project
                </h2>
                <p style={{ fontSize: 16, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.8 }}>
                  {project.desc}
                </p>
              </div>

              {/* Key highlights */}
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--ink)', marginBottom: 18 }}>
                  Key Highlights
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {project.highlights.map(h => (
                    <span key={h} className="highlight-tag">
                      <span style={{ color: 'var(--accent)' }}>✓</span> {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project specs */}
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--ink)', marginBottom: 18 }}>
                  Project Specifications
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                  {[
                    { label: 'Total Area',    value: `${project.area.toLocaleString()} sq ft` },
                    { label: 'Budget',        value: project.budget },
                    { label: 'Duration',      value: project.duration },
                    { label: 'Quality Tier',  value: project.quality },
                    { label: 'Location',      value: project.location },
                    { label: 'Completed',     value: project.year },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                      <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div style={{ background: 'var(--ink)', borderRadius: 14, padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
                  <div aria-hidden style={{ position: 'absolute', top: -20, right: -20, fontSize: 100, opacity: 0.04, lineHeight: 1, fontFamily: 'Georgia' }}>"</div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'white', lineHeight: 1.65, marginBottom: 20, position: 'relative' }}>
                    &ldquo;{project.testimonial}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'white', flexShrink: 0 }}>
                      {project.client.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'white' }}>{project.client}</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>{project.location} · {project.year}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: 14, color: 'var(--accent-light)', letterSpacing: 2 }}>★★★★★</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Quick stats */}
              <div style={{ background: 'white', border: '2px solid var(--border)', borderRadius: 14, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>Project Summary</p>
                {[
                  { label: 'Client',    value: project.client },
                  { label: 'Type',      value: project.typeLabel },
                  { label: 'City',      value: project.location },
                  { label: 'Area',      value: `${project.area.toLocaleString()} sq ft` },
                  { label: 'Budget',    value: project.budget },
                  { label: 'Duration',  value: project.duration },
                  { label: 'Quality',   value: project.quality },
                  { label: 'Status',    value: '✅ Completed' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid #F0ECE6' }}>
                    <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-body)', textAlign: 'right', maxWidth: '55%' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link href="/estimate" className="detail-cta-btn" style={{ background: 'var(--accent)', color: 'white' }}>
                  Get a Similar Quote →
                </Link>
                <Link href="/contact" className="detail-cta-btn" style={{ background: 'var(--bg-card)', color: 'var(--ink)', border: '1.5px solid var(--border)' }}>
                  Contact Our Team
                </Link>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210'}?text=${encodeURIComponent(`Hi, I saw your ${project.title} project and I'm interested in a similar construction. Can we discuss?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="detail-cta-btn" style={{ background: '#25D366', color: 'white' }}>
                  💬 Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '64px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: 'var(--ink)' }}>
                Similar Projects
              </h2>
              <Link href="/projects" style={{ fontSize: 14, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none' }}>
                View all →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 20 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="related-card">
                  <div style={{ height: 160, background: p.color, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3))' }} />
                    <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.9)', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-body)', color: 'var(--ink)' }}>
                      {p.typeLabel}
                    </div>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{p.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>📍 {p.location} · {p.area.toLocaleString()} sq ft</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}