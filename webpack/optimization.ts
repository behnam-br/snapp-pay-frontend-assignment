import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import { getSplitChunksConfig } from './optimization/splitChunks';
import { getTerserPlugin } from './optimization/terser';

import type { BuildContext } from './ctx';
import type { Configuration } from 'webpack';

type Optimization = NonNullable<Configuration['optimization']>;

/**
 * Creates the webpack `optimization` configuration for the build.
 *
 * Responsibilities:
 * - Enables/disables minification depending on environment.
 * - Configures JS and CSS minimizers for production builds.
 * - Defines code splitting strategy (vendor/react/router/common chunking).
 * - Extracts the webpack runtime into a separate chunk for better caching.
 * - Uses deterministic module/chunk IDs to keep chunk hashes stable across builds.
 *
 * Configuration:
 * - `minimize`: enabled only in production (`ctx.isProduction`).
 * - `minimizer`:
 *   - {@link getTerserPlugin} for JavaScript minification (and production-only console/debugger removal).
 *   - {@link CssMinimizerPlugin} for CSS minification.
 * - `splitChunks`: uses {@link getSplitChunksConfig} to split third-party and shared code into separate chunks.
 * - `runtimeChunk`: emits a dedicated `runtime` chunk to improve long-term caching.
 * - `moduleIds` / `chunkIds`: set to `"deterministic"` for consistent hashing and caching behavior.
 *
 * Result:
 * - Production builds produce smaller JS/CSS and more cache-friendly chunk outputs
 *   (e.g., `runtime`, `react`, `router`, `vendors` chunks with stable hashes).
 *
 * @param ctx - Build context controlling production vs development behavior.
 * @returns A webpack `optimization` configuration object.
 */
export const getOptimization = (ctx: BuildContext): Optimization => ({
  minimize: ctx.isProduction,
  minimizer: [getTerserPlugin(ctx), new CssMinimizerPlugin()],
  splitChunks: getSplitChunksConfig(),
  runtimeChunk: {
    name: 'runtime',
  },
  moduleIds: 'deterministic',
  chunkIds: 'deterministic',
});
