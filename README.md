# Qitong Lan Portfolio V2

An evidence-led engineering portfolio built with Next.js App Router, React, TypeScript, and local MDX. The public site is intentionally static-first: there is no runtime CMS, database, contact form, or email service.

## Public routes

- `/` — evidence-led homepage
- `/work/letletme` — live-data platform case study
- `/work/vehicle-operations` — role-secured operations case study
- `/writing` and `/writing/[slug]` — three local technical articles
- `/writing/archive` — quiet static index of the previous Notion notes
- `/rss.xml`, `/sitemap.xml`, and `/robots.txt` — discovery endpoints

## Architecture

- React Server Components by default
- Client components only for theme selection, mobile navigation, copy-email feedback, résumé analytics, and outbound-link analytics
- Typed, build-validated content in `src/content/`
- Local articles in `content/writing/`
- Optimized local media and two approved CVs in `public/`
- Semantic design tokens with system, light, and dark themes

The production canonical is `https://www.qitonglan.com`. Requests to the apex host are redirected to `www` by `next.config.js`.

## Requirements

- Node.js 20.9 or newer; Node 22 is recorded in `.nvmrc`
- npm

## Commands

```bash
npm install
npm run dev
npm run validate
npm run build
npm run test:e2e
```

`npm run validate` runs ESLint, TypeScript, Prettier verification, and Vitest. Playwright runs separately against a production build and covers routes, responsive overflow, themes, keyboard navigation, résumé files, copy email, accessibility, and 404 behaviour.

## Content rules

Public claims must remain aligned with the approved `career-evidence-inventory.md` and `PLATFORM_PROFILE_SYNC.md` in the private job-artifacts repository. Do not add unsupported metrics, commercial architecture, employer details, or confidential code.

New launch writing belongs in local MDX with metadata in `src/content/article-metadata.ts`. The archive is a static migration only and is intentionally excluded from primary navigation and the sitemap.

Résumé files must be copied from the two approved job-artifacts baselines and keep the stable filenames declared in `src/content/site.ts`.

## Security and operations

Security headers and the apex redirect live in `next.config.js`. No service secret is required by this application. If an older deployment ever exposed a Resend key through client configuration, rotate that key independently before production release.
