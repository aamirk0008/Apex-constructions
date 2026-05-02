'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'About',    href: '/about' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: '🏠 Residential',     href: '/services#residential' },
      { label: '🏢 Commercial',      href: '/services#commercial' },
      { label: '🏪 Retail & Shops',  href: '/services#retail' },
      { label: '🔧 Renovation',      href: '/services#renovation' },
      { label: '📐 2D & 3D Design',  href: '/services/design' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Cities',   href: '/cities' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropdown, setDropdown]     = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <style>{`
        .nav-link {
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: var(--ink-muted); letter-spacing: 0.01em;
          transition: color 0.2s; text-decoration: none;
          display: flex; align-items: center; gap: 4px;
        }
        .nav-link:hover { color: var(--ink); }

        .nav-cta {
          background: var(--accent); color: white;
          padding: 9px 20px; border-radius: 4px;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          transition: background 0.2s; text-decoration: none;
        }
        .nav-cta:hover { background: var(--accent-dark); }

        .dropdown-menu {
          position: absolute; top: calc(100% + 10px); left: 50%;
          transform: translateX(-50%);
          background: white; border: 1px solid var(--border);
          border-radius: 12px; padding: 8px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
          min-width: 220px; z-index: 200;
          animation: dropIn 0.18s ease;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .dropdown-item {
          display: block; padding: 10px 14px; border-radius: 8px;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: var(--ink-muted); text-decoration: none;
          transition: background 0.15s, color 0.15s; white-space: nowrap;
        }
        .dropdown-item:hover { background: var(--bg-card); color: var(--ink); }
        .dropdown-item.highlight {
          color: var(--accent-dark);
          background: var(--accent-bg);
          margin-top: 4px;
          border-top: 1px solid rgba(200,137,26,0.15);
          border-radius: 8px;
        }
        .dropdown-item.highlight:hover { background: rgba(200,137,26,0.15); }

        .mobile-nav-link {
          display: block; padding: 12px 0;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-body); font-size: 16px; font-weight: 500;
          color: var(--ink); text-decoration: none; transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: var(--accent); }

        .mobile-sub-link {
          display: block; padding: 10px 16px;
          font-family: var(--font-body); font-size: 14px;
          color: var(--ink-muted); text-decoration: none;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s;
        }
        .mobile-sub-link:hover { color: var(--accent); }

        .mobile-cta {
          display: block; margin-top: 16px;
          background: var(--accent); color: white;
          padding: 13px 20px; border-radius: 8px; text-align: center;
          font-family: var(--font-body); font-size: 15px; font-weight: 600;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(245,242,237,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,23,20,0.08)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="10" width="5" height="6" fill="white"/>
                <rect x="9" y="6" width="7" height="10" fill="white"/>
                <polygon points="1,10 9,2 17,10" fill="white" opacity="0.7"/>
              </svg>
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              Build<span style={{ color: 'var(--accent)' }}>Right</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {NAV_LINKS.map(({ label, href, dropdown: dd }) =>
              dd ? (
                <div key={label} ref={dropdownRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setDropdown(v => !v)}
                    className="nav-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: dropdown ? 'rotate(180deg)' : 'none', marginLeft: 2 }}>
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {dropdown && (
                    <div className="dropdown-menu">
                      {dd.map((item, i) => (
                        <Link key={item.href} href={item.href}
                          onClick={() => setDropdown(false)}
                          className={`dropdown-item${item.label.includes('3D') ? ' highlight' : ''}`}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={label} href={href} className="nav-link">{label}</Link>
              )
            )}
            <Link href="/estimate" className="nav-cta">Free Estimate</Link>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="hamburger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none', flexDirection: 'column', gap: 5 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 1.5,
                background: 'var(--ink)', borderRadius: 2,
                transition: 'transform 0.2s, opacity 0.2s',
                transform: menuOpen ? i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)' : 'none',
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
        padding: menuOpen ? '20px 24px 24px' : '0 24px',
        maxHeight: menuOpen ? '600px' : '0',
        overflow: 'hidden', transition: 'all 0.35s ease',
      }}>
        <Link href="/about"    className="mobile-nav-link" onClick={() => setMenuOpen(false)}>About</Link>

        {/* Services accordion */}
        <div>
          <button onClick={() => setMobileServices(v => !v)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>
            Services
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: mobileServices ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {mobileServices && (
            <div style={{ background: 'var(--bg-card)', borderRadius: 8, margin: '8px 0' }}>
              {[
                { label: '🏠 Residential',    href: '/services#residential' },
                { label: '🏢 Commercial',     href: '/services#commercial' },
                { label: '🏪 Retail & Shops', href: '/services#retail' },
                { label: '🔧 Renovation',     href: '/services#renovation' },
                { label: '📐 2D & 3D Design', href: '/services/design' },
              ].map(item => (
                <Link key={item.href} href={item.href} className="mobile-sub-link" onClick={() => { setMenuOpen(false); setMobileServices(false); }}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/projects" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Projects</Link>
        <Link href="/cities"   className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Cities</Link>
        <Link href="/contact"  className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link href="/estimate" className="mobile-cta"      onClick={() => setMenuOpen(false)}>Get Free Estimate</Link>
      </div>
    </>
  );
}