# Trotoar Coffee — Multi Page Website Guide

## Tech Stack
- Vanilla HTML5, CSS3, JavaScript (ES6+)
- No frameworks or build tools
- Google Fonts: Bebas Neue, Inter, Playfair Display

## Project Structure
```
/
├── index.html                 # Home page
├── claude.md
├── style.css                  # Aggregator (imports all css/*.css)
│
├── css/
│   ├── global.css             # Reset, variables, utilities
│   ├── navbar.css             # Navigation component
│   ├── footer.css             # Footer component
│   ├── animations.css         # Cursor, loader, progress, transitions
│   └── components.css         # All page-specific component styles
│
├── js/
│   ├── main.js                # Home page features (quote, gallery, counters)
│   ├── navbar.js              # Navbar logic (mobile, scroll, active)
│   └── animation.js           # Global animation init (cursor, loader, reveal)
│
├── pages/
│   ├── index.html → redirect to /
│   ├── about.html             # About page — timeline, owner
│   ├── menu.html              # Menu page — filter, search, cards
│   ├── gallery.html           # Gallery page — masonry, lightbox
│   ├── curhat.html            # Curhat page — submit, sticky notes
│   ├── event.html             # Event page — event cards

│   ├── contact.html           # Contact page — info, FAQ, form
│   └── 404.html               # 404 page — cinematic error
│
└── assets/
    ├── images/
    ├── icons/
    ├── fonts/
    ├── audio/
    └── videos/
```

## Design System
- **Theme:** Dark minimal, warm urban, cinematic, retro coffee journal
- **Colors:** `--black-deep: #111111`, `--ivory-white: #F5F1E8`, `--coffee-brown: #6B4F3A`, `--milk-brown: #9B7B65`, `--retro-gray: #7A7A7A`
- **Fonts:** Bebas Neue (headings), Inter (body), Playfair Display (serif/accent)

## Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `index.html` | Hero, about, menu preview, gallery, curhat, event, testimoni, CTA, newsletter, Instagram, contact |
| About | `pages/about.html` | Filosofi, timeline, owner profile |
| Menu | `pages/menu.html` | Filter by category, search, menu cards with badges |
| Gallery | `pages/gallery.html` | Masonry layout, category filter, lightbox |
| Curhat | `pages/curhat.html` | Anonymous message board, mood selector, sticky notes |
| Event | `pages/event.html` | Event cards with dates, CTAs |

| Contact | `pages/contact.html` | Address, FAQ accordion, contact form |
| 404 | `pages/404.html` | Cinematic error with navigation |

## Features
- **Loading screen:** Coffee steam animation, logo reveal
- **Custom cursor:** Circle with trailing dot, hover states
- **Scroll progress bar:** Top gradient indicator
- **Back to top:** Floating button with SVG ring
- **Particles:** Canvas-based coffee aroma in hero
- **Typewriter:** Hero subtitle animation
- **3D tilt:** Menu cards perspective on hover
- **Parallax:** Hero background mouse tracking
- **Counters:** Stats animate on scroll
- **Lightbox:** Gallery image viewer with keyboard nav
- **Magnetic buttons:** Subtle cursor tracking
- **Ripple effect:** Button click animation
- **Daily quote:** Rotating quotes from rotation
- **Open/close status:** Real-time indicator
- **Newsletter subscription:** Email form
- **Instagram preview:** Grid with overlay
- **Menu filter:** Category buttons + search
- **FAQ accordion:** Expandable questions
- **Sticky notes:** Draggable, mood-based, like system

## JavaScript Modules
- `navbar.js` — Multi-page nav, mobile menu, active link, smooth scroll
- `animation.js` — Cursor, progress bar, back-to-top, reveal, magnetic, ripple, loader
- `main.js` — Home-specific: daily quote, gallery lightbox, counters, parallax, newsletter, open status

## CSS Modules
- `global.css` — Variables, reset, container, buttons, sections, reveal
- `navbar.css` — Nav styling, mobile overlay, hamburger
- `footer.css` — Footer layout, links, social
- `animations.css` — Cursor, loader, progress, ripple, transitions
- `style.css` — All page-specific components (hero, about, menu, gallery, curhat, event, blog, FAQ, contact, reservation, etc.)

## Coding Conventions
- `'use strict'` IIFE for JS modules
- CSS custom properties for theming
- Semantic HTML5 with ARIA labels
- Smooth scroll via native `scroll-behavior`
- Responsive via `clamp()` and `@media` breakpoints
- All page files share same global CSS + navbar + footer structure

## Maintainer Notes
- Images from Unsplash — replace with local assets for production
- Map placeholder — replace with Google Maps embed
- Form submissions currently use `alert()` or inline handlers — connect to backend
- Owner: Muhammad Yudho Arga Wibowo, S.Pd.
