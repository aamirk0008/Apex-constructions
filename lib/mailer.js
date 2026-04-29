// Using Resend (free tier: 3000 emails/month)
// Install: npm install resend
// Alternative: swap with Nodemailer if you prefer SMTP

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL  = process.env.CONTACT_EMAIL || 'hello@buildright.in';
const SITE_URL       = process.env.NEXT_PUBLIC_SITE_URL || 'https://buildright.in';

export async function sendLeadNotification({ name, phone, email, city, message, source, projectType, area, quality, estimateMid }) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email');
    return;
  }

  const isEstimator = source === 'estimator';

  const subject = isEstimator
    ? `🏗️ New Estimate Lead: ${name} (${city})`
    : `📩 New Contact Form: ${name} (${city || 'Unknown city'})`;

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f6f1; border-radius: 12px; overflow: hidden;">
      <div style="background: #1A1714; padding: 24px 32px;">
        <h1 style="color: #C8891A; font-size: 22px; margin: 0; font-weight: 700;">BuildRight — New Lead</h1>
        <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 6px 0 0;">
          ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
        </p>
      </div>

      <div style="padding: 28px 32px;">
        <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #E8E4DD; margin-bottom: 16px;">
          <h2 style="font-size: 14px; color: #9E9890; margin: 0 0 14px; letter-spacing: 0.06em; text-transform: uppercase;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 7px 0; color: #6B6560; font-size: 13px; width: 120px;">Name</td><td style="padding: 7px 0; font-size: 14px; font-weight: 600; color: #1A1714;">${name}</td></tr>
            <tr><td style="padding: 7px 0; color: #6B6560; font-size: 13px;">Phone</td><td style="padding: 7px 0; font-size: 14px; font-weight: 600; color: #1A1714;"><a href="tel:${phone}" style="color: #C8891A;">${phone}</a></td></tr>
            ${email ? `<tr><td style="padding: 7px 0; color: #6B6560; font-size: 13px;">Email</td><td style="padding: 7px 0; font-size: 14px; color: #1A1714;">${email}</td></tr>` : ''}
            ${city  ? `<tr><td style="padding: 7px 0; color: #6B6560; font-size: 13px;">City</td><td style="padding: 7px 0; font-size: 14px; color: #1A1714;">${city}</td></tr>` : ''}
            <tr><td style="padding: 7px 0; color: #6B6560; font-size: 13px;">Source</td><td style="padding: 7px 0; font-size: 14px; color: #1A1714;">${isEstimator ? 'Cost Estimator Tool' : 'Contact Form'}</td></tr>
          </table>
        </div>

        ${isEstimator ? `
        <div style="background: #FDF6E7; border: 1px solid rgba(200,137,26,0.2); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
          <h2 style="font-size: 14px; color: #9E6B10; margin: 0 0 14px; letter-spacing: 0.06em; text-transform: uppercase;">Project Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 7px 0; color: #9E6B10; font-size: 13px; width: 120px;">Type</td><td style="padding: 7px 0; font-size: 14px; font-weight: 600; color: #1A1714;">${projectType || '—'}</td></tr>
            <tr><td style="padding: 7px 0; color: #9E6B10; font-size: 13px;">Area</td><td style="padding: 7px 0; font-size: 14px; font-weight: 600; color: #1A1714;">${area ? area.toLocaleString() + ' sq ft' : '—'}</td></tr>
            <tr><td style="padding: 7px 0; color: #9E6B10; font-size: 13px;">Quality</td><td style="padding: 7px 0; font-size: 14px; font-weight: 600; color: #1A1714;">${quality || '—'}</td></tr>
            <tr><td style="padding: 7px 0; color: #9E6B10; font-size: 13px;">Estimate</td><td style="padding: 7px 0; font-size: 18px; font-weight: 700; color: #C8891A;">${estimateMid ? '₹' + (estimateMid >= 100000 ? (estimateMid/100000).toFixed(1) + ' L' : estimateMid.toLocaleString()) : '—'}</td></tr>
          </table>
        </div>
        ` : ''}

        ${message ? `
        <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #E8E4DD; margin-bottom: 16px;">
          <h2 style="font-size: 14px; color: #9E9890; margin: 0 0 10px; letter-spacing: 0.06em; text-transform: uppercase;">Message</h2>
          <p style="font-size: 14px; color: #1A1714; line-height: 1.6; margin: 0;">${message}</p>
        </div>
        ` : ''}

        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <a href="tel:${phone}" style="flex: 1; background: #C8891A; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center; display: block;">
            📞 Call Now
          </a>
          <a href="https://wa.me/${phone.replace(/\D/g,'')}?text=Hi ${encodeURIComponent(name)}, thank you for reaching out to BuildRight!" 
             style="flex: 1; background: #25D366; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center; display: block;">
            💬 WhatsApp
          </a>
        </div>
      </div>

      <div style="padding: 16px 32px; background: #1A1714; text-align: center;">
        <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">
          BuildRight Construction · <a href="${SITE_URL}" style="color: #C8891A;">buildright.in</a>
        </p>
      </div>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'BuildRight Leads <leads@buildright.in>',
        to:   [CONTACT_EMAIL],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
    }
  } catch (err) {
    console.error('Email send failed:', err);
  }
}