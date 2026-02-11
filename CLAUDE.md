# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dayanna Vivanco - Landing page para psicóloga clínica. Built with Next.js, GSAP animations, CSS-based cloud animations, and Tailwind CSS.

## Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 with `@theme inline` CSS variables
- **Animations**: GSAP with ScrollTrigger, CSS animations for clouds
- **Fonts**: Playfair Display (headings), Poppins (body), Inter (UI)

### Color Palette (defined in globals.css)
- Turquoise: `#2DD4BF` (primary accent - buttons, highlights)
- Turquoise Dark: `#14B8A6` (hover states)
- Turquoise Deep: `#0D9488` (text accents)
- Primary/Coral: `#E8747C` (secondary accent)
- Dark: `#1E293B` (text, headers)
- Light: `#FEFEFE` / `#F1F5F9` / `#F0FDFA` (backgrounds)

### Key Patterns
- All pages use `"use client"` - this is a client-rendered landing page
- Components wrapped with `memo()` for performance optimization
- GSAP animations initialized in `useEffect` with cleanup via `gsap.context()` and `ctx.revert()`
- ScrollTrigger for scroll-based section animations with `toggleActions: "play none none reverse"`
- CSS-based cloud animations (SkyDivingClouds) instead of Three.js for better performance
- `dynamic` import with `ssr: false` for client-only components (SkyDivingClouds, ChatModal)
- Global CSS classes: `.btn-primary`, `.btn-secondary`, `.btn-coral`, `.card`, `.badge`, `.input-field`, `.form-group`, `.section-padding`, `.section-divider`
- Gradient text effect via `.text-gradient` (turquoise) and `.text-gradient-coral` classes

### Section IDs for Navigation
- `#inicio` - Hero
- `#quien-soy` - About
- `#servicios` - Services
- `#faq` - FAQ
- `#contacto` - Contact

### Key Components
- `SkyDivingClouds.tsx`: CSS-based animated clouds with configurable intensity (light/medium/heavy)
- `ChatModal.tsx`: Fullscreen chat modal with dark theme, opened via ChatPlaceholder section
- `AnimatedBrain.tsx` / `AnimatedThinking.tsx`: SVG animations with GSAP stroke-dasharray technique

### Assets
- `/assets/img.webp` - Used in Hero section
- `/assets/Dayanna.jpeg` - Used in About section
- `/assets/brain.svg`, `/assets/thinking.svg` - Source SVGs (inline versions in components)

### WhatsApp Integration
Floating WhatsApp button in `page.tsx` links to `wa.me/1234567890` (placeholder number)
