import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import type { BuildContext } from '../ctx';
import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link ForkTsCheckerWebpackPlugin} instance to run TypeScript type-checking in a separate process.
 *
 * Purpose:
 * - Keeps webpack compilation fast (especially when the TS loader is configured for transpile-only mode),
 *   while still reporting TypeScript errors.
 *
 * Behavior:
 * - Development: runs asynchronously (`async: true`) so rebuilds/HMR are not blocked by type-checking.
 * - Production: runs synchronously (`async: false`) so type errors can fail/block the build for safety.
 *
 * TypeScript diagnostics:
 * - Enables both syntactic and semantic checks to catch parsing issues and type errors.
 * - Uses `mode: "write-references"` to support incremental/reference-based checking where applicable.
 *
 * Logging:
 * - Suppresses informational log messages (e.g., "Type-checking in progress..." / "No errors found")
 *   while still printing actual errors via `console.error`.
 *
 * @param ctx - Build context used to toggle async behavior between development and production.
 * @returns A webpack plugin instance that performs TypeScript type-checking during the build.
 */
export const getTypeCheckerPlugin = (ctx: BuildContext): WebpackPluginInstance =>
  new ForkTsCheckerWebpackPlugin({
    async: ctx.isDevelopment,
    typescript: {
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
      mode: 'write-references',
    },
    logger: {
      // Hide "Type-checking in progress..." and "No typescript errors found."
      log: () => {},
      error: console.error,
    },
  });
