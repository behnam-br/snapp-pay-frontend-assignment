import HtmlWebpackPlugin from 'html-webpack-plugin';

import { HTML_TEMPLATE } from '../paths';

import type { BuildContext } from '../ctx';
import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates an {@link HtmlWebpackPlugin} instance to generate the final HTML entry file for the app.
 *
 * Behavior:
 * - Uses `HTML_TEMPLATE` as the input template and emits an HTML file to the webpack output directory
 *   (commonly `dist/index.html`).
 * - Automatically injects `<script>` and `<link>` tags for the bundles produced by webpack (`inject: true`),
 *   which is especially important when filenames include hashes.
 * - Disables built-in favicon handling (`favicon: false`); favicon can be handled via static copying
 *   or explicit template tags instead.
 *
 * Production minification:
 * - When `ctx.isProduction` is true, enables HTML minification to reduce the final HTML size and also
 *   minifies any inline JS/CSS and URLs within the template.
 * - When false (development), minification is disabled for readability and faster rebuilds.
 *
 * @param ctx - Build context used to toggle production HTML minification.
 * @returns A webpack plugin instance that emits an HTML file with injected asset tags.
 */
export const getHtmlPlugin = (ctx: BuildContext): WebpackPluginInstance =>
  new HtmlWebpackPlugin({
    template: HTML_TEMPLATE,
    favicon: false,
    inject: true,
    minify: ctx.isProduction
      ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      : false,
  });
