# Portfolio Project Documentation

Welcome to the documentation for the Portfolio Project. This documentation provides comprehensive information about the project's architecture, components, APIs, and development guidelines.

## Table of Contents

1. [Architecture Overview](./architecture.md)
2. [Types Management](./types-management.md)
3. [Constants Management](./constants-management.md)
4. [UI Components](./components.md)
5. [API Documentation](./api-documentation.md)
6. [API Security](../API-SECURITY-README.md)

## Getting Started

If you're new to the project, we recommend starting with the [Architecture Overview](./architecture.md) to understand the high-level structure and design patterns used in the project.

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
- `npm run find:magic`: Find magic numbers and strings
- `npm run type-check`: Run TypeScript type checking
- `npm run validate`: Run all validation checks

### Workflow

1. **Development**: Use `npm run dev` to start the development server
2. **Validation**: Run `npm run validate` before committing changes
3. **Building**: Use `npm run build` to create a production build
4. **Deployment**: Deploy the built application to Vercel

## Project Structure

```test
portfolio/
├── app/                # Next.js App Router structure
│   ├── actions/        # Server actions
│   ├── api/            # API routes
│   ├── blog/           # Blog pages
│   ├── components/     # UI components
│   ├── data/           # Static data
│   └── hooks/          # Custom React hooks
├── config/             # Configuration files
│   └── constants/      # App constants
├── doc/                # Project documentation
├── lib/                # Core utilities and services
│   ├── api/            # API-related utilities
│   ├── services/       # Service layer for external APIs
│   └── utils/          # Utility functions
├── middleware/         # Next.js middleware
├── notion-migration/   # Notion migration scripts
├── public/             # Static assets
├── scripts/            # Utility scripts
└── types/              # TypeScript type definitions
```

## Key Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **CMS**: Notion API integration
- **API**: Next.js API routes with proper error handling
- **Email**: Resend for email delivery
- **DNS Management**: Cloudflare API integration
- **Deployment**: Vercel deployment
- **Analytics**: Vercel Analytics

## Best Practices

### TypeScript

- Use strict type checking
- Avoid using `any` type
- Use type guards for runtime type checking
- Export types through the central `types/index.ts` file

### React

- Use functional components with hooks
- Implement proper error boundaries
- Use React Server Components where appropriate
- Follow the component composition pattern

### API Development

- Use consistent response formats
- Implement proper error handling
- Add rate limiting to prevent abuse
- Document all endpoints

### Performance

- Optimize images and assets
- Implement code splitting
- Use memoization for expensive calculations
- Implement proper caching strategies

## Contributing

When contributing to this project, please follow these guidelines:

1. Create a feature branch from `dev`
2. Follow the code style guidelines
3. Write tests for new features
4. Run validation before submitting a pull request
5. Keep pull requests focused on a single feature or bug fix

## Troubleshooting

### Common Issues

- **Type Errors**: Run `npm run type-check` to identify type issues
- **Linting Errors**: Run `npm run lint` to find and fix linting issues
- **Build Failures**: Check for console errors during build
- **API Errors**: Check the server logs for detailed error information

### Getting Help

If you encounter issues not covered in this documentation, please:

1. Check the existing GitHub issues
2. Create a new issue with detailed information about the problem
3. Include steps to reproduce the issue
4. Include relevant error messages and logs

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
