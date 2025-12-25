import type { RuleSetRule } from 'webpack';

/**
 * Webpack rule for SVGs imported from JS/TS modules, enabling SVG-as-React-component usage.
 *
 * Behavior:
 * - Matches `.svg` files and only applies when the importing file is a JS/TS module (`issuer`),
 *   so SVGs can be treated differently in code vs other contexts (e.g., CSS `url(...)`).
 *
 * Loader pipeline (executed right-to-left):
 * 1) `file-loader` emits the SVG to the output directory and returns its URL.
 *    - Output path/name: `images/<name>.<hash>.<ext>`
 * 2) `@svgr/webpack` transforms the SVG into a React component.
 *    - Enables SVGO optimization (`svgo: true`) but keeps the `viewBox` attribute to preserve scaling.
 *    - Adds `title` prop support (`titleProp: true`) for accessibility.
 *    - Enables ref forwarding to the underlying `<svg>` element (`ref: true`).
 *
 * Result:
 * - `import Icon from "./icon.svg"` yields a React component that renders the SVG.
 * - The SVG file is also emitted to `dist/images/...` for URL-based usage/caching.
 *
 * Note:
 * - `file-loader` is legacy; in webpack 5 this can be replaced with Asset Modules
 *   (`type: "asset/resource"`) if desired.
 */
export const getSvgRule = (): RuleSetRule => ({
  test: /\.svg$/i,
  issuer: /\.[jt]sx?$/,
  use: [
    {
      loader: '@svgr/webpack',
      options: {
        svgo: true,
        svgoConfig: {
          plugins: [{ name: 'removeViewBox', active: false }],
        },
        titleProp: true,
        ref: true,
      },
    },
    {
      loader: 'file-loader',
      options: {
        name: 'images/[name].[hash:8].[ext]',
      },
    },
  ],
});
