# ECOSENSE - Smart Air Quality Monitoring IoT Device

ECOSENSE is an innovative IoT device designed to monitor indoor CO₂ levels in real-time, providing intelligent alerts and actionable recommendations to improve air quality and protect your health.

## Features

- **Real-Time CO₂ Monitoring**: Continuous tracking with laboratory-grade precision
- **AI-Powered Insights**: Edge AI processing and machine learning analytics
- **Smart Alerts**: Instant notifications when air quality thresholds are exceeded
- **IoT Connected**: Seamlessly integrates with your smart home ecosystem
- **Long Battery Life**: Up to 12 months of continuous operation
- **Cloud Analytics**: Historical data tracking and trend analysis
- **Mobile App**: Remote monitoring and control from anywhere

## Tech Stack

This website is built with modern web technologies:

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation

1. Clone or download this repository:

```bash
git clone <repository-url>
cd ecosense-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

The website should now be running locally on your machine.

## Project Structure

```
ecosense-website/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── order/
│   │   └── page.tsx        # Order page
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── navbar.tsx          # Navigation bar with smooth scrolling
│   ├── hero.tsx            # Hero section with CTA
│   ├── about.tsx           # About section with features
│   ├── reviews.tsx         # User reviews/testimonials
│   ├── contact.tsx         # Contact form and info
│   ├── footer.tsx          # Footer with links
│   └── ui/                 # shadcn/ui components
├── public/                 # Static assets
└── README.md              # This file
```

## Features Overview

### Navigation

- Smooth scrolling to all page sections
- Responsive mobile menu
- Fixed navbar with scroll effects
- Cross-page navigation support

### Sections

1. **Hero**: Eye-catching introduction with key statistics and CTA buttons
2. **About**: Detailed information about ECOSENSE, key features, and how it works (5-step process)
3. **Reviews**: Customer testimonials and ratings
4. **Contact**: Contact form with company information
5. **Order Page**: Complete order form with payment options and order summary

### Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1280px and up)

## Customization

### Colors

Edit the design tokens in `app/globals.css` to customize the color scheme:

```css
@theme inline {
  --color-primary: ...;
  --color-accent: ...;
  /* etc. */
}
```

### Content

Update the content in component files:
- `components/hero.tsx` - Hero section text and stats
- `components/about.tsx` - Features and how it works
- `components/reviews.tsx` - Customer testimonials
- `components/contact.tsx` - Contact information

### Typography

Fonts are configured in `app/layout.tsx` and `app/globals.css`. To change fonts, update the font imports and theme variables.

## Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

To run the production build locally:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import the project in Vercel
3. Configure your domain (optional)
4. Deploy!

Alternatively, you can deploy to any platform that supports Next.js.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for ECOSENSE startup. All rights reserved.

## Support

For questions or support, contact:
- Email: support@ecosense.io
- Phone: +1 (555) 123-4567

---

Built with ❤️ for a healthier environment
