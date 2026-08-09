# MM Contracting Website

A static corporate website built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, i18next, and Leaflet.

## Architecture

This project is intentionally frontend-only:

- No custom backend server
- No database
- No admin dashboard
- No authentication layer
- No API client
- Company content is stored directly in the frontend source

## Where to edit content

Main static content lives in:

- `src/constants/index.ts` — company contact details, social links, and core metadata
- `src/data/projects.ts` — projects
- `src/data/services.ts` — services
- `src/data/news.ts` — news
- `src/data/certificates.ts` — certificates
- `src/data/partners.ts` — partners
- `src/data/clients.ts` — clients and testimonials
- `src/data/gallery.ts` — gallery
- `src/data/history.ts` — company history
- `src/data/industries.ts` — industries
- `src/data/stats.ts` — statistics
- `src/data/whyChooseUs.ts` — value propositions
- `src/i18n/locales/en.json` — English UI copy
- `src/i18n/locales/ar.json` — Arabic UI copy

Images can be referenced with static URLs in the data files or moved into `public/` and referenced with paths such as `/images/projects/project-1.webp`.

## Public routes

- `/`
- `/gallery`
- `/contact`
- `/certificates`
- `/partners`

Unknown routes render the Not Found page.

## Contact form

The current contact form is frontend-only and opens a Google Forms URL. Replace `YOUR_FORM_ID` in `src/sections/Contact.tsx` with the real form ID, or replace that integration with another static-friendly form service later.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated static site is written to `dist/` and can be deployed to Vercel or another static hosting provider.
