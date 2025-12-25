import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link ReactRefreshWebpackPlugin} instance to enable React Fast Refresh in webpack.
 *
 * React Fast Refresh improves the development experience by updating React components in the browser
 * without a full page reload, often preserving component state during edits.
 *
 * Notes:
 * - Intended for development builds only.
 * - Typically used alongside webpack HMR (`devServer.hot: true`) and a compatible loader/Babel setup.
 *
 * @returns A webpack plugin instance that enables React Fast Refresh.
 */
export const getReactRefreshPlugin = (): WebpackPluginInstance => new ReactRefreshWebpackPlugin();
