# BuildRight Construction Website

A modern, responsive construction company website built with Next.js, featuring service listings, project showcases, city coverage, cost estimation tools, and contact functionality.

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D2)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

## About BuildRight

**BuildRight Construction** is a professional construction company delivering quality residential homes, commercial complexes, shops, and renovation services across **20+ cities in India**.

- 🏗️ **150+ Projects Completed**
- 📅 **18 Years Experience**
- 🌆 **20+ Cities Covered**
- ⭐ **98% Client Satisfaction**
- 💰 **₹200Cr+ Value Constructed**

## Services

| Service | Starting At | Timeline |
|---------|-------------|----------|
| Residential Construction | ₹1,600/sq ft | 10-20 months |
| Commercial Construction | ₹1,900/sq ft | 18-36 months |
| Shops & Showrooms | ₹1,750/sq ft | 6-14 months |
| Renovation & Remodelling | ₹900/sq ft | 3-8 months |

## Cities Served

We operate across major Indian cities:

- Delhi / NCR
- Mumbai
- Bangalore
- Pune
- Hyderabad
- Indore
- Bhopal
- Jaipur
- Ahmedabad
- Lucknow
- Nagpur
- Surat

## Tech Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Email:** Resend
- **Hosting:** Vercel (recommended)

## Features

### Pages
- **Home** (`/`) - Hero section, services overview, featured projects, testimonials, stats
- **About** (`/about`) - Company history, timeline, team, values, certifications
- **Services** (`/services`) - Detailed service listings with pricing and timelines
- **Projects** (`/projects`) - Project gallery with filtering by type and city
- **Project Detail** (`/projects/[slug]`) - Individual project case studies
- **Cities** (`/cities`) - City coverage overview
- **City Detail** (`/cities/[city]`) - City-specific information and projects
- **Estimate** (`/estimate`) - Interactive cost estimator tool
- **Contact** (`/contact`) - Contact form, contact details, FAQ

### Components
- **Navbar** - Responsive navigation with mobile menu
- **Footer** - Site footer with links and contact info
- **WhatsAppButton** - Floating WhatsApp CTA
- **ProjectGallery** - Filterable project grid
- **ContactForm** - Multi-field contact form
- **CostEstimator** - Interactive project cost calculator
- **EstimatorResult** - Cost estimation results display

### API Routes
- `/api/contact` - Contact form submission
- `/api/leads` - Lead generation and management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
cd construction-website

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Create production build
npm run build

# Start production server
npm run start
```

## Project Structure

```
construction-website/
├── app/                    # Next.js App Router pages
│   ├── about/            # About page
│   ├── api/              # API routes
│   │   ├── contact/      # Contact API
│   │   └── leads/       # Leads API
│   ├── cities/          # Cities pages
│   ├── contact/         # Contact page
│   ├── estimate/       # Cost estimator
│   ├── projects/       # Projects and detail
│   ├── services/       # Services page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── contact/        # Contact components
│   ├── estimate/      # Estimator components
│   ├── layout/        # Layout components
│   └── projects/      # Project components
├── lib/                # Utility libraries
│   ├── cities.js       # City data
│   ├── projects.js    # Project data
│   ├── mongodb.js     # Database connection
│   ├── mailer.js      # Email functionality
│   └── models/       # Mongoose models
├── public/             # Static assets
├── package.json       # Dependencies
├── tailwind.config.js # Tailwind config
├── tsconfig.json     # TypeScript config
└── next.config.ts   # Next.js config
```

## Environment Variables

Create a `.env.local` file for local development:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/buildright

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Certifications & Credentials

- ✅ **RERA Registered** - MP RERA No. P-12345
- ✅ **ISO 9001:2015** - Quality Management Systems
- ✅ **GST Registered** - GSTIN: 23XXXXX1234Z1
- ✅ **1-Year Structural Warranty** - On all projects


## Company Timeline

| Year | Milestone |
|------|-----------|
| 2006 | Founded in Indore |
| 2009 | First Commercial Project |
| 2012 | Expanded to 5 Cities |
| 2015 | RERA Registration |
| 2018 | 100 Projects Milestone |
| 2021 | ISO 9001 Certified |
| 2024 | 150+ Projects, 20+ Cities |

## Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#C8891A` | Accent, CTAs |
| Primary Dark | `#9A6B10` | Hover states |
| Primary Light | `#E5C99D` | Backgrounds |
| Ink | `#1A1716` | Text, dark |
| Ink Muted | `#6B6560` | Secondary text |
| Border | `#E8E4DD` | Borders |
| Background | `#F5F2ED` | Page background |
| Card | `#FFFFFF` | Card background |

## License

Private - All rights reserved.

## Contact

- 📞 +91 98765 43210
- 📧 aamirsheikh0008@gmail.com
- 🌐 [BuildRight Construction](https://buildright.in)

---

Built with Next.js and Tailwind CSS 🚀
