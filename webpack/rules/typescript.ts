import type { RuleSetRule } from 'webpack';

/**
 * Webpack rule for compiling TypeScript (`.ts` / `.tsx`) using `ts-loader`.
 *
 * Behavior:
 * - Matches TypeScript source files and transpiles them to JavaScript for bundling.
 * - Excludes `node_modules` for faster builds (third-party deps are not transpiled).
 *
 * Performance:
 * - Uses `transpileOnly: true`, which disables TypeScript type-checking during webpack compilation.
 *   This significantly speeds up builds, especially in development.
 * - When using `transpileOnly`, type-checking should be handled separately (commonly via
 *   `ForkTsCheckerWebpackPlugin` or a separate `tsc --noEmit` step).
 *
 * Output:
 * - Forces `compilerOptions.module: "esnext"` so ES module syntax is preserved, enabling better
 *   webpack tree-shaking and optimization.
 *
 * Result:
 * - Imported `.ts`/`.tsx` modules become bundled JavaScript output.
 * - Type errors are not caught by this loader alone when `transpileOnly` is enabled.
 *
 * @returns A webpack module rule for TypeScript/TSX files.
 */
export const getTypescriptRule = (): RuleSetRule => ({
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        compilerOptions: {
          module: 'esnext',
        },
      },
    },
  ],
});
