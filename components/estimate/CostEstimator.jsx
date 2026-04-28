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
      'Structure & Civil':  Math.round(base * 0.40),
      'Finishing Works':    Math.round(base * 0.25),
      'Electrical & Plumbing': Math.round(base * 0.15),
      'Doors, Windows & Ironmongery': Math.round(base * 0.10),
      'Labour & Supervision': Math.round(base * 0.10),
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
    id: 'type',
    label: 'Project Type',
    question: 'What are you looking to build?',
    subtitle: 'Select the type of construction project',
    options: [
      { value: 'residential', icon: '🏠', label: 'Residential Home', desc: 'Independent houses, villas, bungalows' },
      { value: 'commercial',  icon: '🏢', label: 'Commercial Complex', desc: 'Offices, malls, multi-storey buildings' },
      { value: 'retail',      icon: '🏪', label: 'Shop / Showroom',   desc: 'Retail outlets, showrooms, restaurants' },
      { value: 'renovation',  icon: '🔧', label: 'Renovation',        desc: 'Remodelling or extending existing structure' },
    ],
  },
  {
    id: 'area',
    label: 'Built-up Area',
    question: 'What is your approximate built-up area?',
    subtitle: 'Enter the total area in square feet',
    type: 'slider',
    min: 500, max: 20000, step: 100, default: 2000,
    presets: [
      { label: '1 BHK (~600)', value: 600 },
      { label: '2 BHK (~1000)', value: 1000 },
      { label: '3 BHK (~1500)', value: 1500 },
      { label: '4 BHK (~2200)', value: 2200 },
      { label: 'Villa (~4000)', value: 4000 },
    ],
  },
  {
    id: 'quality',
    label: 'Quality Tier',
    question: 'What quality of construction are you looking for?',
    subtitle: 'This determines materials, finishes and grade',
    options: [
      {
        value: 'basic',
        icon: '🪨',
        label: 'Basic',
        desc: 'Standard materials, functional finishes. Good quality, cost-effective.',
        tags: ['ISI cement', 'Standard tiles', 'Basic fixtures'],
      },
      {
        value: 'standard',
        icon: '⭐',
        label: 'Standard',
        desc: 'Mid-range materials, better finishes, longer warranty.',
        tags: ['Ultratech cement', 'Vitrified tiles', 'CP fittings'],
      },
      {
        value: 'premium',
        icon: '💎',
        label: 'Premium',
        desc: 'Top-grade materials, premium finishes, architect-supervised.',
        tags: ['ACC Gold cement', 'Italian marble', 'Branded fixtures'],
      },
    ],
  },
  {
    id: 'city',
    label: 'Location',
    question: 'Where is your project located?',
    subtitle: 'Labour and material costs vary by city',
    options: [
      { value: 'mumbai',    icon: '🌆', label: 'Mumbai' },
      { value: 'delhi',     icon: '🏛️', label: 'Delhi / NCR' },
      { value: 'bangalore', icon: '🌿', label: 'Bangalore' },
      { value: 'pune',      icon: '🏙️', label: 'Pune' },
      { value: 'hyderabad', icon: '🕌', label: 'Hyderabad' },
      { value: 'ahmedabad', icon: '🏗️', label: 'Ahmedabad' },
      { value: 'indore',    icon: '🌇', label: 'Indore' },
      { value: 'bhopal',    icon: '🏘️', label: 'Bhopal' },
      { value: 'lucknow',   icon: '🕍', label: 'Lucknow' },
      { value: 'jaipur',    icon: '🏰', label: 'Jaipur' },
      { value: 'nagpur',    icon: '🌳', label: 'Nagpur' },
      { value: 'other',     icon: '📍', label: 'Other City' },
    ],
  },
  {
    id: 'contact',
    label: 'Your Details',
    question: 'Where should we send the detailed estimate?',
    subtitle: 'Get a personalised PDF report on WhatsApp',
    type: 'contact',
  },
];

/* ─── Sub-components ─────────────────────────────────────── */

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
          Step {current} of {total}
        </span>
        <span style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
          {pct}% complete
        </span>
      </div>
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: 'var(--accent)', borderRadius: 4,
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </div>
      {/* Step dots */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
        {STEPS.map((s, i) => (
          <div key={s.id} style={{
            width: i < current ? 24 : 8, height: 8,
            borderRadius: 4, transition: 'all 0.3s ease',
            background: i < current ? 'var(--accent)' : i === current - 1 ? 'var(--accent)' : 'var(--border)',
          }} />
        ))}
      </div>
    </div>
  );
}

function TypeStep({ value, onChange }) {
  const step = STEPS[0];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {step.options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          background: value === opt.value ? 'var(--accent-bg)' : 'var(--bg)',
          border: `2px solid ${value === opt.value ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 10, padding: '20px 18px', cursor: 'pointer',
          textAlign: 'left', transition: 'all 0.2s', width: '100%',
        }}>
          <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>{opt.icon}</span>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
            {opt.label}
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>
            {opt.desc}
          </p>
          {value === opt.value && (
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: 'var(--accent)', fontSize: 12 }}>✓</span>
              <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>Selected</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

function AreaStep({ value, onChange }) {
  const step = STEPS[1];
  return (
    <div>
      {/* Presets */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {step.presets.map(p => (
          <button key={p.value} onClick={() => onChange(p.value)} style={{
            padding: '7px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 13,
            fontFamily: 'var(--font-body)', fontWeight: 500,
            background: value === p.value ? 'var(--accent)' : 'var(--bg)',
            color: value === p.value ? 'white' : 'var(--ink-muted)',
            border: `1px solid ${value === p.value ? 'var(--accent)' : 'var(--border)'}`,
            transition: 'all 0.2s',
          }}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Big display */}
      <div style={{
        background: 'var(--bg)', border: '2px solid var(--accent)',
        borderRadius: 12, padding: '28px 24px', textAlign: 'center', marginBottom: 24,
      }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 900, color: 'var(--ink)', lineHeight: 1 }}>
          {value.toLocaleString()}
        </p>
        <p style={{ fontSize: 16, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', marginTop: 4 }}>sq. ft.</p>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={step.min} max={step.max} step={step.step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--accent)', height: 6, cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginTop: 6 }}>
        <span>500 sq ft</span>
        <span>20,000 sq ft</span>
      </div>

      {/* Manual input */}
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <label style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
          Type exact area:
        </label>
        <input
          type="number"
          value={value}
          min={step.min} max={step.max}
          onChange={e => {
            const v = Math.min(step.max, Math.max(step.min, Number(e.target.value)));
            onChange(v);
          }}
          style={{
            padding: '8px 14px', border: '1px solid var(--border)',
            borderRadius: 6, fontSize: 15, fontFamily: 'var(--font-body)',
            background: 'var(--bg)', color: 'var(--ink)', width: 120,
            outline: 'none',
          }}
        />
        <span style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>sq ft</span>
      </div>
    </div>
  );
}

function QualityStep({ value, onChange }) {
  const step = STEPS[2];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {step.options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          background: value === opt.value ? 'var(--accent-bg)' : 'var(--bg)',
          border: `2px solid ${value === opt.value ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 10, padding: '18px 20px', cursor: 'pointer',
          textAlign: 'left', transition: 'all 0.2s', width: '100%',
          display: 'flex', alignItems: 'flex-start', gap: 16,
        }}>
          <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{opt.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>{opt.label}</p>
              {value === opt.value && (
                <span style={{ background: 'var(--accent)', color: 'white', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  ✓ Selected
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: 10 }}>
              {opt.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {opt.tags.map(t => (
                <span key={t} style={{
                  fontSize: 11, padding: '3px 9px', borderRadius: 10,
                  background: value === opt.value ? 'rgba(200,137,26,0.12)' : 'var(--bg-card)',
                  color: value === opt.value ? 'var(--accent-dark)' : 'var(--ink-muted)',
                  fontFamily: 'var(--font-body)', fontWeight: 500,
                  border: '1px solid var(--border)',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function CityStep({ value, onChange }) {
  const step = STEPS[3];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
      {step.options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          background: value === opt.value ? 'var(--accent-bg)' : 'var(--bg)',
          border: `2px solid ${value === opt.value ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 8, padding: '14px 10px', cursor: 'pointer',
          textAlign: 'center', transition: 'all 0.2s',
        }}>
          <span style={{ fontSize: 20, display: 'block', marginBottom: 6 }}>{opt.icon}</span>
          <p style={{ fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: 500, color: value === opt.value ? 'var(--accent-dark)' : 'var(--ink)' }}>
            {opt.label}
          </p>
        </button>
      ))}
    </div>
  );
}

function ContactStep({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[
        { key: 'name',  label: 'Full Name',    placeholder: 'Rajesh Sharma',         type: 'text' },
        { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210',        type: 'tel' },
        { key: 'email', label: 'Email Address', placeholder: 'rajesh@example.com',   type: 'email' },
      ].map(({ key, label, placeholder, type }) => (
        <div key={key}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-body)', marginBottom: 6, letterSpacing: '0.03em' }}>
            {label} {key !== 'email' && <span style={{ color: 'var(--accent)' }}>*</span>}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            value={value?.[key] ?? ''}
            onChange={e => onChange({ ...value, [key]: e.target.value })}
            style={{
              width: '100%', padding: '12px 16px',
              border: '1.5px solid var(--border)', borderRadius: 8,
              fontSize: 15, fontFamily: 'var(--font-body)',
              background: 'var(--bg)', color: 'var(--ink)', outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
      ))}
      <p style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'var(--font-body)', marginTop: 4 }}>
        🔒 Your details are 100% confidential. No spam, ever.
      </p>
    </div>
  );
}

/* ─── Result Screen ──────────────────────────────────────── */

const TYPE_LABELS = { residential: 'Residential Home', commercial: 'Commercial Complex', retail: 'Shop / Showroom', renovation: 'Renovation' };
const CITY_LABELS = { mumbai: 'Mumbai', delhi: 'Delhi / NCR', bangalore: 'Bangalore', pune: 'Pune', hyderabad: 'Hyderabad', ahmedabad: 'Ahmedabad', indore: 'Indore', bhopal: 'Bhopal', lucknow: 'Lucknow', jaipur: 'Jaipur', nagpur: 'Nagpur', other: 'Other City' };
const QUALITY_LABELS = { basic: 'Basic', standard: 'Standard', premium: 'Premium' };
const BREAKDOWN_COLORS = ['#C8891A', '#4A7C59', '#5B6FA6', '#9B6B9B', '#C85A3A'];

function ResultScreen({ answers, onReset }) {
  const est = calcEstimate(answers);
  const total = est.mid;
  const breakdownEntries = Object.entries(est.breakdown);

  return (
    <div>
      <style>{`
        .result-share-btn {
          flex: 1; padding: 13px 20px; border-radius: 8px; border: none;
          cursor: pointer; font-family: var(--font-body); font-size: 14px; font-weight: 600;
          transition: all 0.2s; text-decoration: none; display: inline-flex;
          align-items: center; justify-content: center; gap: 8px;
        }
        .result-share-btn:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 56, height: 56, background: 'rgba(200,137,26,0.12)',
          borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 16px', fontSize: 24,
        }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
          Your Estimate is Ready
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
          Based on {answers.area.toLocaleString()} sq ft · {TYPE_LABELS[answers.type]} · {QUALITY_LABELS[answers.quality]} quality · {CITY_LABELS[answers.city]}
        </p>
      </div>

      {/* Main cost display */}
      <div style={{
        background: 'var(--ink)', borderRadius: 14, padding: '32px 28px',
        textAlign: 'center', marginBottom: 20, position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: -40, right: -40, width: 160, height: 160,
          borderRadius: '50%', background: 'rgba(200,137,26,0.12)',
        }} />
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          Estimated Total Cost
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 6vw, 52px)', fontWeight: 900, color: 'white', lineHeight: 1, marginBottom: 6 }}>
          {fmt(est.mid)}
        </p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>
          Range: {fmt(est.low)} – {fmt(est.high)}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--accent-light)' }}>
              {fmt(Math.round(est.mid / answers.area))}
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>per sq ft</p>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--accent-light)' }}>
              {answers.area.toLocaleString()} sq ft
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>built-up area</p>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--accent-light)' }}>
              {QUALITY_LABELS[answers.quality]}
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>quality tier</p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 22px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-body)', marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Cost Breakdown
        </p>
        {breakdownEntries.map(([label, amount], i) => {
          const pct = Math.round((amount / total) * 100);
          return (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 13, color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 700 }}>{fmt(amount)} <span style={{ fontWeight: 400, color: 'var(--ink-muted)' }}>({pct}%)</span></span>
              </div>
              <div style={{ height: 6, background: 'var(--border)', borderRadius: 3 }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  background: BREAKDOWN_COLORS[i], borderRadius: 3,
                  transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div style={{
        padding: '12px 16px', background: 'var(--accent-bg)',
        border: '1px solid rgba(200,137,26,0.2)', borderRadius: 8, marginBottom: 24,
      }}>
        <p style={{ fontSize: 12, color: 'var(--accent-dark)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          ⚠️ This is an approximate estimate. Actual costs may vary based on soil condition, design complexity, local material rates and site accessibility. A detailed quote requires a site visit.
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '7891250008'}?text=${encodeURIComponent(
            `Hi, I used your Cost Estimator.\n\nProject: ${TYPE_LABELS[answers.type]}\nArea: ${answers.area.toLocaleString()} sq ft\nQuality: ${QUALITY_LABELS[answers.quality]}\nCity: ${CITY_LABELS[answers.city]}\nEstimate: ${fmt(est.mid)}\n\nI'd like a detailed quote.`
          )}`}
          target="_blank" rel="noopener noreferrer"
          className="result-share-btn"
          style={{ background: '#25D366', color: 'white', flex: 1 }}>
          <span>💬</span> Share on WhatsApp
        </a>
        <a
          href={`mailto:hello@buildright.in?subject=Detailed Quote Request&body=Project: ${TYPE_LABELS[answers.type]}%0AArea: ${answers.area.toLocaleString()} sq ft%0AQuality: ${QUALITY_LABELS[answers.quality]}%0ACity: ${CITY_LABELS[answers.city]}%0AEstimate: ${fmt(est.mid)}`}
          className="result-share-btn"
          style={{ background: 'var(--accent)', color: 'white', flex: 1 }}>
          <span>📧</span> Email Me the Quote
        </a>
      </div>

      <button onClick={onReset} style={{
        width: '100%', padding: '12px', borderRadius: 8,
        border: '1px solid var(--border)', background: 'transparent',
        cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14,
        color: 'var(--ink-muted)', transition: 'all 0.2s',
      }}>
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
  const totalSteps  = STEPS.length;

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
    if (step < totalSteps) {
      setStep(s => s + 1);
    } else {
      // Submit
      setSubmitting(true);
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...answers, source: 'estimator' }),
        });
      } catch (_) { /* fail silently — result still shown */ }
      setSubmitting(false);
      setDone(true);
    }
  };

  const handleBack = () => { if (step > 1) setStep(s => s - 1); };

  const handleReset = () => { setStep(1); setAnswers(INITIAL); setDone(false); };

  if (done) return <ResultScreen answers={answers} onReset={handleReset} />;

  return (
    <div>
      <ProgressBar current={step} total={totalSteps} />

      {/* Question header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
          {currentStep.question}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
          {currentStep.subtitle}
        </p>
      </div>

      {/* Step content */}
      <div style={{ marginBottom: 32 }}>
        {currentStep.id === 'type'    && <TypeStep    value={answers.type}    onChange={v => update('type', v)} />}
        {currentStep.id === 'area'    && <AreaStep    value={answers.area}    onChange={v => update('area', v)} />}
        {currentStep.id === 'quality' && <QualityStep value={answers.quality} onChange={v => update('quality', v)} />}
        {currentStep.id === 'city'    && <CityStep    value={answers.city}    onChange={v => update('city', v)} />}
        {currentStep.id === 'contact' && <ContactStep value={answers.contact} onChange={v => update('contact', v)} />}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12 }}>
        {step > 1 && (
          <button onClick={handleBack} style={{
            padding: '13px 24px', borderRadius: 8,
            border: '1px solid var(--border)', background: 'transparent',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 15,
            color: 'var(--ink-muted)', transition: 'all 0.2s',
          }}>
            ← Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canNext() || submitting}
          style={{
            flex: 1, padding: '14px 24px', borderRadius: 8, border: 'none',
            background: canNext() ? 'var(--accent)' : 'var(--border)',
            color: canNext() ? 'white' : 'var(--ink-light)',
            cursor: canNext() ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
            transition: 'all 0.2s', letterSpacing: '0.02em',
          }}>
          {submitting ? 'Calculating...' : step === totalSteps ? '🎯 Show My Estimate' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}