import { networkInterfaces } from 'os';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import type { BuildContext } from '../ctx';
import type { WebpackPluginInstance } from 'webpack';

const getLocalNetworkIP = (): string | undefined => {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return undefined;
};

/**
 * Creates a configured {@link BundleAnalyzerPlugin} instance and prints the analyzer URL(s) to the console.
 *
 * Behavior:
 * - Determines the analyzer port from `ctx.analyzerPort` (if provided) or defaults to `3001`.
 * - Attempts to discover the first non-internal IPv4 address from the host machine's network interfaces
 *   to provide a LAN-accessible URL (useful for viewing the analyzer on another device).
 * - Logs the local and (if available) network analyzer addresses once when the webpack config is evaluated.
 *
 * Analyzer modes:
 * - Development (`ctx.isDevelopment === true`):
 *   - Uses `analyzerMode: "server"` to start an HTTP server hosting the interactive report UI.
 *   - Does not automatically open a browser (`openAnalyzer: false`).
 * - Production:
 *   - Uses `analyzerMode: "static"` to emit a standalone HTML report (`bundle-report.html`).
 *   - Does not automatically open a browser (`openAnalyzer: false`).
 *
 * Output sizing:
 * - Uses `defaultSizes: "stat"` to display sizes based on webpack stats data.
 *
 * Logging:
 * - Sets `logLevel: "silent"` to suppress plugin output (custom console messages are used instead).
 *
 * @param ctx - Build context controlling environment and analyzer port selection.
 * @returns A webpack plugin instance that produces an interactive (dev) or static (prod) bundle report.
 */
export const getBundleAnalyzerPlugin = (ctx: BuildContext): WebpackPluginInstance => {
  const analyzerPort = ctx.analyzerPort ? Number(ctx.analyzerPort) : 3001;

  // Log analyzer address once when the config is evaluated.
  const localIP = getLocalNetworkIP();
  console.log('\x1b[36m%s\x1b[0m', '📊 Bundle Analyzer running at:');
  console.log('\x1b[32m%s\x1b[0m', `  local:   http://localhost:${analyzerPort}`);
  if (localIP) {
    console.log('\x1b[32m%s\x1b[0m', `  network: http://${localIP}:${analyzerPort}`);
  }

  return new BundleAnalyzerPlugin(
    ctx.isDevelopment
      ? {
          analyzerMode: 'server',
          analyzerPort,
          openAnalyzer: false,
          defaultSizes: 'stat',
          logLevel: 'silent',
        }
      : {
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-report.html',
          defaultSizes: 'stat',
          logLevel: 'silent',
        }
  );
};
