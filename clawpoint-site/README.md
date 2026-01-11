# Clawpoint Security - Tactical Cybersecurity Website

A Next.js website with a feral, tactical, special forces aesthetic for Clawpoint Security - a cybersecurity company focused on hunting threats and reducing cognitive load for security teams.

## Overview

This is a complete, production-ready Next.js 16 website built with TypeScript, Tailwind CSS 4, and a dark, immersive tactical theme. The site delivers an Alice in Wonderland-style journey experience, making users feel like they're stalking through a digital forest toward the primary CTA: scheduling a meeting.

## Features

### Design & UX
- **Tactical Aesthetic**: Black and white base with tactical green accents and strategic red alerts
- **Immersive Animations**: Matrix rain effects, scanlines, eye glow, tactical fade-ins
- **Night Vision Theme**: Green (#00ff41) as the signature color with glowing effects
- **Military Typography**: Orbitron and Special Elite fonts for commanding presence
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Performance Optimized**: Static generation, optimized fonts, minimal JavaScript

### Pages

1. **Home (/)** - Forest journey experience with scroll progress indicator
2. **About (/about)** - Company mission, values, and tactical methodology
3. **Solutions (/solutions)** - Mission Assurance Suite and specialized operations
4. **Careers (/careers)** - Join the hunt - recruitment and open positions
5. **Information (/information)** - Intel Hub with threat intelligence and resources
6. **Infinite View (/infinite-view)** - Signature eye animation and monitoring platform
7. **Contact (/contact)** - Secure communication channels and contact form

### Reusable Components

Located in `/components`:

- **Navigation** - Tactical nav with mobile menu, scroll effects
- **Footer** - Complete footer with links and system status
- **CTAButton** - Multiple variants (primary, secondary, alert, ghost)
- **SolutionCard** - Service cards with tactical styling
- **EyeAnimation** - Interactive eye that follows the cursor

### Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Fonts**: Google Fonts (Geist, Geist Mono, Orbitron, Special Elite)
- **Deployment**: Optimized for Vercel, Netlify, or any static host

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
clawpoint-site/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── careers/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── infinite-view/
│   │   └── page.tsx
│   ├── information/
│   │   └── page.tsx
│   ├── solutions/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CTAButton.tsx
│   ├── EyeAnimation.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── SolutionCard.tsx
├── public/
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Design System

### Color Palette

```css
--background: #000000          /* Pure black */
--foreground: #ffffff          /* Pure white */
--tactical-green: #0a4d0a     /* Military green */
--tactical-green-light: #1a6b1a
--tactical-green-dark: #052805
--night-vision: #00ff41       /* Signature green glow */
--red-alert: #ff0000          /* Critical CTAs only */
--red-alert-dim: #8b0000
```

### Typography

- **Headings**: Orbitron (tactical, futuristic)
- **Subheadings**: Special Elite (military stencil)
- **Body**: Geist Sans (clean, modern)
- **Code/Mono**: Geist Mono (technical feel)

### Custom CSS Classes

Located in `app/globals.css`:

- `.tactical-grid` - Grid background effect
- `.scanline` - CRT scanline animation
- `.glitch-effect` - Subtle glitch animation
- `.stalk-in` - Fade-in animation for scroll
- `.eye-glow` - Pulsing glow effect
- `.tactical-fade-in` - Blur-to-focus entrance
- `.night-vision-vignette` - Radial darkness overlay
- `.pulse-alert` - Pulsing for CTAs

## Customization

### Updating Content

All page content is in the respective `page.tsx` files. Simply edit the text, stats, or feature lists as needed.

### Changing Colors

Edit color variables in `app/globals.css` under `:root` and `@theme inline`.

### Adding Pages

Create a new folder in `app/` with a `page.tsx` file:

```bash
mkdir app/new-page
touch app/new-page/page.tsx
```

Add navigation link in `components/Navigation.tsx`.

### Modifying Components

All reusable components are in `/components`. They accept props for customization.

## Performance

- **Lighthouse Score Target**: 90+ on all metrics
- **Static Generation**: All pages pre-rendered at build time
- **Font Optimization**: Using next/font for optimal loading
- **Image Optimization**: Ready for next/image implementation
- **CSS**: Tailwind CSS with minimal runtime overhead

## SEO

Each page includes:
- Custom meta titles and descriptions
- Open Graph tags for social sharing
- Proper semantic HTML structure
- Accessibility features (ARIA labels, keyboard navigation)

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatible
- Focus indicators on all interactive elements

## Future Enhancements

Potential additions for later:

- Blog/article functionality with CMS integration
- Client portal with authentication
- Live chat integration
- Multi-language support
- Dark/Light mode toggle (currently dark-only)
- Advanced animations with Framer Motion
- Integration with security assessment APIs

## License

Proprietary - Clawpoint Security

## Contact

For questions or support regarding this website:
- Email: contact@clawpoint.security
- Emergency: 1-800-CLAW-911

---

**Built with tactical precision. Optimized for the hunt.**
