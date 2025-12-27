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
- **ESLint** — Code linting with import sorting
- **Prettier** — Code formatting
- **Husky** — Git hooks for pre-commit checks
- **Commitlint** — Conventional commit message enforcement

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

## Project Structure

```
├── src/
│   ├── api/                     # API layer
│   │   ├── get-passenger/       # Single passenger API
│   │   │   ├── get-passenger.api.ts
│   │   │   └── get-passenger.hook.ts
│   │   ├── get-passengers/      # Passengers list API
│   │   │   ├── get-passengers.api.ts
│   │   │   └── get-passengers.hook.ts
│   │   └── passenger.types.ts   # Shared types
│   ├── app/                     # Feature pages
│   │   ├── home/
│   │   ├── product/
│   │   └── routes.tsx           # Route configuration
│   ├── assets/                  # Static files
│   ├── components/
│   │   ├── layout/              # Layout components
│   │   │   └── error-boundary.tsx
│   │   └── ui/                  # UI primitives
│   ├── lib/                     # Third-party wrappers
│   │   ├── axios/               # HTTP client
│   │   │   ├── http.ts          # Axios instance
│   │   │   ├── interceptors.ts  # Request/response interceptors
│   │   │   ├── adapters.ts      # Response transformers
│   │   │   ├── api-types.ts     # TypeScript types
│   │   │   └── predicate-types.ts # Error type guards
│   │   ├── mui/                 # Material UI theme
│   │   ├── react-query/         # Query client
│   │   └── router/              # Router utilities
│   │       ├── link.tsx         # Prefetch-enabled Link
│   │       ├── nav-link.tsx     # Prefetch-enabled NavLink
│   │       └── use-prefetch.ts  # Prefetch hook
│   ├── shared/
│   │   ├── hooks/               # Custom hooks
│   │   └── utils/               # Utility functions
│   ├── global.scss              # Global styles
│   ├── index.html               # HTML template
│   └── index.tsx                # Entry point
├── webpack/                     # Modular Webpack config
└── package.json
```

## Routing

Routes use React Router's `lazy` property for code splitting:

```tsx
// src/app/routes.tsx
export const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/app/home/home-page').then((module) => ({
            Component: module.HomePage,
          })),
      },
    ],
  },
];
```

## API Layer

### Creating an API endpoint

```ts
// src/api/get-users/get-users.api.ts
import { http } from '@/lib/axios/http';
import { responseAdapter, errorAdapter } from '@/lib/axios/adapters';

export async function getUsers(): Promise<ApiResponse<User[]>> {
  try {
    const response = await http.get<User[]>('/users');
    return responseAdapter(response);
  } catch (error) {
    return Promise.reject(await errorAdapter(error as AxiosError));
  }
}
```

### Creating a React Query hook

```ts
// src/api/get-users/get-users.hook.ts
import { useQuery } from '@tanstack/react-query';
import { getUsers } from './get-users.api';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: ({ signal }) => getUsers({ signal }),
  });
}
```

## Styling

### CSS Modules

```tsx
import styles from './component.module.scss';

<div className={styles.container}>...</div>
```

### Global Styles

```tsx
import '@/global.scss';
```

## Importing Assets

```tsx
// Import
import logo from '@/assets/logo.png';
<img src={logo} alt="Logo" />

// Or use public path
<img src="/assets/logo.png" alt="Logo" />
```

## Path Aliases

```tsx
import { Button } from '@/components/ui/Button';
import { useUsers } from '@/api/get-users/get-users.hook';
import { http } from '@/lib/axios/http';
```

## Commit Convention

Uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve button alignment"
```

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `refactor` | Code refactoring |
| `chore` | Maintenance |

## License

MIT
