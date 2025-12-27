import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link MiniCssExtractPlugin} instance to extract CSS into standalone files.
 *
 * When used with `MiniCssExtractPlugin.loader` in module rules, CSS imported from JS/TS modules is
 * emitted as real `.css` files instead of being injected into the page via JavaScript (e.g. `style-loader`).
 *
 * Output naming:
 * - `filename` controls CSS emitted for entry chunks and uses a content hash for long-term caching.
 * - `chunkFilename` controls CSS emitted for non-entry (split/lazy-loaded) chunks, also content-hashed.
 *
 * Result:
 * - Emits files like `dist/css/<entry>.<contenthash>.css` and `dist/css/<chunkId>.<contenthash>.css`.
 * - Enables efficient caching and proper stylesheet loading in production builds.
 *
 * @returns A webpack plugin instance that extracts CSS into separate files.
 */
export const getCssExtractPlugin = (): WebpackPluginInstance =>
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[id].[contenthash:8].css',
  });
