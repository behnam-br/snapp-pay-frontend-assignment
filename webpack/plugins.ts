import { getBundleAnalyzerPlugin } from './plugins/bundleAnalyzer';
import { getCaseSensitivePathsPlugin } from './plugins/caseSensitivePaths';
import { getCircularDependencyPlugin } from './plugins/circularDependency';
import { getBrotliPlugin, getGzipPlugin } from './plugins/compression';
import { getCopyPlugin } from './plugins/copy';
import { getCssExtractPlugin } from './plugins/cssExtract';
import { getDefinePlugin } from './plugins/define';
import { getDuplicatePackageCheckerPlugin } from './plugins/duplicatePackageChecker';
import { getEnvPlugin } from './plugins/env';
import { getEslintPlugin } from './plugins/eslint';
import { getHtmlPlugin } from './plugins/html';
import { getPrefetchPlugin, getPreloadPlugin } from './plugins/preload';
import { getProgressPlugin } from './plugins/progress';
import { getReactRefreshPlugin } from './plugins/reactRefresh';
import { getTypeCheckerPlugin } from './plugins/typeChecker';

import type { BuildContext } from './ctx';
import type { WebpackPluginInstance } from 'webpack';

/**
 * Builds the webpack `plugins` array based on the current {@link BuildContext}.
 *
 * Always enabled:
 * - Progress bar output ({@link getProgressPlugin})
 * - HTML template generation + bundle injection ({@link getHtmlPlugin})
 * - Copy static resources into the output directory ({@link getCopyPlugin})
 * - TypeScript type checking in a separate process ({@link getTypeCheckerPlugin})
 * - Circular dependency detection in `src` ({@link getCircularDependencyPlugin})
 * - Environment variable loading from `.env.*` files ({@link getEnvPlugin})
 * - Compile-time build flags (`__DEV__`, `__PROD__`) via DefinePlugin ({@link getDefinePlugin})
 * - Case-sensitive import path enforcement ({@link getCaseSensitivePathsPlugin})
 * - Duplicate package detection ({@link getDuplicatePackageCheckerPlugin})
 *
 * Production-only:
 * - Extract CSS into standalone files ({@link getCssExtractPlugin})
 * - Emit gzip and Brotli precompressed assets ({@link getGzipPlugin}, {@link getBrotliPlugin})
 * - Preload hints for initial chunks ({@link getPreloadPlugin})
 * - Prefetch hints for async/lazy chunks ({@link getPrefetchPlugin})
 *
 * Development-only:
 * - React Fast Refresh ({@link getReactRefreshPlugin})
 * - ESLint during compilation ({@link getEslintPlugin})
 *
 * Analyze-only:
 * - Bundle analyzer (server in dev, static report in prod) ({@link getBundleAnalyzerPlugin})
 *
 * Implementation detail:
 * - Conditional plugins are included using short-circuiting (`ctx.isProduction && ...`) and falsy
 *   values are removed via `.filter(Boolean)`.
 *
 * @param ctx - Build context controlling development/production/analyze behavior.
 * @returns An ordered array of webpack plugin instances.
 */
export const getPlugins = (ctx: BuildContext): WebpackPluginInstance[] =>
  [
    getProgressPlugin(ctx),
    getHtmlPlugin(ctx),
    getCopyPlugin(),
    getTypeCheckerPlugin(ctx),
    getCircularDependencyPlugin(ctx),
    getEnvPlugin(ctx),
    getDefinePlugin(ctx),
    getCaseSensitivePathsPlugin(),
    getDuplicatePackageCheckerPlugin(),

    ctx.isProduction && getCssExtractPlugin(),
    ctx.isProduction && getGzipPlugin(),
    ctx.isProduction && getBrotliPlugin(),
    ctx.isProduction && getPreloadPlugin(),
    ctx.isProduction && getPrefetchPlugin(),

    ctx.isDevelopment && getReactRefreshPlugin(),
    ctx.isDevelopment && getEslintPlugin(),

    ctx.isAnalyze && getBundleAnalyzerPlugin(ctx),
  ].filter(Boolean) as WebpackPluginInstance[];
