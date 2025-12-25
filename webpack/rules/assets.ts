import type { RuleSetRule } from 'webpack';

/**
 * Webpack rule for images using Asset Modules.
 *
 * - Matches common raster image formats (png/jpg/gif/webp/avif).
 * - Uses `type: "asset"` to automatically inline small files as Data URLs and emit larger files.
 * - Inlines images up to 10KB (`maxSize: 10 * 1024`).
 * - Emits larger images to `dist/images/` with an 8-character hash for cache busting.
 *
 * Result:
 * - Small images become inlined `data:` URLs inside the bundle.
 * - Larger images are written as files like `images/<name>.<hash>.<ext>` and imports resolve to their URL.
 */
export const getImagesRule = (): RuleSetRule => ({
  test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024, // 10KB
    },
  },
  generator: {
    filename: 'images/[name].[hash:8][ext]',
  },
});

/**
 * Webpack rule for fonts using Asset Modules.
 *
 * - Matches common font formats (woff/woff2/eot/ttf/otf).
 * - Uses `type: "asset/resource"` to always emit fonts as separate files (never inlined).
 * - Emits fonts to `dist/fonts/` with an 8-character hash for cache busting.
 *
 * Result:
 * - Fonts are written as files like `fonts/<name>.<hash>.<ext>` and `url(...)`/imports resolve to their URL.
 */
export const getFontsRule = (): RuleSetRule => ({
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'fonts/[name].[hash:8][ext]',
  },
});
