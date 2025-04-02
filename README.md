# Portfolio Project Documentation

Welcome to the documentation for the Portfolio Project. This documentation provides comprehensive information about the project's architecture, components, APIs, and development guidelines.

## Table of Contents

- [Portfolio Project Documentation](#portfolio-project-documentation)
  - [Table of Contents](#table-of-contents)
  - [Architecture Overview](#architecture-overview)
  - [Development Guidelines](#development-guidelines)
    - [Code Style](#code-style)
    - [Available Scripts](#available-scripts)
  - [Project Structure](#project-structure)
  - [Key Technologies](#key-technologies)
  - [Best Practices](#best-practices)
    - [TypeScript](#typescript)
    - [React](#react)
    - [API Development](#api-development)
    - [Performance](#performance)
  - [Contributing](#contributing)
  - [SEO Features](#seo-features)
    - [Sitemap](#sitemap)
    - [Robots.txt](#robotstxt)
  - [License](#license)

## Architecture Overview

This portfolio project is built with Next.js 15 using the App Router architecture pattern, with a focus on:

- Type-safe development using TypeScript
- Server-side rendering and static site generation where appropriate
- Component-based UI development with Tailwind CSS and Radix UI
- API integrations with proper error handling
- Performance optimization through caching and component design

## Development Guidelines

### Code Style

The project follows strict code quality standards:

- TypeScript with strict type checking
- ESLint configuration with strict rules
- Prettier for consistent code formatting
- Organized constants to avoid magic numbers/strings
- Consistent component patterns

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint for code linting
- `npm run format`: Format code with Prettier
- `npm run format:check`: Check code formatting without making changes
- `npm run type-check`: Run TypeScript type checking
- `npm run validate`: Run all validation checks
- `npm run test`: Run tests with Vitest
- `npm run test:integration`: Run integration tests
- `npm run test:ui`: Run tests with UI

## Project Structure

```
portfolio/
├── app/                # Next.js App Router structure
│   ├── actions/        # Server actions
│   ├── error.tsx       # Error handling component
│   ├── layout.tsx      # Root layout component
│   ├── loading.tsx     # Loading state component
│   ├── not-found.tsx   # 404 page
│   ├── page.tsx        # Home page
│   └── sitemap.ts      # Sitemap generator
├── components/         # UI components
│   ├── icons/          # Icon components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   └── ui/             # Reusable UI components
├── config/             # Configuration files
│   ├── cache.config.ts # Cache configuration
│   ├── common.config.ts # Common constants
│   ├── cors.config.ts  # CORS configuration
│   ├── defaults.config.ts # Default values
│   ├── errors.config.ts # Error messages
│   ├── ui.config.ts    # UI constants
│   ├── urls.config.ts  # URL configurations
│   └── validator.config.ts # Validation rules
├── contexts/           # React context providers
├── data/               # Static data
├── hooks/              # Custom React hooks
├── lib/                # Core utilities and services
├── middleware/         # Next.js middleware
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## Key Technologies

- **Framework**: Next.js 15, React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, Radix UI components
- **Form Handling**: React Hook Form, Zod validation
- **API**: Next.js API routes, Server Actions
- **Email**: Resend for email delivery
- **DNS Management**: Cloudflare API integration
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics, Speed Insights
- **CMS**: Notion API integration
- **Testing**: Vitest

## Best Practices

### TypeScript

- Use strict type checking
- Avoid using `any` type
- Use type guards for runtime type checking
- Keep types centralized in the types directory

### React

- Use functional components with hooks
- Implement proper error boundaries
- Use React Server Components where appropriate
- Follow the component composition pattern

### API Development

- Use consistent response formats
- Implement proper error handling
- Add rate limiting to prevent abuse
- Use appropriate caching strategies

### Performance

- Optimize images and assets
- Implement code splitting
- Use memoization for expensive calculations
- Implement proper caching strategies

## Contributing

When contributing to this project, please follow these guidelines:

1. Create a feature branch from `main`
2. Follow the code style guidelines
3. Write tests for new features
4. Run validation before submitting a pull request
5. Keep pull requests focused on a single feature or bug fix

## SEO Features

### Sitemap

This project includes a dynamically generated sitemap at `/sitemap.xml` that includes:

- All static pages
- All blog posts with proper lastmod dates
- Appropriate change frequencies and priorities for different content types

To access the sitemap, visit `/sitemap.xml` in your browser.

### Robots.txt

A robots.txt file is included to guide search engine crawlers:

- Allows crawling of most content
- Restricts crawling of admin and API routes
- References the sitemap location

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
