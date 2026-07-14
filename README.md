# Qitong Lan Portfolio V2

An evidence-led engineering portfolio built with Next.js App Router, React, TypeScript, and local MDX. The public site is intentionally static-first: there is no runtime CMS, database, contact form, or email service.

## Problem and audience

The site gives recruiters and engineering reviewers a short path from professional identity to verifiable work. It presents two implemented case studies, consistent career evidence, technical writing, and role-specific CV downloads without requiring a reviewer to navigate unrelated repositories.

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

## Design decisions and trade-offs

- Local typed content trades non-technical CMS editing for build-time validation, simpler deployment, and no runtime content dependency.
- Static-first rendering keeps the public surface small and reliable; interactive code is limited to controls that need client state.
- Two role-specific CV downloads add a small maintenance cost, so stable filenames and hash verification are part of the release process.
- The portfolio summarizes commercial systems without publishing confidential source code, customer data, or unsupported architecture claims.

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

## Current status

Portfolio V2 is deployed at [www.qitonglan.com](https://www.qitonglan.com). The current release contains two implemented case studies and two approved CV downloads. Changes are accepted only after `npm run validate`, a production build, and focused browser verification.
