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
