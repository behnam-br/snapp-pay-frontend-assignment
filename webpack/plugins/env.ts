import Dotenv from 'dotenv-webpack';
import path from 'path';

import { ROOT_DIR } from '../paths';

import type { BuildContext } from '../ctx';
import type { WebpackPluginInstance } from 'webpack';

/**
 * Creates a {@link Dotenv} (dotenv-webpack) plugin instance to load environment variables for the build.
 *
 * Behavior:
 * - Loads env vars from a mode-specific file at the project root:
 *   - Production: `.env.production`
 *   - Development: `.env.development`
 * - Also includes variables from the host process environment (`systemvars: true`),
 *   which is useful for CI/CD or container-based deployments.
 *
 * Options:
 * - `safe: false` disables `.env.example` validation (no required-vars enforcement).
 * - `silent: true` suppresses warnings if the `.env` file is missing.
 * - `systemvars: true` merges in variables from `process.env`.
 *
 * Result:
 * - Environment variables are made available during bundling (e.g., `process.env.MY_VAR` in client code).
 *   Any variables referenced in the frontend bundle can be exposed to users, so secrets should not be stored
 *   in these `.env.*` files for browser-targeted builds.
 *
 * @param ctx - Build context used to select production vs development env file.
 * @returns A webpack plugin instance that loads and injects environment variables into the build.
 */
export const getEnvPlugin = (ctx: BuildContext): WebpackPluginInstance =>
  new Dotenv({
    path: path.resolve(ROOT_DIR, `.env${ctx.isProduction ? '.production' : '.development'}`),
    safe: false,
    silent: true,
    systemvars: true,
  });
