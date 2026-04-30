'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Cities',   href: '/cities' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-link {
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: var(--ink-muted); letter-spacing: 0.01em;
          transition: color 0.2s; text-decoration: none;
        }
        .nav-link:hover { color: var(--ink); }

        .nav-cta {
          background: var(--accent); color: white;
          padding: 9px 20px; border-radius: 4px;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          letter-spacing: 0.01em; transition: background 0.2s; text-decoration: none;
        }
        .nav-cta:hover { background: var(--accent-dark); }

        .mobile-nav-link {
          display: block; padding: 12px 0;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-body); font-size: 16px; font-weight: 500;
          color: var(--ink); text-decoration: none;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: var(--accent); }

        .mobile-cta {
          display: block; margin-top: 20px;
          background: var(--accent); color: white;
          padding: 12px 20px; border-radius: 4px; text-align: center;
          font-family: var(--font-body); font-size: 15px; font-weight: 500;
          text-decoration: none; transition: background 0.2s;
        }
        .mobile-cta:hover { background: var(--accent-dark); }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(245,242,237,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,23,20,0.08)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{
              width: 36, height: 36, background: 'var(--accent)',
              borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="10" width="5" height="6" fill="white"/>
                <rect x="9" y="6"  width="7" height="10" fill="white"/>
                <polygon points="1,10 9,2 17,10" fill="white" opacity="0.7"/>
              </svg>
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              Build<span style={{ color: 'var(--accent)' }}>Right</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className="nav-link">{label}</Link>
            ))}
            <Link href="/estimate" className="nav-cta">Free Estimate</Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="hamburger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none', flexDirection: 'column', gap: 5 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 1.5,
                background: 'var(--ink)', borderRadius: 2,
                transition: 'transform 0.2s, opacity 0.2s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
        background: 'var(--bg)', borderBottom: '1px solid var(--border)',
        padding: menuOpen ? '24px' : '0 24px',
        maxHeight: menuOpen ? '400px' : '0',
        overflow: 'hidden', transition: 'all 0.35s ease',
      }}>
        {NAV_LINKS.map(({ label, href }) => (
          <Link key={label} href={href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="/estimate" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Get Free Estimate
        </Link>
      </div>
    </>
  );
}