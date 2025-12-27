import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';

import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link DuplicatePackageCheckerPlugin} instance to detect duplicate packages in the bundle.
 *
 * Why this matters for React:
 * - Having multiple copies of React in a bundle causes the infamous "Invalid hook call" error.
 * - Duplicate packages also bloat the bundle size unnecessarily.
 *
 * Behavior:
 * - Scans the dependency tree and warns when the same package appears multiple times with different versions.
 * - Logs detailed information about where the duplicates come from.
 *
 * Result:
 * - Early detection of duplicate dependencies before they cause runtime issues.
 * - Helps maintain a lean bundle by identifying unnecessary duplication.
 *
 * @returns A webpack plugin instance that checks for duplicate packages.
 */
export const getDuplicatePackageCheckerPlugin = (): WebpackPluginInstance =>
  new DuplicatePackageCheckerPlugin({
    verbose: true,
    emitError: false, // Warn, don't fail the build
  }) as unknown as WebpackPluginInstance;
