'use client';
import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const message = encodeURIComponent(
    'Hi, I\'m interested in construction services. Can you help me with a free estimate?'
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 200,
        width: 56, height: 56, borderRadius: '50%',
        background: '#25D366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.6)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        cursor: 'pointer',
      }}
    >
      {/* Pulse ring */}
      <span style={{
        position: 'absolute', width: '100%', height: '100%',
        borderRadius: '50%', background: '#25D366', opacity: 0.4,
        animation: 'whatsapp-pulse 2s ease-out infinite',
      }} />
      {/* WhatsApp icon */}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
        <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.67 4.82 1.84 6.84L2 30l7.36-1.82A13.94 13.94 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5a11.44 11.44 0 01-5.82-1.58l-.42-.25-4.36 1.08 1.1-4.24-.27-.44A11.44 11.44 0 014.5 16c0-6.34 5.16-11.5 11.5-11.5S27.5 9.66 27.5 16 22.34 27.5 16 27.5zm6.3-8.58c-.34-.17-2.02-1-2.34-1.11-.32-.11-.55-.17-.78.17-.23.34-.89 1.11-1.09 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.01-1.9-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.66c-.23 0-.6.09-.91.43-.32.34-1.2 1.17-1.2 2.86 0 1.68 1.23 3.31 1.4 3.54.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.02-.83 2.31-1.62.28-.8.28-1.48.2-1.62-.09-.14-.32-.23-.66-.4z"/>
      </svg>
      <style>{`
        @keyframes whatsapp-pulse {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </a>
  );
}