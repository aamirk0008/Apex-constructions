'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PROJECT_TYPES, PROJECT_CITIES } from '@/lib/projects';

function ProjectCard({ project, index }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card"
      style={{ animationDelay: `${index * 0.07}s` }}>
      {/* Color image area */}
      <div style={{
        height: 220, background: project.color,
        position: 'relative', overflow: 'hidden',
        transition: 'transform 0.4s ease',
      }}>
        {/* Pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(0,0,0,0.15) 0%, transparent 50%)`,
        }} />
        {/* Icon */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: 52, opacity: 0.18, lineHeight: 1,
        }}>
          {project.type === 'residential' ? '🏠'
          : project.type === 'commercial' ? '🏢'
          : project.type === 'retail'     ? '🏪' : '🔧'}
        </div>
        {/* Type badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)',
          borderRadius: 20, padding: '4px 12px',
          fontSize: 11, fontWeight: 700, color: '#1A1714',
          fontFamily: 'var(--font-body)', letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          {project.typeLabel}
        </div>
        {/* Year */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          fontSize: 12, color: 'rgba(255,255,255,0.75)',
          fontFamily: 'var(--font-body)', fontWeight: 500,
        }}>
          {project.year}
        </div>
        {/* Rating */}
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          fontSize: 13, color: 'rgba(255,255,255,0.9)',
          letterSpacing: 1,
        }}>
          {'★'.repeat(project.rating)}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '22px 24px 24px' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 19,
          fontWeight: 700, color: 'var(--ink)', marginBottom: 6,
          lineHeight: 1.2,
        }}>{project.title}</h3>

        <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 4 }}>
            📍 {project.location}
          </span>
          <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 4 }}>
            📐 {project.area.toLocaleString()} sq ft
          </span>
        </div>

        <p style={{
          fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)',
          lineHeight: 1.6, marginBottom: 16,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {project.desc}
        </p>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 16, borderTop: '1px solid var(--border)',
        }}>
          <div>
            <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginBottom: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Budget</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{project.budget}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginBottom: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Duration</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{project.duration}</p>
          </div>
          <div style={{
            fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)',
            fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4,
          }}>
            View <span style={{ fontSize: 16 }}>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsGallery({ projects }) {
  const [activeType, setActiveType] = useState('all');
  const [activeCity, setActiveCity] = useState('all');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let result = [...projects];
    if (activeType !== 'all') result = result.filter(p => p.type === activeType);
    if (activeCity !== 'all') result = result.filter(p => p.city === activeCity);
    if (sort === 'newest')  result.sort((a, b) => b.year - a.year);
    if (sort === 'largest') result.sort((a, b) => b.area - a.area);
    return result;
  }, [projects, activeType, activeCity, sort]);

  return (
    <>
      <style>{`
        .project-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 14px; overflow: hidden; display: block;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          animation: fadeUp 0.5s ease both;
        }
        .project-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); border-color: rgba(200,137,26,0.3); }
        .project-card:hover .card-img { transform: scale(1.04); }

        .filter-btn {
          padding: 8px 18px; border-radius: 99px; cursor: pointer;
          font-size: 13px; font-family: var(--font-body); font-weight: 500;
          border: 1.5px solid #E0DBD3; background: #fff;
          color: var(--ink-muted); transition: all 0.18s; white-space: nowrap;
        }
        .filter-btn:hover { border-color: var(--accent); color: var(--accent-dark); }
        .filter-btn.active { background: var(--ink); color: #fff; border-color: var(--ink); }

        .sort-select {
          padding: 8px 14px; border-radius: 8px; cursor: pointer;
          font-size: 13px; font-family: var(--font-body); font-weight: 500;
          border: 1.5px solid #E0DBD3; background: #fff; color: var(--ink);
          outline: none; transition: border-color 0.18s;
        }
        .sort-select:focus { border-color: var(--accent); }

        .empty-state {
          grid-column: 1 / -1; text-align: center;
          padding: 80px 24px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Filters ── */}
      <div style={{ marginBottom: 32 }}>
        {/* Type filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 4 }}>Type:</span>
          {PROJECT_TYPES.map(t => (
            <button key={t.value} onClick={() => setActiveType(t.value)}
              className={`filter-btn${activeType === t.value ? ' active' : ''}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* City + sort row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 4 }}>City:</span>
            {PROJECT_CITIES.map(c => (
              <button key={c.value} onClick={() => setActiveCity(c.value)}
                className={`filter-btn${activeCity === c.value ? ' active' : ''}`}>
                {c.label}
              </button>
            ))}
          </div>
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="largest">Largest Area</option>
          </select>
        </div>
      </div>

      {/* ── Result count ── */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
          Showing <strong style={{ color: 'var(--ink)' }}>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
          {activeType !== 'all' || activeCity !== 'all' ? (
            <button onClick={() => { setActiveType('all'); setActiveCity('all'); }}
              style={{ marginLeft: 12, fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'underline' }}>
              Clear filters
            </button>
          ) : null}
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {filtered.length > 0 ? filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        )) : (
          <div className="empty-state">
            <p style={{ fontSize: 40, marginBottom: 16 }}>🔍</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>No projects found</p>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', marginBottom: 24 }}>Try adjusting your filters</p>
            <button onClick={() => { setActiveType('all'); setActiveCity('all'); }}
              style={{ padding: '10px 24px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }}>
              Show All Projects
            </button>
          </div>
        )}
      </div>
    </>
  );
}