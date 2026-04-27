import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import { ReactNode } from "react";

export const metadata = {
  title: {
    default: 'BuildRight Construction | Pan India Construction Services',
    template: '%s | BuildRight Construction',
  },
  description:
    'Professional construction company specialising in residential homes, commercial complexes and shops across India. Get a free estimate today.',
  keywords: [
    'construction company india',
    'house construction',
    'commercial construction',
    'building contractor',
    'construction services pan india',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'BuildRight Construction',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}