'use client';
import { useState } from 'react';

const SERVICES = [
  'Residential Home',
  'Commercial Complex',
  'Shop / Showroom',
  'Renovation',
  'Not sure yet',
];

const INITIAL = { name: '', phone: '', email: '', city: '', service: '', message: '' };

export default function ContactForm() {
  const [form, setForm]       = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error

  const update = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid 10-digit number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm(INITIAL);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{
          width: 64, height: 64, background: '#E8F5E9', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', fontSize: 28,
        }}>✅</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
          We&apos;ll be in touch!
        </h3>
        <p style={{ fontSize: 15, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: 28 }}>
          Thank you for reaching out. Our team will call you within 2 hours on weekdays.
        </p>
        <button onClick={() => setStatus('idle')} style={{
          padding: '11px 28px', borderRadius: 8, border: '1.5px solid #E0DBD3',
          background: 'transparent', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-muted)',
        }}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .cf-input, .cf-textarea, .cf-select {
          width: 100%; padding: 13px 16px;
          border: 2px solid #E0DBD3; border-radius: 10px;
          font-size: 15px; font-family: var(--font-body);
          background: #fff; color: var(--ink);
          outline: none; transition: border-color 0.18s;
          resize: none;
        }
        .cf-input:focus, .cf-textarea:focus, .cf-select:focus { border-color: var(--accent); }
        .cf-input.error, .cf-textarea.error, .cf-select.error { border-color: #E53935; }
        .cf-label {
          display: block; font-size: 13px; font-weight: 600;
          color: var(--ink); font-family: var(--font-body);
          margin-bottom: 6px; letter-spacing: 0.02em;
        }
        .cf-error {
          font-size: 12px; color: #E53935;
          font-family: var(--font-body); margin-top: 4px;
        }
        .cf-submit {
          width: 100%; padding: 15px; border-radius: 10px; border: none;
          background: var(--accent); color: white; font-family: var(--font-body);
          font-size: 16px; font-weight: 700; cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          letter-spacing: 0.02em;
        }
        .cf-submit:hover:not(:disabled) { background: var(--accent-dark); transform: translateY(-1px); }
        .cf-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 540px) { .cf-row { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Name + Phone */}
        <div className="cf-row">
          <div>
            <label className="cf-label">Full Name <span style={{ color: 'var(--accent)' }}>*</span></label>
            <input className={`cf-input${errors.name ? ' error' : ''}`} type="text"
              placeholder="Rajesh Sharma" value={form.name}
              onChange={e => update('name', e.target.value)} />
            {errors.name && <p className="cf-error">{errors.name}</p>}
          </div>
          <div>
            <label className="cf-label">Phone Number <span style={{ color: 'var(--accent)' }}>*</span></label>
            <input className={`cf-input${errors.phone ? ' error' : ''}`} type="tel"
              placeholder="+91 78912 50008" value={form.phone}
              onChange={e => update('phone', e.target.value)} />
            {errors.phone && <p className="cf-error">{errors.phone}</p>}
          </div>
        </div>

        {/* Email + City */}
        <div className="cf-row">
          <div>
            <label className="cf-label">Email Address</label>
            <input className={`cf-input${errors.email ? ' error' : ''}`} type="email"
              placeholder="rajesh@example.com" value={form.email}
              onChange={e => update('email', e.target.value)} />
            {errors.email && <p className="cf-error">{errors.email}</p>}
          </div>
          <div>
            <label className="cf-label">City / Location</label>
            <input className="cf-input" type="text"
              placeholder="New Delhi" value={form.city}
              onChange={e => update('city', e.target.value)} />
          </div>
        </div>

        {/* Service interested in */}
        <div>
          <label className="cf-label">Interested In</label>
          <select className="cf-select" value={form.service}
            onChange={e => update('service', e.target.value)}>
            <option value="">Select a service…</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="cf-label">Your Message</label>
          <textarea className="cf-textarea" rows={4}
            placeholder="Tell us about your project — area, location, timeline, budget range…"
            value={form.message}
            onChange={e => update('message', e.target.value)} />
        </div>

        {/* Error banner */}
        {status === 'error' && (
          <div style={{ padding: '12px 16px', background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8 }}>
            <p style={{ fontSize: 13, color: '#C62828', fontFamily: 'var(--font-body)' }}>
              Something went wrong. Please try again or call us directly.
            </p>
          </div>
        )}

        {/* Submit */}
        <button className="cf-submit" onClick={handleSubmit} disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending…' : 'Send Message →'}
        </button>

        <p style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
          🔒 We respect your privacy. No spam, ever.
        </p>
      </div>
    </>
  );
}