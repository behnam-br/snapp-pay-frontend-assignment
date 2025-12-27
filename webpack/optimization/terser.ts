import TerserPlugin from 'terser-webpack-plugin';

import type { BuildContext } from '../ctx';

/**
 * Creates a configured {@link TerserPlugin} instance for webpack JavaScript minification.
 *
 * This plugin is typically used in `optimization.minimizer` to reduce bundle size by:
 * - Compressing code (removing dead code, simplifying expressions, inlining where safe)
 * - Mangling identifiers (shortening variable/function names)
 *
 * Configuration details:
 * - Parses modern syntax up to ES2017 (`parse.ecma: 2017`) so Terser can understand newer JS.
 * - Emits ES5-compatible output (`compress.ecma: 5`, `output.ecma: 5`), which is useful when
 *   your build targets older browsers after transpilation.
 * - In production (`ctx.isProduction === true`), removes `console.*` calls and `debugger` statements
 *   (`drop_console` / `drop_debugger`) to shrink output and avoid leaking debug logs.
 * - Uses `mangle.safari10: true` to avoid known Safari 10 minification issues.
 * - Strips all comments and forces ASCII-only output (`comments: false`, `ascii_only: true`).
 * - Enables parallel minification (`parallel: true`) to speed up builds.
 *
 * @param ctx - Build context used to toggle production-only optimizations (e.g., dropping console/debugger).
 * @returns A {@link TerserPlugin} instance ready to be added to webpack's minimizers.
 */
export const getTerserPlugin = (ctx: BuildContext) =>
  new TerserPlugin({
    terserOptions: {
      parse: {
        ecma: 2020,
      },
      compress: {
        ecma: 5,
        comparisons: false,
        inline: 2,
        drop_console: ctx.isProduction,
        drop_debugger: ctx.isProduction,
      },
      mangle: {
        safari10: true,
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    },
    parallel: true,
  });
