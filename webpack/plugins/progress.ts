import WebpackBar from 'webpackbar';

import type { BuildContext } from '../ctx';
import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link WebpackBar} plugin instance to display a terminal build progress bar.
 *
 * This plugin improves developer experience by showing compilation progress and build status.
 * It does not affect the generated bundles or build output; it only changes console output.
 *
 * Configuration:
 * - `name` changes the label shown in the progress bar (e.g., "Starting" in dev, "Building" in prod).
 * - `color` sets the progress bar color, allowing quick visual distinction between dev and prod runs.
 *
 * @param ctx - Build context used to select a label and color based on production vs development mode.
 * @returns A webpack plugin instance that renders a progress bar during compilation.
 */
export const getProgressPlugin = (ctx: BuildContext): WebpackPluginInstance =>
  new WebpackBar({
    name: ctx.isProduction ? 'Building' : 'Starting',
    color: ctx.isProduction ? '#ff8906' : '#3da9fc',
  });
