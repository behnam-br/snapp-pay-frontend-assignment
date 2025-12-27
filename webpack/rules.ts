/**
 * Define how different file types should be processed (loaders).
 * Each rule specifies a test pattern and the loaders to apply.
 */

import { getFontsRule, getImagesRule } from '@/../webpack/rules/assets';
import { getJsonRule } from '@/../webpack/rules/json';
import { getStylesRule } from '@/../webpack/rules/styles';
import { getSvgRule } from '@/../webpack/rules/svg';
import { getTypescriptRule } from '@/../webpack/rules/typescript';

import type { BuildContext } from '@/../webpack/ctx';
import type { RuleSetRule } from 'webpack';

/**
 * Returns the webpack `module.rules` array that defines how different file types are processed.
 *
 * Rules included:
 * - TypeScript/TSX: transpiles `.ts`/`.tsx` sources for bundling.
 * - SVG: allows SVG imports from JS/TS as React components (SVGR) while also emitting the file.
 * - Styles: processes `.css`/`.scss`/`.sass` (injects in dev, extracts in prod).
 * - Images: handles raster images via Asset Modules (inline small files, emit larger files).
 * - Fonts: emits font files via `asset/resource`.
 * - JSON: treats `.json` as JSON modules (explicit; webpack supports JSON by default).
 *
 * Note on ordering:
 * - The SVG rule appears before the generic asset/image rules so SVGs are handled by SVGR rather than
 *   being treated as a plain file/asset.
 *
 * @param ctx - Build context used by rules that differ between development and production (e.g. styles).
 * @returns An ordered list of webpack rules for `module.rules`.
 */
export const getRules = (ctx: BuildContext): RuleSetRule[] => [
  getTypescriptRule(),
  getSvgRule(),
  ...getStylesRule(ctx),
  getImagesRule(),
  getFontsRule(),
  getJsonRule(),
];
