import PreloadWebpackPlugin from '@vue/preload-webpack-plugin';

import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link PreloadWebpackPlugin} instance to add resource hints for better loading performance.
 *
 * Behavior:
 * - Adds `<link rel="preload">` for initial/critical chunks (loaded immediately).
 * - Adds `<link rel="prefetch">` for async chunks (lazy-loaded routes/components).
 *
 * Why this helps React apps:
 * - Preloading ensures critical JS/CSS is fetched with high priority.
 * - Prefetching async chunks during idle time makes route navigation feel instant.
 *
 * Configuration:
 * - `rel: 'preload'` for initial chunks with `as: 'script'` for proper priority.
 * - `rel: 'prefetch'` for async chunks to load them during browser idle time.
 *
 * Result:
 * - Faster initial page load (critical resources loaded sooner).
 * - Smoother navigation (lazy chunks already cached before user clicks).
 *
 * @returns A webpack plugin instance that injects preload/prefetch link tags.
 */
export const getPreloadPlugin = (): WebpackPluginInstance =>
  new PreloadWebpackPlugin({
    rel: 'preload',
    include: 'initial',
    fileBlacklist: [/\.map$/, /hot-update/],
  }) as unknown as WebpackPluginInstance;

/**
 * Creates a prefetch plugin for async/lazy-loaded chunks.
 *
 * @returns A webpack plugin instance that injects prefetch link tags for async chunks.
 */
export const getPrefetchPlugin = (): WebpackPluginInstance =>
  new PreloadWebpackPlugin({
    rel: 'prefetch',
    include: 'asyncChunks',
    fileBlacklist: [/\.map$/, /hot-update/],
  }) as unknown as WebpackPluginInstance;
