import type { RuleSetRule } from 'webpack';

/**
 * Webpack rule for JSON modules.
 *
 * - Matches `.json` files.
 * - Uses `type: "json"` so webpack treats JSON files as JSON modules, allowing them to be imported
 *   and used as parsed JavaScript values.
 *
 * Result:
 * - `import data from "./data.json"` yields the parsed JSON object.
 * - The JSON content is included in the bundle (not emitted as a separate file).
 *
 * Note:
 * - Webpack supports JSON imports by default; this rule is mainly explicit documentation/config clarity.
 */
export const getJsonRule = (): RuleSetRule => ({
  test: /\.json$/,
  type: 'json',
});
