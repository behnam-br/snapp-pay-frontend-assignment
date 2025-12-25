import axios from 'axios';

/**
 * Axios instance for API calls.
 *
 * - If `API_URL` is an absolute URL (e.g. http://localhost:3001), requests go directly to the backend
 *   and your backend must allow CORS for the frontend origin (e.g. http://localhost:3000).
 * - If `API_URL` is `/api`, requests go to webpack-dev-server first and are proxied via `devServer.proxy`.
 */
export const http = axios.create({
  baseURL: process.env.API_URL || '/api',
});
