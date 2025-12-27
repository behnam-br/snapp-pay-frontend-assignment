import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { BuildContext } from '../ctx';
import type { RuleSetRule } from 'webpack';

/**
 * Returns the appropriate style loader for dev/prod.
 */
const getStyleLoader = (ctx: BuildContext) =>
  ctx.isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader;

/**
 * Webpack rules for processing CSS/Sass stylesheets.
 *
 * Two rules are returned:
 * 1. CSS Modules rule: for `.module.css`, `.module.scss`, `.module.sass` files.
 *    These are scoped to the component and imported as objects with class name mappings.
 * 2. Global styles rule: for regular `.css`, `.scss`, `.sass` files.
 *    These are global and not scoped.
 *
 * Loader pipeline (executed right-to-left):
 * 1) `sass-loader` compiles `.scss`/`.sass` into plain CSS.
 * 2) `css-loader` resolves `@import` and `url(...)` references and turns CSS into a JS module.
 * 3) In development, `style-loader` injects CSS into the DOM via `<style>` tags for fast HMR.
 *    In production, `MiniCssExtractPlugin.loader` extracts CSS into standalone `.css` files.
 *
 * @param ctx - Build context controlling development vs production behavior.
 * @returns An array of webpack module rules for CSS/SCSS/Sass files.
 */
export const getStylesRule = (ctx: BuildContext): RuleSetRule[] => [
  // CSS Modules: *.module.css, *.module.scss, *.module.sass
  {
    test: /\.module\.(css|scss|sass)$/,
    use: [
      getStyleLoader(ctx),
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: ctx.isDevelopment,
          modules: {
            localIdentName: ctx.isDevelopment
              ? '[name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
          },
        },
      },
      'sass-loader',
    ],
  },
  // Global styles: *.css, *.scss, *.sass (excluding .module.*)
  {
    test: /\.(css|scss|sass)$/,
    exclude: /\.module\.(css|scss|sass)$/,
    use: [
      getStyleLoader(ctx),
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: ctx.isDevelopment,
        },
      },
      'sass-loader',
    ],
  },
];
