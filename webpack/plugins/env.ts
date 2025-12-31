import dotenv from 'dotenv';
import Dotenv from 'dotenv-webpack';
import fs from 'fs';
import path from 'path';

import { REQUIRED_ENV_VARS } from '@/../required-env-vars';

import type { BuildContext } from '../ctx';
import type { WebpackPluginInstance } from 'webpack';

import { ROOT_DIR } from '../paths';

function validateEnvVars(ctx: BuildContext): void {
  const envFile = `.env${ctx.isProduction ? '.production' : '.development'}`;
  const envPath = path.resolve(ROOT_DIR, envFile);

  // Load from file if exists
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, quiet: true });
  }

  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `\n\n❌ Missing required environment variables: ${missing.join(', ')}\n` +
        `   Please define them in ${envFile} or set them in your environment.\n`
    );
  }
}

/**
 * Creates a {@link Dotenv} (dotenv-webpack) plugin instance to load environment variables for the build.
 *
 * Validates that required env vars are present before building.
 *
 * @param ctx - Build context used to select production vs development env file.
 * @returns A webpack plugin instance that loads and injects environment variables into the build.
 */
export const getEnvPlugin = (ctx: BuildContext): WebpackPluginInstance => {
  validateEnvVars(ctx);

  return new Dotenv({
    path: path.resolve(ROOT_DIR, `.env${ctx.isProduction ? '.production' : '.development'}`),
    safe: false,
    silent: true,
    systemvars: true,
  });
};
