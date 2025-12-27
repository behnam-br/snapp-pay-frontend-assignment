import CopyWebpackPlugin from 'copy-webpack-plugin';

import { ASSETS_DIR, SRC_DIR } from '../paths';

import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link CopyWebpackPlugin} instance to copy static files into the build output.
 *
 * This plugin is used for assets/resources that should be available in `dist` without being processed
 * by webpack loaders (i.e., copied "as-is").
 *
 * Copy patterns:
 * 1) `ASSETS_DIR` -> `dist/assets`
 *    - Copies everything from the assets directory into the output `assets/` folder.
 *    - Ignores dotfiles and does not fail the build if the directory is missing.
 *
 * 2) `SRC_DIR` -> `dist/@`
 *    - Copies non-code/static files from the source directory into an `@/` folder in the output.
 *    - Excludes TypeScript/TSX, CSS/SCSS, HTML templates, dotfiles, and the `assets/` subtree
 *      (to avoid duplicating the first pattern).
 *    - Useful when certain resources need to be fetched/served at runtime by path rather than bundled.
 *
 * @returns A webpack plugin instance that copies selected files into the output directory.
 */
export const getCopyPlugin = (): WebpackPluginInstance =>
  new CopyWebpackPlugin({
    patterns: [
      {
        from: ASSETS_DIR,
        to: 'assets',
        noErrorOnMissing: true,
        globOptions: {
          ignore: ['**/.*'],
        },
      },
      {
        from: SRC_DIR,
        to: '@',
        noErrorOnMissing: true,
        globOptions: {
          ignore: [
            '**/.*',
            '**/*.tsx',
            '**/*.ts',
            '**/*.scss',
            '**/*.css',
            '**/*.html',
            '**/assets/**',
          ],
        },
      },
    ],
  });
