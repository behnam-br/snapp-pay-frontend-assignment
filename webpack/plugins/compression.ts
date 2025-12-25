import CompressionPlugin from 'compression-webpack-plugin';

import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link CompressionPlugin} instance that emits gzip-compressed copies of build assets.
 *
 * The plugin generates additional `.gz` files next to the original assets (it does not replace them).
 * These pre-compressed files can be served by a properly configured server/CDN when clients send
 * `Accept-Encoding: gzip`, reducing transfer size and improving load time.
 *
 * Configuration:
 * - `filename: "[path][base].gz"` keeps the original asset path/name and appends `.gz`.
 * - `algorithm: "gzip"` uses gzip compression.
 * - `test` limits compression to JS/CSS/HTML/SVG files.
 * - `threshold: 0` compresses all matching files regardless of size.
 * - `minRatio: 0.8` only emits the compressed file when it achieves a meaningful size reduction.
 *
 * @returns A webpack plugin instance that produces `.gz` assets during the build.
 */
export const getGzipPlugin = (): WebpackPluginInstance =>
  new CompressionPlugin({
    filename: '[path][base].gz',
    algorithm: 'gzip',
    test: /\.(js|css|html|svg)$/,
    threshold: 0,
    minRatio: 0.8,
  });

/**
 * Creates a {@link CompressionPlugin} instance that emits Brotli-compressed copies of build assets.
 *
 * The plugin generates additional `.br` files next to the original assets (it does not replace them).
 * These pre-compressed files can be served by a properly configured server/CDN when clients send
 * `Accept-Encoding: br`, often providing better compression ratios than gzip.
 *
 * Configuration:
 * - `filename: "[path][base].br"` keeps the original asset path/name and appends `.br`.
 * - `algorithm: "brotliCompress"` uses the Node.js Brotli compressor.
 * - `test` limits compression to JS/CSS/HTML/SVG files.
 * - `threshold: 0` compresses all matching files regardless of size.
 * - `minRatio: 0.8` only emits the compressed file when it achieves a meaningful size reduction.
 *
 * @returns A webpack plugin instance that produces `.br` assets during the build.
 */
export const getBrotliPlugin = (): WebpackPluginInstance =>
  new CompressionPlugin({
    filename: '[path][base].br',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    threshold: 0,
    minRatio: 0.8,
  });
