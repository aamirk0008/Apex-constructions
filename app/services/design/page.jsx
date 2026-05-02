import Link from 'next/link';

export const metadata = {
  title: '2D & 3D Design Services | Floor Plans, Interior & Exterior Visualization',
  description: 'Professional 2D floor plans, 3D exterior visualization, 3D interior design and architectural drawings. Delivered as AutoCAD files, 3D renders and physical prints across India.',
  keywords: [
    '2d floor plan india', '3d house design india',
    'architectural drawing service', '3d interior design india',
    '3d exterior visualization', 'floor plan maker india',
    'house design 3d rendering', 'autocad floor plan service',
  ],
};

const SERVICES = [
  {
    id: 'floor-plans',
    icon: '📐',
    label: '01',
    title: '2D Floor Plans',
    color: '#C8891A',
    tagline: 'Precise. Clear. Construction-ready.',
    desc: 'Accurate 2D floor plans drawn to scale with all room dimensions, door/window positions, electrical points, and furniture layout. Ready for municipal approval submissions and contractor handover.',
    deliverables: ['AutoCAD .dwg file', 'PDF drawing set', 'Physical blueprint print', 'Multiple revision rounds'],
    useCases: ['Municipal approval drawings', 'Contractor briefing', 'Loan applications', 'Property registration'],
    turnaround: '3–5 working days',
    startingAt: '₹5,000',
    features: [
      'All floors drawn to exact scale',
      'Door, window & staircase positioning',
      'Room dimensions & area calculations',
      'Electrical & plumbing point marking',
      'Furniture layout (optional)',
      'North direction & site plan',
    ],
  },
  {
    id: 'exterior-3d',
    icon: '🏛️',
    label: '02',
    title: '3D Exterior Visualization',
    color: '#4A7C59',
    tagline: 'See your building before the first brick.',
    desc: 'Photorealistic 3D renders of your building\'s exterior from multiple angles — day and night views, different facade options, landscaping mockups. Helps you finalise design before spending on construction.',
    deliverables: ['High-res 3D rendered images', '360° exterior views', 'Day + evening renders', 'Physical A3 print'],
    useCases: ['Client presentations', 'Design finalisation', 'Marketing brochures', 'Investor pitch decks'],
    turnaround: '5–7 working days',
    startingAt: '₹8,000',
    features: [
      'Photorealistic rendering (4K quality)',
      '4 exterior angles minimum',
      'Day & night lighting scenarios',
      'Material & colour options comparison',
      'Landscaping & surroundings',
      'Unlimited minor revisions',
    ],
  },
  {
    id: 'interior-3d',
    icon: '🛋️',
    label: '03',
    title: '3D Interior Design',
    color: '#5B6FA6',
    tagline: 'Walk through your home before it\'s built.',
    desc: 'Room-by-room 3D interior renders showing furniture placement, material finishes, lighting effects, and colour schemes. Choose from our curated design styles — contemporary, traditional, minimalist or luxury.',
    deliverables: ['High-res room renders', 'Material mood board', 'Furniture list with links', 'Physical A3 print set'],
    useCases: ['Home design planning', 'Interior budget planning', 'Architect briefing', 'Renovation guidance'],
    turnaround: '7–10 working days',
    startingAt: '₹3,500',
    note: 'per room',
    features: [
      'Photorealistic room renders',
      'Multiple design style options',
      'Furniture & fixture placement',
      'Material & finish selection',
      'Lighting design & ambience',
      'Shopping list with cost estimates',
    ],
  },
  {
    id: 'architectural',
    icon: '📏',
    label: '04',
    title: 'Architectural Drawings',
    color: '#9B6B9B',
    tagline: 'Complete drawing sets for approval & construction.',
    desc: 'Full architectural drawing packages including site plan, floor plans, elevation drawings, section drawings, and structural layout. Prepared by licensed architects and suitable for municipal submission across India.',
    deliverables: ['Complete AutoCAD drawing set', 'Structural layout drawings', 'Elevation drawings (all 4 sides)', 'Physical stamped prints'],
    useCases: ['Municipal plan approval', 'RERA registration', 'Bank loan applications', 'Contractor tendering'],
    turnaround: '10–15 working days',
    startingAt: '₹15,000',
    features: [
      'Site plan with north arrow',
      'All floor plans (all storeys)',
      'All 4 elevation drawings',
      'Section drawings',
      'Structural layout',
      'Architect stamp & signature',
    ],
  },
];

const PROCESS = [
  { step: '01', title: 'Share Requirements', desc: 'Tell us your plot size, number of floors, rooms needed, and style preferences. WhatsApp or email works.' },
  { step: '02', title: 'Get a Quote', desc: 'We send a fixed quote within 4 hours. No surprises — what we quote is what you pay.' },
  { step: '03', title: 'First Draft', desc: 'Receive your first draft within the committed timeline. Review it thoroughly.' },
  { step: '04', title: 'Revise & Finalise', desc: 'Request changes — we revise until you\'re 100% happy. No extra charges for revisions.' },
  { step: '05', title: 'Delivery', desc: 'AutoCAD files and high-res renders delivered digitally. Physical prints couriered to your address.' },
];

const FAQS = [
  { q: 'Do I need to visit your office to get started?', a: 'No. Everything happens remotely. Share your plot dimensions and requirements over WhatsApp or email — we handle the rest.' },
  { q: 'Can I get design done even if I\'m not constructing with you?', a: 'Absolutely. Design is available as a standalone paid service. Many clients use our drawings to get quotes from local contractors.' },
  { q: 'Is design free if I build with BuildRight?', a: 'Yes — 2D floor plans and architectural drawings are bundled free for all construction contracts above ₹30 lakh. 3D renders are available at a discounted rate.' },
  { q: 'How many revisions are included?', a: 'Unlimited minor revisions (moving walls, changing room sizes, material changes) are included. Major redesigns (changing the entire layout concept) may attract a small fee.' },
  { q: 'Are your drawings accepted by municipal corporations?', a: 'Yes. Our architectural drawings are prepared by licensed architects and carry the necessary stamps for submission to municipal corporations across India.' },
  { q: 'Can I get a 3D walkthrough video?', a: 'We are adding walkthrough videos soon. Currently we deliver static 3D renders and 360° views. Contact us for a custom quote on walkthroughs.' },
];

export default function DesignServicesPage() {
  return (
    <>
      <style>{`
        .design-service-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .design-service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 56px rgba(0,0,0,0.1);
        }

        .feature-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 9px 0; border-bottom: 1px solid #F0ECE6;
          font-size: 13px; color: var(--ink-muted); font-family: var(--font-body);
        }
        .feature-item:last-child { border-bottom: none; }

        .deliverable-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 13px; border-radius: 8px;
          background: var(--bg-card); border: 1px solid var(--border);
          font-size: 12px; font-family: var(--font-body); font-weight: 500;
          color: var(--ink-muted);
        }

        .process-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 24px;
          transition: border-color 0.2s, background 0.2s;
        }
        .process-card:hover {
          border-color: rgba(200,137,26,0.4);
          background: rgba(200,137,26,0.05);
        }

        .faq-item { border-bottom: 1px solid var(--border); padding: 22px 0; }
        .faq-q { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .faq-a { font-family: var(--font-body); font-size: 14px; color: var(--ink-muted); line-height: 1.75; }

        .bundle-card {
          border-radius: 14px; padding: 28px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .bundle-card:hover { transform: translateY(-3px); }

        @media (max-width: 900px) {
          .design-hero-grid { grid-template-columns: 1fr !important; }
          .design-cards-grid { grid-template-columns: 1fr 1fr !important; }
          .bundle-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .design-cards-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        background: 'var(--ink)', paddingTop: 120, paddingBottom: 80,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative grid pattern */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div aria-hidden style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(200,137,26,0.08)' }} />

        <div className="container" style={{ position: 'relative' }}>
          <div className="design-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center' }}>
            <div>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 13, fontFamily: 'var(--font-body)' }}>
                <Link href="/" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Home</Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
                <Link href="/services" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Services</Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Design</span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,26,0.15)', border: '1px solid rgba(200,137,26,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Design Services</span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4vw,58px)',
                fontWeight: 900, color: 'white', lineHeight: 1.08,
                letterSpacing: '-0.02em', marginBottom: 18,
              }}>
                See Your Space<br />
                <span style={{ color: 'var(--accent-light)' }}>Before It&apos;s Built.</span>
              </h1>

              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.8, marginBottom: 32, maxWidth: 500 }}>
                From 2D floor plans to photorealistic 3D renders — we help you visualise, plan and communicate your construction project with precision. Available standalone or bundled free with construction.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ background: 'var(--accent)', color: 'white', padding: '13px 28px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                  Get a Design Quote
                </Link>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210'}?text=${encodeURIComponent('Hi, I\'m interested in your 2D/3D design services. Can you share more details?')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ background: '#25D366', color: 'white', padding: '13px 28px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  💬 WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right: Service quick cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {SERVICES.map(s => (
                <a key={s.id} href={`#${s.id}`} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12, padding: '20px 16px', textDecoration: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                  display: 'block',
                }}>
                  <span style={{ fontSize: 26, display: 'block', marginBottom: 10 }}>{s.icon}</span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4, lineHeight: 1.3 }}>{s.title}</p>
                  <p style={{ fontSize: 12, color: 'var(--accent-light)', fontFamily: 'var(--font-body)', fontWeight: 700 }}>
                    From {s.startingAt}{s.note ? <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}> {s.note}</span> : ''}
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginTop: 4 }}>
                    {s.turnaround}
                  </p>
                </a>
              ))}
              {/* Deliverables pill */}
              <div style={{ gridColumn: '1/-1', background: 'rgba(200,137,26,0.1)', border: '1px solid rgba(200,137,26,0.2)', borderRadius: 10, padding: '14px 16px' }}>
                <p style={{ fontSize: 11, color: 'var(--accent-light)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Delivered as</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['AutoCAD .dwg', '3D Renders (4K)', 'Physical Prints'].map(d => (
                    <span key={d} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                      ✓ {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service detail cards ── */}
      <section style={{ background: 'var(--bg)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>What We Offer</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, color: 'var(--ink)' }}>
              4 Design Services
            </h2>
          </div>

          <div className="design-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
            {SERVICES.map(service => (
              <div key={service.id} id={service.id} className="design-service-card">
                {/* Card header */}
                <div style={{ background: service.color, padding: '28px 28px 24px', position: 'relative', overflow: 'hidden' }}>
                  <div aria-hidden style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <span style={{ fontSize: 32 }}>{service.icon}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>{service.label}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 4 }}>{service.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>{service.tagline}</p>
                  <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
                    <div>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Starting at</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: 'white' }}>
                        {service.startingAt} {service.note && <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.65 }}>{service.note}</span>}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Turnaround</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, color: 'white' }}>{service.turnaround}</p>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '24px 28px 28px' }}>
                  <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.75, marginBottom: 20 }}>
                    {service.desc}
                  </p>

                  {/* Features */}
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Included</p>
                  <div style={{ marginBottom: 20 }}>
                    {service.features.map(f => (
                      <div key={f} className="feature-item">
                        <span style={{ color: service.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Deliverables</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                    {service.deliverables.map(d => (
                      <span key={d} className="deliverable-tag">📦 {d}</span>
                    ))}
                  </div>

                  {/* Use cases */}
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Best For</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                    {service.useCases.map(u => (
                      <span key={u} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 99, background: service.color + '12', color: service.color, fontFamily: 'var(--font-body)', fontWeight: 600, border: `1px solid ${service.color}25` }}>
                        {u}
                      </span>
                    ))}
                  </div>

                  <Link href="/contact" style={{ display: 'block', background: service.color, color: 'white', padding: '13px', borderRadius: 8, textAlign: 'center', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                    Get Quote for {service.title} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bundling options ── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Pricing Options</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
              Standalone or Bundled
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', maxWidth: 500, margin: '0 auto' }}>
              Design services are available on their own or included free/discounted when you build with us.
            </p>
          </div>

          <div className="bundle-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Standalone */}
            <div className="bundle-card" style={{ background: 'white', border: '2px solid var(--border)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Option A</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>Design Only</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: 24 }}>
                Use our designs with any contractor. Perfect if you already have a builder or want to plan before committing to construction.
              </p>
              {[
                '2D Floor Plans from ₹5,000',
                '3D Exterior from ₹8,000',
                '3D Interior from ₹3,500/room',
                'Architectural Drawings from ₹15,000',
                'Fixed quote, no hidden fees',
                'Delivered digitally + physical prints',
              ].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>{f}</span>
                </div>
              ))}
              <Link href="/contact" style={{ display: 'block', marginTop: 24, background: 'var(--ink)', color: 'white', padding: '13px', borderRadius: 8, textAlign: 'center', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Get Design Quote →
              </Link>
            </div>

            {/* Bundled */}
            <div className="bundle-card" style={{ background: 'var(--ink)', border: '2px solid var(--accent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Option B</p>
                <span style={{ background: 'var(--accent)', color: 'white', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-body)', padding: '3px 10px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Best Value</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 8 }}>Design + Construction</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: 24 }}>
                Build with BuildRight and get design services bundled in. One team, one contract, zero coordination headaches.
              </p>
              {[
                '2D Floor Plans — FREE',
                'Architectural Drawings — FREE',
                '3D Exterior — 50% off',
                '3D Interior — 30% off',
                'Single point of contact',
                'Design aligned with actual build',
              ].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: 'var(--accent-light)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>{f}</span>
                </div>
              ))}
              <Link href="/estimate" style={{ display: 'block', marginTop: 24, background: 'var(--accent)', color: 'white', padding: '13px', borderRadius: 8, textAlign: 'center', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Get Construction Estimate →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ background: 'var(--bg)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>How It Works</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 800, color: 'var(--ink)' }}>
              From Brief to Delivery
            </h2>
          </div>
          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ textAlign: 'center', position: 'relative' }}>
                {i < PROCESS.length - 1 && (
                  <div aria-hidden style={{ position: 'absolute', top: 20, left: '60%', right: '-10%', height: 1, background: 'var(--border)' }} />
                )}
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 13, color: 'white', position: 'relative', zIndex: 1 }}>
                  {p.step}
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{p.title}</p>
                <p style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 40, textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {FAQS.map(({ q, a }) => (
            <div key={q} className="faq-item">
              <p className="faq-q">{q}</p>
              <p className="faq-a">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--accent)', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, color: 'white', marginBottom: 12 }}>
            Ready to visualise your project?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)', marginBottom: 32 }}>
            Share your requirements and get a fixed quote within 4 hours.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: 'white', color: 'var(--accent)', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Get Design Quote →
            </Link>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210'}?text=${encodeURIComponent('Hi, I need a 2D/3D design for my project. Can you help?')}`}
              target="_blank" rel="noopener noreferrer"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '14px 32px', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}