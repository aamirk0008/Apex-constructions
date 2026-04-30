import Link from 'next/link';
import { PROJECTS } from '@/lib/projects';
import ProjectsGallery from '../../components/projects/ProjectGallery';

export const metadata = {
  title: 'Our Projects',
  description: 'Browse 150+ completed construction projects across India — residential homes, commercial complexes, retail showrooms and renovations.',
};

const STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '20+',  label: 'Cities Covered' },
  { value: '₹200Cr+', label: 'Total Value Built' },
  { value: '98%',  label: 'On-time Delivery' },
];

export default function ProjectsPage() {
  return (
    <>
      <style>{`
        .stat-item { text-align: center; padding: 0 24px; }
        .stat-item + .stat-item { border-left: 1px solid rgba(255,255,255,0.1); }
        @media (max-width: 640px) {
          .stats-row { grid-template-columns: repeat(2,1fr) !important; }
          .stat-item + .stat-item { border-left: none; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        background: 'var(--ink)', paddingTop: 120, paddingBottom: 0,
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, borderRadius: '50%', background: 'rgba(200,137,26,0.06)' }} />
        <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />

        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Projects</span>
          </div>

          <div style={{ maxWidth: 640, paddingBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,26,0.15)', border: '1px solid rgba(200,137,26,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Our Work</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)',
              fontWeight: 900, color: 'white', lineHeight: 1.08,
              letterSpacing: '-0.02em', marginBottom: 18,
            }}>
              150+ Projects.<br />
              <span style={{ color: 'var(--accent-light)' }}>20+ Cities.</span>
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.7, maxWidth: 480 }}>
              Every project here represents a family&apos;s dream or a business&apos;s ambition — built with precision and delivered with pride.
            </p>
          </div>

          {/* Stats bar */}
          <div className="stats-row" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 32, paddingBottom: 32,
          }}>
            {STATS.map(({ value, label }) => (
              <div key={label} className="stat-item">
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'white', lineHeight: 1, marginBottom: 4 }}>{value}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section style={{ background: 'var(--bg)', padding: '56px 0 80px' }}>
        <div className="container">
          <ProjectsGallery projects={PROJECTS} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
            Ready to start your project?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', marginBottom: 32 }}>
            Join 150+ happy clients across India. Get a free estimate in 2 minutes.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/estimate" style={{ background: 'var(--accent)', color: 'white', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Get Free Estimate
            </Link>
            <Link href="/contact" style={{ background: 'transparent', color: 'var(--ink)', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1.5px solid var(--border-strong)' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}