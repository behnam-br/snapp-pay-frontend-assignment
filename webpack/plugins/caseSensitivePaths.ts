import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link CaseSensitivePathsPlugin} instance to enforce case-correct import paths.
 *
 * Why:
 * - Windows and many macOS configurations use case-insensitive file systems, so incorrect import casing
 *   (e.g., `import "./button"` vs file `Button.tsx`) may work locally but fail in CI/containers or production
 *   deployments on Linux (case-sensitive).
 *
 * Result:
 * - During compilation, webpack reports an error when the resolved path casing does not match the actual
 *   file path casing on disk, preventing "works on my machine" issues.
 *
 * Typing note:
 * - The plugin's published TypeScript types may not align exactly with webpack's `WebpackPluginInstance`
 *   across versions, so a cast is used to satisfy the expected plugin type.
 *
 * @returns A webpack plugin instance that checks for case-sensitive path mismatches.
 */
export const getCaseSensitivePathsPlugin = (): WebpackPluginInstance =>
  new CaseSensitivePathsPlugin() as unknown as WebpackPluginInstance;
