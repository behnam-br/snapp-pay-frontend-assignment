import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { ApiError } from '@/lib/axios/res-types';

/**
 * Creates a preconfigured Axios HTTP client instance for the application.
 *
 * @remarks
 * The client is configured with:
 * - `baseURL` from `process.env.API_URL`
 * - A 30s timeout
 * - JSON request/response headers
 *
 * It also registers request/response interceptors for development logging and
 * centralized error handling.
 *
 * @returns A configured Axios instance with interceptors attached.
 */
function createHttpClient() {
  const instance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use(requestInterceptorOnFulfilled, requestInterceptorOnRejected);
  instance.interceptors.response.use(responseInterceptorOnFulfilled, responseInterceptorOnRejected);

  return instance;
}

/**
 * Shared singleton HTTP client instance.
 *
 * @remarks
 * Import and use this instance throughout the app to ensure consistent configuration
 * and consistent interceptor behavior.
 */
export const http = createHttpClient();

/**
 * Axios request interceptor (fulfilled handler).
 *
 * @param config - Axios request configuration object.
 * @returns The (possibly modified) request configuration.
 *
 * @remarks
 * Currently logs the outgoing request in development builds. This is a common place
 * to attach authentication headers, correlation IDs, locale, etc.
 */
function requestInterceptorOnFulfilled(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  if (__DEV__) {
    console.log(`🌐 [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
  }

  return config;
}

/**
 * Axios request interceptor (rejected handler).
 *
 * @param err - Unknown error thrown while preparing the request or inside a request interceptor.
 * @returns A rejected promise containing the original error.
 *
 * @remarks
 * This handler is invoked when Axios fails before sending the request, or when a
 * request interceptor throws/rejects. It logs a message in development builds.
 *
 * Note: HTTP status errors (4xx/5xx) are handled by the response interceptor instead.
 */
function requestInterceptorOnRejected(err: unknown): Promise<ApiError> {
  if (__DEV__) {
    let message = 'unknown error';
    if (err && typeof err === 'object' && 'message' in err) {
      message = (err as AxiosError).message;
    }
    console.error('❌ Request interceptor error', message);
  }

  return Promise.reject(err);
}

/**
 * Axios response interceptor (fulfilled handler).
 *
 * @param response - Axios response object.
 * @returns The response (possibly transformed).
 *
 * @remarks
 * Currently logs the response status in development builds. This is a common place
 * to normalize successful responses (e.g. return `response.data`) if desired.
 */
function responseInterceptorOnFulfilled(response: AxiosResponse): AxiosResponse {
  if (__DEV__) {
    console.log(`✅ [${response.status}] ${response.config.url}`);
  }

  return response;
}

/**
 * Axios response interceptor (rejected handler).
 *
 * @param error - Axios error produced by a failed request.
 * @returns A rejected promise that propagates the error.
 *
 * @remarks
 * This handler is invoked for:
 * - HTTP errors with a response (4xx/5xx)
 * - Network errors (no response)
 * - Timeouts / aborts, depending on Axios configuration and environment
 *
 * Currently logs the error in development builds and rethrows it unchanged.
 * If you want consistent error shapes for consumers, transform the error here
 * into your {@link ApiError} type before rejecting.
 */
async function responseInterceptorOnRejected(error: AxiosError): Promise<never> {
  if (__DEV__) {
    console.error(`❌ [${error.status}] ${error.config?.url}`, error.message);
  }

  return Promise.reject(error);
}
