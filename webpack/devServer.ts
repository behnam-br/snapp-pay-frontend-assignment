import { networkInterfaces } from 'os';

import { BuildContext } from './ctx';
import { ASSETS_DIR, DIST_DIR, SRC_DIR } from './paths';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

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
 * Creates the webpack-dev-server configuration used during development.
 *
 * Features:
 * - Serves static files from multiple directories:
 *   - `DIST_DIR` (built output)
 *   - `ASSETS_DIR` (static assets)
 *   - `SRC_DIR` mounted under `/@` for runtime access to non-bundled source resources
 * - Binds to `0.0.0.0` to allow access via both localhost and LAN IP.
 * - Enables Hot Module Replacement (HMR) for faster development feedback loops.
 * - Supports SPA routing via `historyApiFallback` (serves index HTML for unknown routes).
 * - Enables response compression to better approximate production transfer behavior.
 *
 * Client UX:
 * - Shows a full-screen overlay for build errors but not warnings.
 * - Minimizes browser console noise (`logging: "error"`).
 *
 * Logging:
 * - Limits terminal stats output to errors only.
 * - Prints local and network URLs once the server starts listening.
 *
 * @param ctx - Build context providing the dev-server port.
 * @returns A webpack-dev-server configuration object.
 */
export const getDevServer = (ctx: BuildContext): DevServerConfiguration => ({
  static: [
    { directory: DIST_DIR },
    { directory: ASSETS_DIR },
    { directory: SRC_DIR, publicPath: '/@' },
  ],
  host: '0.0.0.0',
  port: ctx.port,
  hot: true,
  open: false,
  historyApiFallback: true,
  compress: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
    progress: false,
    logging: 'error',
  },
  devMiddleware: {
    stats: 'errors-only',
  },
  onListening: (devServer) => {
    const port = (devServer.server?.address() as { port: number })?.port;
    const localIP = getLocalNetworkIP();
    console.log('\x1b[36m%s\x1b[0m', '🚀 App running at:');
    console.log('\x1b[32m%s\x1b[0m', `  Local:   http://localhost:${port}`);
    if (localIP) {
      console.log('\x1b[32m%s\x1b[0m', `  Network: http://${localIP}:${port}`);
    }
  },
});
