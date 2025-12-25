/**
 * =============================================================================
 * WEBPACK CONFIGURATION
 * =============================================================================
 *
 * This configuration handles bundling for a React + TypeScript application.
 * It supports both development (with HMR) and production (with optimizations).
 *
 * Key Features:
 * - TypeScript compilation with type checking in separate process
 * - SCSS/CSS support with extraction in production
 * - Asset optimization (images, fonts, SVGs)
 * - Code splitting for better caching
 * - Gzip & Brotli compression for production
 * - Hot Module Replacement for development
 * - Bundle analysis capability
 */
import { BuildContext, getContext, WebpackArgv, WebpackEnv } from './webpack/ctx';
import { getDevServer } from './webpack/devServer';
import { getOptimization } from './webpack/optimization';
import { CACHE_DIR, CONFIG_FILE, DIST_DIR, ENTRY_FILE, SRC_DIR } from './webpack/paths';
import { getPlugins } from './webpack/plugins';
import { getRules } from './webpack/rules';

import type { Configuration as WebpackConfiguration } from 'webpack';

export default (env: WebpackEnv, argv: WebpackArgv): WebpackConfiguration => {
  const ctx: BuildContext = getContext(env, argv);

  return {
    entry: ENTRY_FILE,
    output: {
      path: DIST_DIR,
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[contenthash:8].chunk.js',
      assetModuleFilename: 'assets/[name].[hash:8][ext]',
      clean: true,
      publicPath: '/',
    },
    cache: {
      type: 'filesystem',
      version: '1.0.0',
      cacheDirectory: CACHE_DIR,
      buildDependencies: {
        config: [CONFIG_FILE],
      },
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        '@': SRC_DIR,
      },
      modules: ['node_modules'],
      symlinks: false,
    },
    module: {
      strictExportPresence: true,
      rules: getRules(ctx),
    },
    plugins: getPlugins(ctx),
    optimization: getOptimization(ctx),
    devServer: getDevServer(ctx),
    devtool: ctx.isProduction ? false : 'source-map',
    performance: {
      hints: ctx.isProduction ? 'warning' : false,
      maxAssetSize: 512000, // 500KB
      maxEntrypointSize: 512000,
    },
    stats: ctx.isDevelopment ? 'errors-only' : 'errors-warnings',
    infrastructureLogging: {
      level: 'error',
    },
    bail: ctx.isProduction,
  };
};
