import type { Configuration } from 'webpack';

type Optimization = NonNullable<Configuration['optimization']>;

/**
 * Returns a webpack `splitChunks` configuration that performs deterministic, cache-friendly code splitting.
 *
 * Goals:
 * - Separate long-lived third-party dependencies from frequently changing application code.
 * - Improve browser caching by emitting stable vendor chunks (e.g., React, Router).
 * - Reduce duplication by extracting modules shared across multiple chunks.
 *
 * Key settings:
 * - `chunks: "all"` enables splitting for both initial (sync) and async (`import()`) chunks.
 * - `maxInitialRequests: 25` allows webpack to create more initial chunks (trading request count for caching granularity).
 * - `minSize: 20000` avoids creating very small split chunks.
 *
 * Cache groups (higher `priority` wins when multiple groups match):
 * - `react` (priority 40): isolates `react`, `react-dom`, and `scheduler` into a `react` chunk.
 * - `router` (priority 30): isolates `react-router` and `react-router-dom` into a `router` chunk.
 * - `vendors` (priority 20): groups remaining `node_modules` code into a `vendors` chunk.
 * - `common` (priority 10): extracts modules used in 2+ chunks and reuses existing chunks when possible.
 *
 * Resulting output commonly includes separate files like `react*.js`, `router*.js`, `vendors*.js`,
 * and shared/common chunks, improving long-term caching and reducing duplicated code.
 *
 * @returns A webpack `optimization.splitChunks` configuration object.
 */
export const getSplitChunksConfig = (): Optimization['splitChunks'] => ({
  chunks: 'all',
  maxInitialRequests: 25,
  minSize: 20000,
  cacheGroups: {
    react: {
      test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
      name: 'react',
      chunks: 'all',
      priority: 40,
    },
    router: {
      test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
      name: 'router',
      chunks: 'all',
      priority: 30,
    },
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      minChunks: 3,
      chunks: 'all',
      priority: 20,
    },
    common: {
      minChunks: 2,
      priority: 10,
      reuseExistingChunk: true,
    },
  },
});
