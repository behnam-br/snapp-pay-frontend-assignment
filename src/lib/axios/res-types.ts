/**
 * Standardized shape for successful API responses returned by the HTTP layer.
 *
 * @typeParam Data - The payload type returned by the server.
 *
 * @remarks
 * This type intentionally mirrors the subset of response information most application
 * code cares about:
 * - `status`: HTTP status code (e.g. 200)
 * - `message`: user-facing or server-provided message
 * - `data`: the typed payload
 *
 * Keeping responses in this shape helps avoid leaking Axios internals (headers, config, etc.)
 * into application state (e.g. React Query caches).
 */
export type ApiResponse<Data = unknown> = {
  /** HTTP status code (e.g. 200, 201, 204). */
  status: number;
  /** Human-readable message (e.g. status text or server message). */
  message: string;
  /** Response payload returned by the server. */
  data: Data;
};

/**
 * Standardized shape for failed API calls returned/rejected by the HTTP layer.
 *
 * @typeParam Data - Optional error payload type returned by the server (if any).
 *
 * @remarks
 * - `status` is `0` when no HTTP response was received (offline, timeout, cancel, setup errors).
 * - `code` provides a stable, app-level error classification (see {@link AxiosErrorCodeKeys}).
 * - `data` can hold a structured error body from the API when available.
 */
export interface ApiError<Data = unknown> {
  /** HTTP status code for API errors; `0` when unavailable (network/setup/cancel/timeout). */
  status: number;
  /** Human-readable error message suitable for display/logging. */
  message: string;
  /** App-level error code used for consistent handling across the app. */
  code?: AxiosErrorCode;
  /** Optional structured error body returned by the backend. */
  data?: Data;
}

/**
 * Application-level error code used to classify Axios failures.
 *
 * @remarks
 * The union includes known codes used by the app, plus `string` to allow:
 * - future expansion without breaking types
 * - backend-provided error codes (if you choose to pass them through)
 *
 * Prefer using {@link AxiosErrorCodeKeys} to reference the known codes consistently.
 */
export type AxiosErrorCode =
  | 'REQUEST_SETUP_ERROR'
  | 'API_ERROR'
  | 'NO_INTERNET'
  | 'SERVER_UNREACHABLE'
  | 'REQUEST_CANCELED'
  | 'REQUEST_TIMEOUT'
  | string;

/**
 * Canonical keys for {@link AxiosErrorCode}.
 *
 * @remarks
 * Use this enum instead of hardcoded strings to:
 * - avoid typos
 * - keep code completion strong
 * - ensure consistent comparisons in interceptors and UI logic
 */
export enum AxiosErrorCodeKeys {
  /** Error occurred while preparing the request (invalid config, interceptor throw, etc.). */
  REQUEST_SETUP_ERROR = 'REQUEST_SETUP_ERROR',
  /** Server returned an error response (HTTP response exists, often 4xx/5xx). */
  API_ERROR = 'API_ERROR',
  /** Device appears to be offline or has no internet connectivity. */
  NO_INTERNET = 'NO_INTERNET',
  /** Device is online but the server cannot be reached or did not respond. */
  SERVER_UNREACHABLE = 'SERVER_UNREACHABLE',
  /** Request was canceled (AbortController/CancelToken). */
  REQUEST_CANCELED = 'REQUEST_CANCELED',
  /** Request exceeded the configured timeout. */
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
}
