# Static Frontend Architecture

## Goal

MM Contracting is configured as a frontend-only corporate website. The site does not require a custom backend, database, admin dashboard, or authentication system.

## Removed from the project

- Admin pages and dashboard
- Admin layout and protected routes
- Authentication context and hook
- Axios API client
- API calls to `http://localhost:5000/api`
- Admin-only image compression utility
- Axios dependency
- Admin translation namespace

## Static content sources

| Content | File |
|---|---|
| Company identity/contact/social metadata | `src/constants/index.ts` |
| Projects | `src/data/projects.ts` |
| Services | `src/data/services.ts` |
| News | `src/data/news.ts` |
| Certificates | `src/data/certificates.ts` |
| Partners | `src/data/partners.ts` |
| Clients/testimonials | `src/data/clients.ts` |
| Gallery | `src/data/gallery.ts` |
| History | `src/data/history.ts` |
| Industries | `src/data/industries.ts` |
| Statistics | `src/data/stats.ts` |
| Why choose us | `src/data/whyChooseUs.ts` |
| English UI text | `src/i18n/locales/en.json` |
| Arabic UI text | `src/i18n/locales/ar.json` |

## Public application routes

- `/`
- `/gallery`
- `/contact`
- `/certificates`
- `/partners`

There are no `/admin/*` routes.

## External resources that remain

These are not a custom MM backend or database:

- Static remote image URLs currently present in content data
- OpenStreetMap tiles used by Leaflet
- Google Forms placeholder used by the contact form
- Social media links

If required, remote images can later be copied into `public/images/` so the site's content assets are fully local.

## Updating content

Edit the relevant file under `src/data/` or `src/constants/`, then rebuild/deploy the frontend. No database migration or dashboard action is required.
