import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';

import {
  isAxiosApiError,
  isAxiosCanceledError,
  isAxiosNetworkError,
  isAxiosTimeoutError,
} from '@/lib/axios/predicates';
import { ApiError, ApiResponse, AxiosErrorCode, AxiosErrorCodeKeys } from '@/lib/axios/res-types';

/**
 * Axios response interceptor that normalizes successful responses into the app's {@link ApiResponse} shape.
 *
 * @param response - The raw Axios response.
 * @returns A normalized response containing only `status`, `message`, and `data`.
 *
 * @remarks
 * This ensures consumers don't need to work with `AxiosResponse` directly and helps keep
 * React Query caches free from Axios internals.
 *
 * The `message` is sourced from `response.statusText` by default.
 */
export function responseInterceptor(response: AxiosResponse): ApiResponse<unknown> {
  return { status: response.status, message: response.statusText, data: response.data };
}

/**
 * Axios error interceptor that converts any request failure into the app's {@link ApiError} shape.
 *
 * @param error - The Axios error thrown by a failed request.
 * @returns A normalized {@link ApiError} with a stable `code`, `status`, and user-facing `message`.
 *
 * @remarks
 * This interceptor delegates classification and normalization to {@link transformResponseError}.
 * After normalization, it triggers optional status-specific side effects (e.g. auth handling).
 *
 * Note: This function returns an {@link ApiError} object (it does not throw). The caller/interceptor
 * chain should reject with the returned error if desired.
 */
export async function errorInterceptor(error: AxiosError): Promise<ApiError<unknown>> {
  const apiError = await transformResponseError(error);

  switch (apiError.status) {
    case 401:
      handleUnauthorized();
      break;
    case 403:
      handleForbidden();
      break;
    case 503:
      handleServiceUnavailable();
      break;
  }

  return apiError;
}

/**
 * Classifies and normalizes any thrown value into an {@link ApiError}.
 *
 * @param error - The thrown value. May be an {@link AxiosError}, an {@link Error}, or an unknown value.
 * @returns A normalized {@link ApiError} describing the failure.
 *
 * @remarks
 * The normalization strategy follows a predictable priority order:
 * 1) {@link isAxiosCanceledError} → `REQUEST_CANCELED`
 * 2) {@link isAxiosTimeoutError} → `REQUEST_TIMEOUT`
 * 3) {@link isAxiosNetworkError} → `NO_INTERNET` or `SERVER_UNREACHABLE` (via {@link checkInternetConnection})
 * 4) {@link isAxiosApiError} → `API_ERROR` with `status` and `data` from the server response
 * 5) Fallback → `REQUEST_SETUP_ERROR` for non-Axios / setup / user-thrown errors
 *
 * This keeps consumer code simple: every failure is represented with a `code` from {@link AxiosErrorCodeKeys},
 * a numeric `status` (0 when unavailable), and a user-friendly `message`.
 */
async function transformResponseError(
  error: AxiosError | unknown | undefined | Error
): Promise<ApiError<unknown>> {
  if (isAxiosCanceledError(error)) {
    return {
      status: 0,
      code: AxiosErrorCodeKeys.REQUEST_CANCELED,
      message: getDefaultMessage(AxiosErrorCodeKeys.REQUEST_CANCELED),
    };
  }
  if (isAxiosTimeoutError(error)) {
    return {
      status: 0,
      code: AxiosErrorCodeKeys.REQUEST_TIMEOUT,
      message: getDefaultMessage(AxiosErrorCodeKeys.REQUEST_TIMEOUT),
    };
  }
  if (isAxiosNetworkError(error)) {
    const hasInternet = await checkInternetConnection();
    if (hasInternet) {
      return {
        status: 0,
        code: AxiosErrorCodeKeys.SERVER_UNREACHABLE,
        message: getDefaultMessage(AxiosErrorCodeKeys.SERVER_UNREACHABLE),
      };
    }
    return {
      status: 0,
      code: AxiosErrorCodeKeys.NO_INTERNET,
      message: getDefaultMessage(AxiosErrorCodeKeys.NO_INTERNET),
    };
  }
  if (isAxiosApiError(error)) {
    return {
      status: error.response.status,
      code: AxiosErrorCodeKeys.API_ERROR,
      message: error.message,
      data: error.response.data,
    };
  }

  return {
    status: 0,
    code: AxiosErrorCodeKeys.REQUEST_SETUP_ERROR,
    message: (error as unknown as Error).message
      ? (error as unknown as Error).message
      : getDefaultMessage(AxiosErrorCodeKeys.REQUEST_SETUP_ERROR),
  };
}

/**
 * Heuristically checks whether the user likely has internet connectivity.
 *
 * @returns `true` if connectivity appears available; otherwise `false`.
 *
 * @remarks
 * This function is used to distinguish:
 * - "No internet" (offline) from
 * - "Server unreachable" (online but cannot reach the backend)
 *
 * It uses:
 * - `navigator.onLine` as a quick signal, and
 * - a short `HEAD` request to a well-known endpoint, with a timeout via {@link AbortController}.
 */
async function checkInternetConnection(): Promise<boolean> {
  if (!navigator.onLine) {
    return false;
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch('https://www.google.com/generate_204', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return response.type === 'opaque' || response.ok;
  } catch {
    return false;
  }
}

/**
 * Returns a user-friendly default message for a given HTTP status or app-level error code.
 *
 * @param status - HTTP status code (e.g. 401) or an {@link AxiosErrorCode} / {@link AxiosErrorCodeKeys} entry.
 * @returns A user-facing message suitable for display.
 *
 * @remarks
 * For app-level failures (e.g. canceled, timeout, offline), this provides stable, localized-ready text.
 * For unknown statuses/codes, it falls back to a generic message.
 */
function getDefaultMessage(status: HttpStatusCode | AxiosErrorCode): string {
  const messages: Record<string, string> = {
    REQUEST_SETUP_ERROR: 'Failed to prepare request. Please try again later.',
    API_ERROR: 'An unexpected error occurred. Please try again later.',
    NO_INTERNET: 'No internet connection. Please check your network and try again.',
    SERVER_UNREACHABLE: 'Server is not responding. Please try again later.',
    REQUEST_CANCELED: 'Request was canceled.',
    REQUEST_TIMEOUT: 'Request timed out. Please try again.',
  };

  return messages[status] || `Request failed with status ${status}`;
}

/**
 * Handles HTTP 401 (Unauthorized) errors.
 *
 * @remarks
 * This is where you would typically trigger auth workflows such as:
 * - clearing tokens/session
 * - redirecting to login
 * - showing a "session expired" message
 *
 * Currently logs a warning in development builds.
 */
function handleUnauthorized(): void {
  if (__DEV__) {
    console.warn('🔐 Unauthorized');
  }
}

/**
 * Handles HTTP 403 (Forbidden) errors.
 *
 * @remarks
 * This is where you would typically show a permission error UI or redirect away from restricted pages.
 * Currently logs a warning in development builds.
 */
function handleForbidden(): void {
  if (__DEV__) {
    console.warn('🚫 Forbidden');
  }
}

/**
 * Handles HTTP 503 (Service Unavailable) errors.
 *
 * @remarks
 * This is where you could trigger maintenance mode UI, show a banner, or implement retry/backoff.
 * Currently logs a warning in development builds.
 */
function handleServiceUnavailable(): void {
  if (__DEV__) {
    console.warn('🔧 Service unavailable');
  }
}
