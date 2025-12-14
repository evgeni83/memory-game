# Memory Game

The "Find a Pair" game with improved performance, security, and architecture.

## Features

- Improved performance through optimized rendering and lazy loading
- Support for WebP image format with fallback to PNG
- Strict typing with TypeScript
- Improved Redux architecture with error handling
- Component memoization to prevent unnecessary re-renders
- Testing system with unit and component tests
- Content Security Policy (CSP) and security headers
- Automatic checks in GitHub Actions
- Error and performance monitoring systems

## Installation and launch

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm start
```
The application will be available at http://localhost:3333

3. Run tests:
```bash
npm test
```

4. Run tests in watch mode:
```bash
npm run test:watch
```

5. Check code coverage with tests:
```bash
npm run test:coverage
```

6. Check the types:
```bash
npx tsc --noEmit
```

7. Check the bundle size:
```bash
npm run size
```

8. Build the project:
```bash
npm run build
```

## Project Structure

- `src/components` — React components
- `src/store` — Redux logic
- `src/types` — TypeScript types
- `src/utils` — Auxiliary utilities (error logging, performance monitoring)
- `src/hooks` — Custom React Hooks

## Security

The project includes:
- Content Security Policy (CSP) for XSS Prevention
- Security Headers (X-Frame-Options, X-XSS-Protection, etc.)
- Error handling with a global Error Boundary
- Production Error Logging

## CI/CD

- Automated tests
- Type checking
- Bundle Size Check
- Deploy to GitHub Pages on push to main

## Testing

- Unit tests for Redux logic
- Component tests for core components

## Known Security Issues

Some dependencies (primarily image optimization packages) have known vulnerabilities. These packages are only used during the build phase, not in the production application, which reduces the risk of exploitation.
