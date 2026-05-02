import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with BuildRight Construction. Call, WhatsApp or fill the form — we respond within 2 hours on weekdays.',
};

const CONTACT_ITEMS = [
  {
    icon: '📞',
    label: 'Call Us',
    value: '+91 78912 50008',
    sub: 'Mon–Sat, 9am–7pm IST',
    href: 'tel:+919876543210',
    color: '#4A7C59',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: 'Chat Instantly',
    sub: 'Typically replies in minutes',
    href: `https://wa.me/917891250008?text=${encodeURIComponent('Hi, I\'d like to discuss a construction project.')}`,
    color: '#25D366',
  },
  {
    icon: '📧',
    label: 'Email',
    value: 'aamirsheikh0008@gmail.com',
    sub: 'We reply within 4 hours',
    href: 'mailto:aamirsheikh0008@gmail.com',
    color: '#5B6FA6',
  },
  {
    icon: '📍',
    label: 'Office',
    value: 'New Delhi, India',
    sub: 'Pan India operations',
    href: 'https://maps.google.com',
    color: '#C8891A',
  },
];

const FAQS = [
  { q: 'How soon can you start a project?', a: 'After signing the contract and design approval, we typically mobilise within 2–4 weeks depending on site readiness and material procurement.' },
  { q: 'Do you work outside Delhi?', a: 'Yes — we operate pan India. We have partner networks and site teams in 20+ cities including Mumbai, Bangalore, Pune, Bhopal, and Indore.' },
  { q: 'What documents do I need to start?', a: 'Property documents, approved building plan (if available), and a signed agreement. We can also help with plan approval and RERA registration.' },
  { q: 'Is a site visit free?', a: 'Yes. Our first site visit and consultation is completely free with no obligations.' },
];

export default function ContactPage() {
  return (
    <>
      <style>{`
        .contact-card {
          background: #fff; border: 2px solid #E0DBD3; border-radius: 14px;
          padding: 24px; display: flex; align-items: flex-start; gap: 16px;
          text-decoration: none; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .contact-card:hover {
          border-color: var(--accent); transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(200,137,26,0.12);
        }
        .faq-item { border-bottom: 1px solid #E8E4DD; padding: 22px 0; }
        .faq-q { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .faq-a { font-family: var(--font-body); font-size: 14px; color: var(--ink-muted); line-height: 1.7; }
        .trust-badge {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px; border-radius: 8px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
        }
        @media (max-width: 900px) {
          .contact-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .contact-cards-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .contact-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        background: 'var(--ink)', paddingTop: 120, paddingBottom: 72,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div aria-hidden style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(200,137,26,0.06)', pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(200,137,26,0.04)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,26,0.15)', border: '1px solid rgba(200,137,26,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Get In Touch
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 62px)',
              fontWeight: 900, color: 'white', lineHeight: 1.08,
              letterSpacing: '-0.02em', marginBottom: 18,
            }}>
              Let&apos;s Talk About<br />
              <span style={{ color: 'var(--accent-light)' }}>Your Project.</span>
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
              Whether you have a detailed plan or just an idea — we&apos;re here to help you build it. Free consultation, honest advice, zero pressure.
            </p>

            {/* Trust row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[
                { icon: '⚡', text: 'Response within 2 hours' },
                { icon: '🆓', text: 'Free site visit' },
                { icon: '🤝', text: 'No obligation' },
              ].map(({ icon, text }) => (
                <div key={text} className="trust-badge">
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact cards ── */}
      <section style={{ background: 'var(--bg)', padding: '56px 0 0' }}>
        <div className="container">
          <div className="contact-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 56 }}>
            {CONTACT_ITEMS.map(({ icon, label, value, sub, href, color }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer" className="contact-card">
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: color + '18', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 20,
                }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-body)', marginBottom: 2 }}>{value}</p>
                  <p style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>{sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main: Form + Sidebar ── */}
      <section style={{ background: 'var(--bg)', padding: '0 0 80px' }}>
        <div className="container">
          <div className="contact-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>

            {/* Form card */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '40px', border: '1px solid #E8E4DD', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
                  Send Us a Message
                </h2>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
                  Fill in your details and we&apos;ll get back to you within 2 hours on weekdays.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Office hours */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid #E8E4DD', borderRadius: 14, padding: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Office Hours</p>
                {[
                  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
                  { day: 'Saturday',        time: '9:00 AM – 4:00 PM' },
                  { day: 'Sunday',          time: 'Closed' },
                ].map(({ day, time }) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #EEE9E2' }}>
                    <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>{day}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: time === 'Closed' ? '#E53935' : 'var(--ink)', fontFamily: 'var(--font-body)' }}>{time}</span>
                  </div>
                ))}
                <div style={{ marginTop: 6, padding: '10px 14px', background: '#E8F5E9', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12 }}>🟢</span>
                  <span style={{ fontSize: 12, color: '#2E7D32', fontFamily: 'var(--font-body)', fontWeight: 600 }}>WhatsApp available outside office hours</span>
                </div>
              </div>

              {/* Estimate CTA */}
              <div style={{ background: 'var(--accent)', borderRadius: 14, padding: '26px 24px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, color: 'white', marginBottom: 8 }}>
                  Not sure of the cost?
                </p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)', marginBottom: 18, lineHeight: 1.6 }}>
                  Try our free interactive estimator. Get an instant range in under 2 minutes.
                </p>
                <Link href="/estimate" style={{
                  display: 'block', background: 'white', color: 'var(--accent)',
                  padding: '12px 20px', borderRadius: 8,
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
                  textDecoration: 'none',
                }}>
                  Try Cost Estimator →
                </Link>
              </div>

              {/* Process steps */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid #E8E4DD', borderRadius: 14, padding: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                  What Happens Next
                </p>
                {[
                  { n: '1', text: 'We call you within 2 hours' },
                  { n: '2', text: 'Free site visit scheduled' },
                  { n: '3', text: 'Detailed quote provided' },
                  { n: '4', text: 'Contract signed & work begins' },
                ].map(({ n, text }) => (
                  <div key={n} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: 'white', fontFamily: 'var(--font-body)' }}>{n}</span>
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.5, paddingTop: 4 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid #E8E4DD', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 40, textAlign: 'center' }}>
            Common Questions
          </h2>
          {FAQS.map(({ q, a }) => (
            <div key={q} className="faq-item">
              <p className="faq-q">{q}</p>
              <p className="faq-a">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}