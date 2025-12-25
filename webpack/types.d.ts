/**
 * Type declarations for webpack plugins without published types.
 */

declare module 'duplicate-package-checker-webpack-plugin' {
  import { Compiler } from 'webpack';

  interface Options {
    verbose?: boolean;
    emitError?: boolean;
    showHelp?: boolean;
    strict?: boolean;
    exclude?: (instance: { name: string; version: string; path: string }) => boolean;
  }

  class DuplicatePackageCheckerPlugin {
    constructor(options?: Options);
    apply(compiler: Compiler): void;
  }

  export = DuplicatePackageCheckerPlugin;
}

declare module '@vue/preload-webpack-plugin' {
  import { Compiler } from 'webpack';

  interface Options {
    rel: 'preload' | 'prefetch';
    include?: 'initial' | 'asyncChunks' | 'allChunks' | 'allAssets';
    fileBlacklist?: RegExp[];
    fileWhitelist?: RegExp[];
    as?: string | ((entry: string) => string);
    media?: string;
  }

  class PreloadWebpackPlugin {
    constructor(options?: Options);
    apply(compiler: Compiler): void;
  }

  export = PreloadWebpackPlugin;
}
