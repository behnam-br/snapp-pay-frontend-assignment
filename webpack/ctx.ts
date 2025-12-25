import { ROOT_DIR } from './paths';

export interface WebpackArgv {
  mode?: 'development' | 'production';
  port?: number;
  analyzerPort?: number;
}

export interface WebpackEnv {
  analyze?: string;
  analyzerPort?: string;
}

export interface BuildContext {
  isDevelopment: boolean;
  isProduction: boolean;
  isAnalyze: boolean;
  rootDir: string;
  port: number;
  analyzerPort: number;
}

/**
 * Builds a normalized {@link BuildContext} from raw webpack CLI inputs.
 *
 * Webpack provides two inputs to configuration functions:
 * - `env`: values passed via `--env ...` (often strings)
 * - `argv`: parsed CLI arguments such as `--mode`, plus any custom flags
 *
 * This helper:
 * - Derives convenient boolean flags (`isDevelopment`, `isProduction`) from `argv.mode`.
 * - Enables bundle analysis when `env.analyze === "true"`.
 * - Injects shared paths (`rootDir`) from project constants.
 * - Applies defaults for ports when not provided:
 *   - `port` defaults to 3000
 *   - `analyzerPort` defaults to 3001
 *
 * Result:
 * - A single context object that can be passed into plugin/rule factories to keep the webpack config
 *   consistent and avoid repeating environment/CLI parsing logic.
 *
 * @param env - Webpack env values (e.g., `--env analyze=true`).
 * @param argv - Webpack argv values (e.g., `--mode development`, `--port 3000`).
 * @returns A normalized build context used to configure webpack behavior.
 */
export const getContext = (env: WebpackEnv, argv: WebpackArgv): BuildContext => {
  const ctx: BuildContext = {
    isDevelopment: argv.mode === 'development',
    isProduction: argv.mode === 'production',
    isAnalyze: env?.analyze === 'true',
    rootDir: ROOT_DIR,
    port: Number(argv.port) || 3000,
    analyzerPort: Number(env.analyzerPort) || 3001,
  };
  return ctx;
};
