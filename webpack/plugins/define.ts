import webpack from 'webpack';

import type { BuildContext } from '../ctx';
import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link webpack.DefinePlugin} instance that injects global build-time flags.
 *
 * Behavior:
 * - Defines `__DEV__` and `__PROD__` as compile-time constants based on the current {@link BuildContext}.
 * - Webpack replaces occurrences of these identifiers in the source code during bundling.
 *
 * Usage:
 * ```ts
 * if (__DEV__) {
 *   console.log('debug info');
 * }
 * ```
 *
 * Result:
 * - In production builds, `__DEV__` becomes `false` and dev-only branches can be removed by minification
 *   (dead-code elimination), reducing bundle size.
 * - In development builds, `__DEV__` becomes `true` and development-only code remains enabled.
 *
 * Note:
 * - Values are wrapped with `JSON.stringify(...)` to ensure valid JavaScript literals are injected.
 *
 * @param ctx - Build context used to derive development/production flags.
 * @returns A webpack plugin instance defining global `__DEV__` and `__PROD__` constants.
 */
export const getDefinePlugin = (ctx: BuildContext): WebpackPluginInstance =>
  new webpack.DefinePlugin({
    // Global __DEV__ flag for development-only code
    // Usage: if (__DEV__) { console.log('debug info'); }
    __DEV__: JSON.stringify(ctx.isDevelopment),
    __PROD__: JSON.stringify(ctx.isProduction),
  });
