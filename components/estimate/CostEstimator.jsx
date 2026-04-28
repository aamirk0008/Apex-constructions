'use client';
import { useState } from 'react';

/* ─── Pricing Engine ─────────────────────────────────────── */
const BASE_RATES = {
  residential: { basic: 1600, standard: 2100, premium: 2900 },
  commercial:  { basic: 1900, standard: 2500, premium: 3400 },
  retail:      { basic: 1750, standard: 2300, premium: 3100 },
  renovation:  { basic: 900,  standard: 1400, premium: 2000 },
};

const CITY_MULTIPLIERS = {
  mumbai: 1.35, delhi: 1.25, bangalore: 1.20, pune: 1.15,
  hyderabad: 1.10, ahmedabad: 1.05, surat: 1.02, indore: 1.00,
  bhopal: 0.98, lucknow: 0.97, jaipur: 1.00, nagpur: 0.97, other: 0.95,
};

function calcEstimate({ type, area, quality, city }) {
  const rate = BASE_RATES[type]?.[quality] ?? 2000;
  const multiplier = CITY_MULTIPLIERS[city] ?? 1.0;
  const base = rate * area * multiplier;
  return {
    low:  Math.round(base * 0.9),
    mid:  Math.round(base),
    high: Math.round(base * 1.15),
    breakdown: {
      'Structure & Civil':            Math.round(base * 0.40),
      'Finishing Works':              Math.round(base * 0.25),
      'Electrical & Plumbing':        Math.round(base * 0.15),
      'Doors, Windows & Ironmongery': Math.round(base * 0.10),
      'Labour & Supervision':         Math.round(base * 0.10),
    },
  };
}

function fmt(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

/* ─── Step Data ──────────────────────────────────────────── */
const STEPS = [
  {
    id: 'type', label: 'Project Type',
    question: 'What are you looking to build?',
    subtitle: 'Select the type of construction project',
    options: [
      { value: 'residential', icon: '🏠', label: 'Residential Home',    desc: 'Independent houses, villas, bungalows' },
      { value: 'commercial',  icon: '🏢', label: 'Commercial Complex',  desc: 'Offices, malls, multi-storey buildings' },
      { value: 'retail',      icon: '🏪', label: 'Shop / Showroom',     desc: 'Retail outlets, showrooms, restaurants' },
      { value: 'renovation',  icon: '🔧', label: 'Renovation',          desc: 'Remodelling or extending existing structure' },
    ],
  },
  {
    id: 'area', label: 'Built-up Area',
    question: 'What is your approximate built-up area?',
    subtitle: 'Enter the total area in square feet',
    type: 'slider', min: 500, max: 20000, step: 100, default: 2000,
    presets: [
      { label: '1 BHK', value: 600 },
      { label: '2 BHK', value: 1000 },
      { label: '3 BHK', value: 1500 },
      { label: '4 BHK', value: 2200 },
      { label: 'Villa',  value: 4000 },
    ],
  },
  {
    id: 'quality', label: 'Quality Tier',
    question: 'What quality of construction are you looking for?',
    subtitle: 'This determines materials, finishes and grade',
    options: [
      { value: 'basic',    icon: '🪨', label: 'Basic',    desc: 'Standard materials, functional finishes. Good quality, cost-effective.', tags: ['ISI cement', 'Standard tiles', 'Basic fixtures'] },
      { value: 'standard', icon: '⭐', label: 'Standard', desc: 'Mid-range materials, better finishes, longer warranty.',                  tags: ['Ultratech cement', 'Vitrified tiles', 'CP fittings'] },
      { value: 'premium',  icon: '💎', label: 'Premium',  desc: 'Top-grade materials, premium finishes, architect-supervised.',            tags: ['ACC Gold cement', 'Italian marble', 'Branded fixtures'] },
    ],
  },
  {
    id: 'city', label: 'Location',
    question: 'Where is your project located?',
    subtitle: 'Labour and material costs vary by city',
    options: [
      { value: 'mumbai',    label: 'Mumbai' },    { value: 'delhi',     label: 'Delhi / NCR' },
      { value: 'bangalore', label: 'Bangalore' }, { value: 'pune',      label: 'Pune' },
      { value: 'hyderabad', label: 'Hyderabad' }, { value: 'ahmedabad', label: 'Ahmedabad' },
      { value: 'indore',    label: 'Indore' },    { value: 'bhopal',    label: 'Bhopal' },
      { value: 'lucknow',   label: 'Lucknow' },   { value: 'jaipur',    label: 'Jaipur' },
      { value: 'nagpur',    label: 'Nagpur' },    { value: 'other',     label: 'Other City' },
    ],
  },
  {
    id: 'contact', label: 'Your Details',
    question: 'Where should we send the detailed estimate?',
    subtitle: 'Get a personalised PDF report on WhatsApp',
    type: 'contact',
  },
];

/* ─── Progress Bar ───────────────────────────────────────── */
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
          Step {current} of {total}
        </span>
        <span style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
          {pct}% complete
        </span>
      </div>
      {/* Track */}
      <div style={{ height: 6, background: '#E8E4DD', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: 'var(--accent)', borderRadius: 99,
          transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      {/* Step dots — tight row, no flexbox gap issues */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
        {STEPS.map((s, i) => {
          const done    = i < current - 1;
          const active  = i === current - 1;
          return (
            <div key={s.id} style={{
              height: 6, borderRadius: 99,
              width: active ? 28 : done ? 20 : 6,
              background: active || done ? 'var(--accent)' : '#D8D4CC',
              transition: 'all 0.35s ease',
              flexShrink: 0,
            }} />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 1 — Type ──────────────────────────────────────── */
function TypeStep({ value, onChange }) {
  return (
    <>
      <style>{`
        .type-card {
          background: #fff;
          border: 2px solid #E0DBD3;
          border-radius: 12px;
          padding: 22px 18px;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .type-card:hover {
          border-color: var(--accent);
          box-shadow: 0 4px 20px rgba(200,137,26,0.12);
        }
        .type-card.selected {
          border-color: var(--accent);
          background: var(--accent-bg);
          box-shadow: 0 4px 20px rgba(200,137,26,0.15);
        }
      `}</style>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {STEPS[0].options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`type-card${value === opt.value ? ' selected' : ''}`}
          >
            <span style={{ fontSize: 30, display: 'block', marginBottom: 12, lineHeight: 1 }}>{opt.icon}</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>
              {opt.label}
            </p>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
              {opt.desc}
            </p>
            {value === opt.value && (
              <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--accent)', borderRadius: 20, padding: '2px 10px' }}>
                <span style={{ fontSize: 10, color: 'white', fontWeight: 700, fontFamily: 'var(--font-body)' }}>✓ SELECTED</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </>
  );
}

/* ─── Step 2 — Area ──────────────────────────────────────── */
function AreaStep({ value, onChange }) {
  const step = STEPS[1];
  return (
    <>
      <style>{`
        .area-preset {
          padding: 7px 16px; border-radius: 99px; cursor: pointer;
          font-size: 13px; font-family: var(--font-body); font-weight: 500;
          border: 1.5px solid #E0DBD3; background: #fff;
          color: var(--ink-muted); transition: all 0.18s;
        }
        .area-preset:hover { border-color: var(--accent); color: var(--accent); }
        .area-preset.active { background: var(--accent); color: #fff; border-color: var(--accent); }
        input[type=range] { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 99px; background: #E8E4DD; outline: none; cursor: pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: var(--accent); border: 3px solid #fff; box-shadow: 0 2px 8px rgba(200,137,26,0.35); cursor: pointer; }
        input[type=range]::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: var(--accent); border: 3px solid #fff; box-shadow: 0 2px 8px rgba(200,137,26,0.35); cursor: pointer; border: none; }
      `}</style>

      {/* Presets */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {step.presets.map(p => (
          <button
            key={p.value}
            onClick={() => onChange(p.value)}
            className={`area-preset${value === p.value ? ' active' : ''}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Big number */}
      <div style={{
        background: 'var(--ink)', borderRadius: 14,
        padding: '28px 24px', textAlign: 'center', marginBottom: 24,
      }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
          {value.toLocaleString()}
        </p>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: 4 }}>sq. ft.</p>
      </div>

      {/* Slider */}
      <input type="range" min={step.min} max={step.max} step={step.step}
        value={value} onChange={e => onChange(Number(e.target.value))} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginTop: 6, marginBottom: 20 }}>
        <span>500 sq ft</span><span>20,000 sq ft</span>
      </div>

      {/* Manual input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', fontWeight: 500, whiteSpace: 'nowrap' }}>Exact area:</span>
        <input type="number" value={value} min={step.min} max={step.max}
          onChange={e => onChange(Math.min(step.max, Math.max(step.min, Number(e.target.value))))}
          style={{ padding: '8px 12px', border: '1.5px solid #E0DBD3', borderRadius: 8, fontSize: 15, fontFamily: 'var(--font-body)', background: '#fff', color: 'var(--ink)', width: 110, outline: 'none' }}
        />
        <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>sq ft</span>
      </div>
    </>
  );
}

/* ─── Step 3 — Quality ───────────────────────────────────── */
function QualityStep({ value, onChange }) {
  return (
    <>
      <style>{`
        .quality-card {
          background: #fff; border: 2px solid #E0DBD3; border-radius: 12px;
          padding: 18px 20px; cursor: pointer; text-align: left; width: 100%;
          display: flex; align-items: flex-start; gap: 16;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          margin-bottom: 12px;
        }
        .quality-card:hover { border-color: var(--accent); box-shadow: 0 4px 16px rgba(200,137,26,0.1); }
        .quality-card.selected { border-color: var(--accent); background: var(--accent-bg); }
      `}</style>
      {STEPS[2].options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className={`quality-card${value === opt.value ? ' selected' : ''}`}>
          <span style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{opt.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{opt.label}</p>
              {value === opt.value && (
                <span style={{ background: 'var(--accent)', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 10, fontFamily: 'var(--font-body)', fontWeight: 700 }}>✓ SELECTED</span>
              )}
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: 10 }}>{opt.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {opt.tags.map(t => (
                <span key={t} style={{
                  fontSize: 11, padding: '3px 9px', borderRadius: 99,
                  background: value === opt.value ? 'rgba(200,137,26,0.15)' : '#F0EDE8',
                  color: value === opt.value ? 'var(--accent-dark)' : 'var(--ink-muted)',
                  fontFamily: 'var(--font-body)', fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>
          </div>
        </button>
      ))}
    </>
  );
}

/* ─── Step 4 — City ──────────────────────────────────────── */
function CityStep({ value, onChange }) {
  return (
    <>
      <style>{`
        .city-btn {
          background: #fff; border: 2px solid #E0DBD3; border-radius: 10px;
          padding: 14px 10px; cursor: pointer; text-align: center;
          transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
        }
        .city-btn:hover { border-color: var(--accent); box-shadow: 0 2px 12px rgba(200,137,26,0.1); }
        .city-btn.selected { border-color: var(--accent); background: var(--accent-bg); }
      `}</style>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {STEPS[3].options.map(opt => (
          <button key={opt.value} onClick={() => onChange(opt.value)}
            className={`city-btn${value === opt.value ? ' selected' : ''}`}>
            <p style={{
              fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: 600,
              color: value === opt.value ? 'var(--accent-dark)' : 'var(--ink)',
            }}>{opt.label}</p>
          </button>
        ))}
      </div>
    </>
  );
}

/* ─── Step 5 — Contact ───────────────────────────────────── */
function ContactStep({ value, onChange }) {
  return (
    <>
      <style>{`
        .contact-input {
          width: 100%; padding: 13px 16px;
          border: 2px solid #E0DBD3; border-radius: 10px;
          font-size: 15px; font-family: var(--font-body);
          background: #fff; color: var(--ink); outline: none;
          transition: border-color 0.18s;
        }
        .contact-input:focus { border-color: var(--accent); }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { key: 'name',  label: 'Full Name',     placeholder: 'Rajesh Sharma',    type: 'text',  required: true },
          { key: 'phone', label: 'Phone Number',  placeholder: '+91 98765 43210',  type: 'tel',   required: true },
          { key: 'email', label: 'Email Address', placeholder: 'rajesh@email.com', type: 'email', required: false },
        ].map(({ key, label, placeholder, type, required }) => (
          <div key={key}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-body)', marginBottom: 6 }}>
              {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
            </label>
            <input type={type} placeholder={placeholder} value={value?.[key] ?? ''}
              onChange={e => onChange({ ...value, [key]: e.target.value })}
              className="contact-input" />
          </div>
        ))}
        <p style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>🔒</span> Your details are 100% confidential. No spam, ever.
        </p>
      </div>
    </>
  );
}

/* ─── Result Screen ──────────────────────────────────────── */
const TYPE_LABELS    = { residential: 'Residential Home', commercial: 'Commercial Complex', retail: 'Shop / Showroom', renovation: 'Renovation' };
const CITY_LABELS    = { mumbai: 'Mumbai', delhi: 'Delhi / NCR', bangalore: 'Bangalore', pune: 'Pune', hyderabad: 'Hyderabad', ahmedabad: 'Ahmedabad', indore: 'Indore', bhopal: 'Bhopal', lucknow: 'Lucknow', jaipur: 'Jaipur', nagpur: 'Nagpur', other: 'Other City' };
const QUALITY_LABELS = { basic: 'Basic', standard: 'Standard', premium: 'Premium' };
const BAR_COLORS     = ['#C8891A', '#4A7C59', '#5B6FA6', '#9B6B9B', '#C85A3A'];

function ResultScreen({ answers, onReset }) {
  const est = calcEstimate(answers);
  const breakdownEntries = Object.entries(est.breakdown);

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 52, height: 52, background: '#E8F5E9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 22 }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>Your Estimate is Ready</h2>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
          {answers.area.toLocaleString()} sq ft · {TYPE_LABELS[answers.type]} · {QUALITY_LABELS[answers.quality]} · {CITY_LABELS[answers.city]}
        </p>
      </div>

      {/* Main cost */}
      <div style={{ background: 'var(--ink)', borderRadius: 14, padding: '28px 24px', textAlign: 'center', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, borderRadius: '50%', background: 'rgba(200,137,26,0.1)' }} />
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Estimated Total Cost</p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, color: 'white', lineHeight: 1, marginBottom: 4 }}>{fmt(est.mid)}</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: 20 }}>Range: {fmt(est.low)} – {fmt(est.high)}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            [fmt(Math.round(est.mid / answers.area)), 'per sq ft'],
            [answers.area.toLocaleString() + ' sqft', 'built-up area'],
            [QUALITY_LABELS[answers.quality], 'quality tier'],
          ].map(([v, l]) => (
            <div key={l}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--accent-light)' }}>{v}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ background: '#F7F4EF', border: '1px solid #E8E4DD', borderRadius: 12, padding: '20px', marginBottom: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-body)', marginBottom: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Cost Breakdown</p>
        {breakdownEntries.map(([label, amount], i) => {
          const pct = Math.round((amount / est.mid) * 100);
          return (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 13, color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 700 }}>{fmt(amount)} <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>({pct}%)</span></span>
              </div>
              <div style={{ height: 5, background: '#E0DBD3', borderRadius: 99 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: BAR_COLORS[i], borderRadius: 99, transition: 'width 1s ease' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '12px 14px', background: '#FDF6E7', border: '1px solid rgba(200,137,26,0.2)', borderRadius: 8, marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: '#7A5010', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          ⚠️ This is an approximate estimate. Actual costs may vary based on soil condition, design complexity, local material rates and site accessibility.
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210'}?text=${encodeURIComponent(`Hi, I used your Cost Estimator.\n\nProject: ${TYPE_LABELS[answers.type]}\nArea: ${answers.area.toLocaleString()} sq ft\nQuality: ${QUALITY_LABELS[answers.quality]}\nCity: ${CITY_LABELS[answers.city]}\nEstimate: ${fmt(est.mid)}\n\nI'd like a detailed quote.`)}`}
          target="_blank" rel="noopener noreferrer"
          style={{ flex: 1, padding: '13px 16px', background: '#25D366', color: 'white', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          💬 Share on WhatsApp
        </a>
        <a href={`mailto:hello@buildright.in?subject=Quote Request&body=Project: ${TYPE_LABELS[answers.type]}%0AArea: ${answers.area.toLocaleString()} sq ft%0AQuality: ${QUALITY_LABELS[answers.quality]}%0ACity: ${CITY_LABELS[answers.city]}%0AEstimate: ${fmt(est.mid)}`}
          style={{ flex: 1, padding: '13px 16px', background: 'var(--accent)', color: 'white', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          📧 Email My Quote
        </a>
      </div>
      <button onClick={onReset} style={{ width: '100%', padding: '11px', borderRadius: 8, border: '1.5px solid #E0DBD3', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-muted)', transition: 'all 0.2s' }}>
        ← Start a new estimate
      </button>
    </div>
  );
}

/* ─── Main Estimator ─────────────────────────────────────── */
const INITIAL = { type: '', area: 1500, quality: '', city: '', contact: {} };

export default function CostEstimator() {
  const [step, setStep]       = useState(1);
  const [answers, setAnswers] = useState(INITIAL);
  const [done, setDone]       = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currentStep = STEPS[step - 1];
  const update = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }));

  const canNext = () => {
    if (currentStep.id === 'type')    return !!answers.type;
    if (currentStep.id === 'area')    return answers.area >= 500;
    if (currentStep.id === 'quality') return !!answers.quality;
    if (currentStep.id === 'city')    return !!answers.city;
    if (currentStep.id === 'contact') return !!answers.contact?.name && !!answers.contact?.phone;
    return true;
  };

  const handleNext = async () => {
    if (step < STEPS.length) {
      setStep(s => s + 1);
    } else {
      setSubmitting(true);
      try { await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...answers, source: 'estimator' }) }); }
      catch (_) {}
      setSubmitting(false);
      setDone(true);
    }
  };

  if (done) return <ResultScreen answers={answers} onReset={() => { setStep(1); setAnswers(INITIAL); setDone(false); }} />;

  return (
    <>
      <style>{`
        .next-btn {
          flex: 1; padding: 14px 24px; border-radius: 10px; border: none;
          font-family: var(--font-body); font-size: 15px; font-weight: 700;
          cursor: pointer; transition: all 0.2s; letter-spacing: 0.01em;
        }
        .next-btn.active { background: var(--accent); color: white; box-shadow: 0 4px 16px rgba(200,137,26,0.3); }
        .next-btn.active:hover { background: var(--accent-dark); transform: translateY(-1px); }
        .next-btn.disabled { background: #E8E4DD; color: #B0A898; cursor: not-allowed; }
        .back-btn {
          padding: 14px 20px; border-radius: 10px; border: 2px solid #E0DBD3;
          background: #fff; cursor: pointer; font-family: var(--font-body);
          font-size: 15px; color: var(--ink-muted); transition: all 0.2s;
        }
        .back-btn:hover { border-color: var(--ink); color: var(--ink); }
      `}</style>

      <ProgressBar current={step} total={STEPS.length} />

      {/* Question header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,26px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 5 }}>
          {currentStep.question}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
          {currentStep.subtitle}
        </p>
      </div>

      {/* Step content */}
      <div style={{ marginBottom: 28 }}>
        {currentStep.id === 'type'    && <TypeStep    value={answers.type}    onChange={v => update('type', v)} />}
        {currentStep.id === 'area'    && <AreaStep    value={answers.area}    onChange={v => update('area', v)} />}
        {currentStep.id === 'quality' && <QualityStep value={answers.quality} onChange={v => update('quality', v)} />}
        {currentStep.id === 'city'    && <CityStep    value={answers.city}    onChange={v => update('city', v)} />}
        {currentStep.id === 'contact' && <ContactStep value={answers.contact} onChange={v => update('contact', v)} />}
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', gap: 10 }}>
        {step > 1 && <button className="back-btn" onClick={() => setStep(s => s - 1)}>← Back</button>}
        <button className={`next-btn ${canNext() && !submitting ? 'active' : 'disabled'}`}
          onClick={handleNext} disabled={!canNext() || submitting}>
          {submitting ? 'Calculating...' : step === STEPS.length ? '🎯 Show My Estimate' : 'Continue →'}
        </button>
      </div>
    </>
  );
}