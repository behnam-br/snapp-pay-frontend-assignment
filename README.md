# Snapp Frontend Assignment

A React project built from scratch with Webpack 5 and TypeScript — no Create React App.

## Tech Stack

- **React 19** — UI library
- **TypeScript 5** — Type safety
- **Webpack 5** — Module bundler (modular configuration)
- **SASS** — CSS preprocessor
- **React Router 7** — Client-side routing
- **Axios** — HTTP client
- **ESLint** — Code linting with import sorting
- **Prettier** — Code formatting
- **Husky** — Git hooks for pre-commit checks
- **Commitlint** — Conventional commit message enforcement

## Project Structure

```
frontend/
├── .husky/                  # Git hooks (pre-commit, commit-msg)
├── .vscode/                 # VS Code/Cursor workspace settings
│   ├── extensions.json      # Recommended extensions
│   └── settings.json        # Editor settings (format on save, etc.)
├── src/
│   ├── api/                 # API layer
│   │   └── http.ts          # HTTP utilities
│   ├── app/                 # Application core
│   │   ├── global.scss      # Global styles
│   │   ├── global.d.ts      # Module declarations for assets
│   │   ├── index.tsx        # Application entry point
│   │   └── index.html       # HTML template
│   ├── assets/              # Images, fonts, and other static files
│   ├── components/          # Reusable UI components
│   │   ├── layout/          # Layout components (MainLayout, etc.)
│   │   └── ui/              # UI primitives (Button, Input, Modal)
│   ├── lib/                 # Third-party library configurations
│   │   ├── axios/           # Axios instance and interceptors
│   │   ├── mui/             # Material UI theme and setup
│   │   └── react-query/     # React Query client configuration
│   ├── modules/             # Feature modules (domain-specific code)
│   │   ├── home/            # Home page module
│   │   └── products/        # Products page module
│   ├── routes/              # Route definitions and configuration
│   │   ├── routes.tsx       # Route configuration
│   │   └── main-loading.tsx # Loading component for lazy routes
│   └── shared/              # Shared utilities, hooks, and helpers
├── webpack/                 # Modular Webpack configuration
│   ├── ctx.ts               # Build context utilities
│   ├── devServer.ts         # Dev server configuration
│   ├── optimization.ts      # Optimization settings
│   ├── optimization/        # Optimization modules
│   │   ├── splitChunks.ts   # Code splitting configuration
│   │   └── terser.ts        # Terser minification
│   ├── paths.ts             # Path aliases and directories
│   ├── plugins.ts           # Plugin aggregator
│   ├── plugins/             # Individual plugins
│   │   ├── bundleAnalyzer.ts
│   │   ├── caseSensitivePaths.ts
│   │   ├── circularDependency.ts
│   │   ├── compression.ts
│   │   ├── copy.ts
│   │   ├── cssExtract.ts
│   │   ├── define.ts
│   │   ├── duplicatePackageChecker.ts
│   │   ├── env.ts
│   │   ├── eslint.ts
│   │   ├── html.ts
│   │   ├── preload.ts
│   │   ├── progress.ts
│   │   ├── reactRefresh.ts
│   │   └── typeChecker.ts
│   ├── rules.ts             # Rule aggregator
│   ├── rules/               # Individual loaders/rules
│   │   ├── assets.ts        # Asset handling
│   │   ├── json.ts          # JSON loader
│   │   ├── styles.ts        # SCSS/CSS loaders
│   │   ├── svg.ts           # SVG loader (SVGR)
│   │   └── typescript.ts    # TypeScript loader
│   └── types.d.ts           # Webpack type declarations
├── dist/                    # Production build output
├── .editorconfig            # Universal editor configuration
├── .prettierrc              # Prettier configuration
├── commitlint.config.js     # Commit message rules
├── eslint.config.js         # ESLint flat configuration
├── lint-staged.config.js    # Lint-staged configuration
├── tsconfig.json            # TypeScript configuration
├── webpack.config.ts        # Webpack entry configuration
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000).

### Production Build

Build for production (optimized, no source maps):

```bash
npm run build:prod
```

Build for development (with source maps):

```bash
npm run build
```

Build with bundle analyzer:

```bash
npm run build:analyze
```

Output files are generated in the `dist/` folder.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start dev server at localhost:3000 with bundle analyzer |
| `npm run build` | Development build with source maps |
| `npm run build:prod` | Production build (optimized, no source maps) |
| `npm run build:analyze` | Production build with bundle analyzer |
| `npm run type-check` | Run TypeScript compiler for type checking |
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Fix linting errors automatically |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check if files are formatted correctly |

## Code Quality

### ESLint

Linting is configured with:
- TypeScript support
- React and React Hooks rules
- Import sorting and organization (styles first)
- Prettier integration

Run linting:
```bash
npm run lint        # Check for errors
npm run lint:fix    # Auto-fix errors
```

### Import Order

Imports are automatically sorted on save:

```tsx
// 1. Styles (CSS/SCSS) - first
import '@/app/global.scss';

// 2. External packages
import React from 'react';

// 3. Internal aliases (@/)
import { MainLayout } from '@/components/layout/main-layout';

// 4. Relative imports
import { utils } from './utils';
```

### Prettier

Code formatting with consistent style:
```bash
npm run format      # Format all files
```

### Git Hooks (Husky)

Automated checks on every commit:
- **pre-commit**: Runs lint-staged (lints and formats staged files)
- **commit-msg**: Validates commit message format

### Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Valid prefixes:

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

Example:
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login button alignment"
```

## Features

- ⚡ **Hot Module Replacement** — See changes instantly without full reload
- 🔷 **TypeScript** — Full type safety and IntelliSense
- 🎨 **SASS/SCSS** — Variables, nesting, mixins, and more
- 📦 **Asset Handling** — Images and fonts are automatically processed and hashed
- 🗂️ **Path Aliases** — Use `@/` to import from `src/`
- 🧹 **Clean Builds** — Output directory is cleaned before each build
- 🗺️ **Source Maps** — Enabled in development, disabled in production
- ✨ **Auto Formatting** — Format on save with Prettier
- 🔍 **Import Sorting** — Automatic import organization with styles first
- 📊 **Bundle Analyzer** — Visualize bundle size with webpack-bundle-analyzer
- 🔄 **Circular Dependency Detection** — Warns about circular imports
- 🗜️ **Compression** — Gzip compression for production builds
- ⚙️ **Modular Webpack Config** — Clean, maintainable build configuration

## Importing Assets

### Images

```tsx
import logo from '@/assets/logo.png';

<img src={logo} alt="Logo" />
```

Or use the assets folder directly (copied to dist):
```tsx
<img src="/images/logo.png" alt="Logo" />
```

### SVG as Components

```tsx
import { ReactComponent as Icon } from '@/assets/icon.svg';

<Icon className="icon" />
```

### Fonts

```scss
@font-face {
  font-family: 'CustomFont';
  src: url('@/assets/fonts/CustomFont.woff2') format('woff2');
}
```

### Path Aliases

```tsx
import { Button } from '@/components/ui/Button';
import { MainLayout } from '@/components/layout/main-layout';
import { useAuth } from '@/shared/hooks/useAuth';
import { api } from '@/lib/axios';
```

## IDE Setup

### VS Code / Cursor

The project includes `.vscode/` configuration:
- **Recommended extensions** are prompted on first open
- **Format on save** is enabled automatically
- **ESLint integration** fixes errors and sorts imports on save

### Other IDEs

The `.editorconfig` file provides basic settings for most editors (WebStorm, Vim, Sublime, etc.).

## License

MIT
