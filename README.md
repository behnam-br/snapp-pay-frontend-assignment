# Snapp Frontend Assignment

A React project built from scratch with Webpack 5 and TypeScript — no Create React App.

## Tech Stack

- **React 19** — UI library
- **TypeScript 5** — Type safety
- **Webpack 5** — Module bundler (modular configuration)
- **SASS** — CSS preprocessor with CSS Modules support
- **React Router 7** — Client-side routing with lazy loading
- **React Query** — Server state management
- **Axios** — HTTP client with interceptors
- **Material UI** — Component library
- **Vitest** — Testing library
- **ESLint** — Code linting with import sorting
- **Prettier** — Code formatting
- **Husky** — Git hooks for pre-commit checks
- **Commitlint** — Conventional commit message enforcement

## Project Structure

```
src/
├── api/                          # API layer (feature-based)
│   ├── get-contact/              # Single contact API
│   │   ├── get-contact.api.ts    # API call function
│   │   ├── get-contact.data.ts   # Static/mock data
│   │   ├── get-contact.handlers.ts # MSW handlers
│   │   ├── get-contact.hook.ts   # React Query hook
│   │   ├── get-contact.mappers.ts # Data transformers
│   │   ├── get-contact.schemas.ts # Zod validation schemas
│   │   └── get-contact.types.ts  # TypeScript types
│   ├── get-contact-list/         # Contact list API
│   └── get-contact-visited/      # Visited contacts (localStorage)
│
├── app/                          # Pages & features
│   ├── home/                     # Home page components
│   │   ├── contact-card.tsx      # Contact card component
│   │   ├── contact-list.tsx      # Contact list component
│   │   ├── contacts-visited.tsx  # Recently visited section
│   │   ├── contacts.tsx          # Main contacts container
│   │   └── search-form.tsx       # Search functionality
│   ├── contact/                  # Contact detail page components
│   │   ├── contact-header.tsx    # Header section
│   │   ├── contact-main.tsx      # Main content
│   │   ├── contact-footer.tsx    # Footer section
│   │   ├── contact-detail.tsx    # Detail display
│   │   ├── contact-back-link.tsx # Navigation back
│   │   └── use-save-contact.ts   # Save to visited hook
│   ├── home-page.tsx             # Home page container
│   ├── contact-page.tsx          # Contact page container
│   └── routes.tsx                # Route definitions
│
├── components/                   # Shared UI components
│   ├── icons/                    # SVG icon components
│   ├── layout/                   # Layout components
│   │   ├── error-boundary.tsx    # Error boundary
│   │   └── main-container.tsx    # Main layout wrapper
│   └── ui/                       # Reusable UI elements
│       ├── app-loader.tsx        # App loading state
│       ├── axios-error-message.tsx # Error display
│       ├── list-overlay.tsx      # List loading overlay
│       ├── main-loading.tsx      # Main loading spinner
│       └── pagination-bar.tsx    # Pagination component
│
├── lib/                          # Third-party integrations
│   ├── axios/                    # HTTP client setup
│   │   ├── http.ts               # Axios instance
│   │   ├── interceptors.ts       # Request/response interceptors
│   │   └── utils/                # API utilities
│   │       ├── adapters.ts       # Response adapters
│   │       ├── api-types.ts      # API type definitions
│   │       ├── parse-schema.ts   # Schema parsing
│   │       └── predicate-types.ts # Type predicates
│   ├── mui/                      # Material UI setup
│   │   ├── light-theme.ts        # Theme configuration
│   │   └── mui-provider.tsx      # Theme provider
│   ├── react-query/              # React Query setup
│   │   ├── query-client.ts       # Query client config
│   │   └── query-provider.tsx    # Query provider
│   └── router/                   # Router utilities
│       ├── link.tsx              # Custom link component
│       ├── nav-link.tsx          # Navigation link
│       ├── router.ts             # Router instance
│       └── use-prefetch.ts       # Prefetch hook
│
├── shared/                       # Shared utilities
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-copy-feedback.ts  # Copy with feedback
│   │   └── use-is-intersecting.ts # Intersection observer
│   └── utils/                    # Utility functions
│       ├── copy-to-clipboard.ts  # Clipboard utility
│       ├── format-date.ts        # Date formatting
│       ├── merge-refs.ts         # Ref merging utility
│       └── telegram-to-url.ts    # Telegram link parser
│
├── test/                         # Test infrastructure
│   ├── mocks/                    # MSW mock handlers
│   │   ├── browser.ts            # Browser MSW setup
│   │   ├── handlers.ts           # API mock handlers
│   │   ├── local-storage.ts      # localStorage mock
│   │   └── server.ts             # Server MSW setup
│   ├── setup.ts                  # Vitest setup
│   └── test-utils.tsx            # Testing utilities
│
├── assets/                       # Static assets
├── envs.ts                       # Environment variables
├── global.scss                   # Global styles
└── index.tsx                     # App entry point

webpack/                          # Webpack configuration (modular)
├── plugins/                      # Webpack plugins
├── rules/                        # Webpack loaders
├── optimization/                 # Build optimization
└── webpack.config.ts             # Main config
```

## Getting Started

### Installation

```bash
npm install
```

## Environment

To configure environment variables, create two files in your project's root directory: `.env.development` for development and `.env.production` for production builds.

Each file should define the `API_URL` variable, and the List of required envs are in `required-env-vars.ts` file in root directory.

This setup allows your app to use different API endpoints for development and production. Make sure not to commit sensitive values or production secrets into version control.

### Development

```bash
npm start
```

App runs at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build:prod
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start dev server at localhost:3000 |
| `npm run build` | Development build |
| `npm run build:prod` | Production build (optimized) |
| `npm run build:analyze` | Production build with bundle analyzer |
| `npm run type-check` | TypeScript type checking |
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Fix linting errors |
| `npm run format` | Format files with Prettier |
| `npm run test` | Run test with vitest |
| `npm run test:watch` | Run test with vitest liveReload |
| `npm run test:coverage` | Run test with vitest coverage |

## License

MIT
