import ESLintPlugin from 'eslint-webpack-plugin';

import { SRC_DIR } from '../paths';

import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates an {@link ESLintPlugin} instance to run ESLint during webpack builds.
 *
 * Configuration:
 * - Lints project source files under `SRC_DIR` (`context`).
 * - Targets TS/TSX and JS/JSX files (`extensions`).
 * - Emits both warnings and errors into webpack's compilation output.
 * - Does not fail the build on lint errors (`failOnError: false`), which is commonly preferred
 *   during development to avoid blocking HMR/rebuilds.
 * - Enables caching (`cache: true`) to speed up subsequent builds, storing the cache under
 *   `node_modules/.cache/eslint/`.
 *
 * Result:
 * - Lint feedback is visible during webpack compilation, while rebuild speed remains reasonable due to caching.
 * - Lint errors do not stop the build with the current configuration.
 *
 * @returns A webpack plugin instance that runs ESLint as part of the build.
 */
export const getEslintPlugin = (): WebpackPluginInstance =>
  new ESLintPlugin({
    context: SRC_DIR,
    extensions: ['ts', 'tsx', 'js', 'jsx'],
    emitWarning: true,
    emitError: true,
    failOnError: false, // Don't fail build on lint errors in dev
    cache: true,
    cacheLocation: 'node_modules/.cache/eslint/',
  });
