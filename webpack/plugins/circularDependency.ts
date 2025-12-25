import CircularDependencyPlugin from 'circular-dependency-plugin';

import type { BuildContext } from '../ctx';
import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link CircularDependencyPlugin} instance to detect circular imports in the project.
 *
 * Circular dependencies occur when two or more modules import each other directly or indirectly
 * (e.g., A -> B -> A). These can lead to subtle runtime bugs (undefined exports due to evaluation order),
 * make refactoring harder, and sometimes increase bundle size.
 *
 * Configuration:
 * - Scans only project source files under `/src` (`include`) and ignores third-party dependencies
 *   in `node_modules` (`exclude`) to avoid noisy reports.
 * - Fails the build in production (`failOnError: ctx.isProduction`) to prevent shipping cycles.
 * - Allows cycles that occur only through dynamic imports (`allowAsyncCycles: true`), since those
 *   are typically less risky at initial module evaluation time.
 * - Uses the project root as the reporting base (`cwd: process.cwd()`).
 *
 * @param ctx - Build context used to toggle strictness (fail build on cycles in production).
 * @returns A webpack plugin instance that reports (and optionally errors on) circular dependencies.
 */
export const getCircularDependencyPlugin = (ctx: BuildContext): WebpackPluginInstance =>
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    include: /src/,
    failOnError: ctx.isProduction,
    allowAsyncCycles: true,
    cwd: process.cwd(),
  });
