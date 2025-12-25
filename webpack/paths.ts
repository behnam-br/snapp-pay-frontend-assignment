import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, '..');
export const SRC_DIR = path.resolve(ROOT_DIR, 'src');
export const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
export const ASSETS_DIR = path.resolve(SRC_DIR, 'assets');
export const NODE_MODULES_DIR = path.resolve(ROOT_DIR, 'node_modules');
export const CACHE_DIR = path.resolve(NODE_MODULES_DIR, '.cache/webpack');
export const ENTRY_FILE = path.resolve(SRC_DIR, 'index.tsx');
export const HTML_TEMPLATE = path.resolve(SRC_DIR, 'index.html');
export const CONFIG_FILE = path.resolve(ROOT_DIR, 'webpack.config.ts');
