import axios, { AxiosError } from 'axios';

/**
 * Narrowed Axios error shape for canceled requests.
 *
 * @remarks
 * Depending on Axios version/adapter, canceled requests may present with:
 * - `axios.isCancel(err) === true` (especially for legacy CancelToken)
 * - `code === 'ERR_CANCELED'` (common for AbortSignal cancellations)
 * - `name === 'CanceledError'`
 * - a legacy/internal `__CANCEL__` marker
 */
type AxiosCanceledError = AxiosError & {
  code?: 'ERR_CANCELED';
  name?: 'CanceledError';
};

/**
 * Type predicate that checks whether an unknown value is an Axios cancellation error.
 *
 * @param err - Unknown value caught from Axios or application code.
 * @returns `true` if the value represents a canceled Axios request.
 *
 * @remarks
 * This guard is intentionally defensive to cover both:
 * - AbortController/`signal` cancellations (Axios v1)
 * - CancelToken cancellations (deprecated but still encountered)
 *
 * Use this to suppress global error handling/toasts for user-initiated cancellations.
 */
export function isAxiosCanceledError(err: unknown): err is AxiosCanceledError {
  return (
    axios.isCancel(err) ||
    (axios.isAxiosError(err) &&
      (err.code === 'ERR_CANCELED' ||
        err.name === 'CanceledError' ||
        (err as unknown as { __CANCEL__: boolean }).__CANCEL__ === true))
  );
}

/**
 * Narrowed Axios error shape for request timeouts.
 *
 * @remarks
 * In Axios, timeouts are commonly surfaced as `code: 'ECONNABORTED'`.
 * Some environments/adapters may use `ETIMEDOUT`.
 */
export type AxiosTimeoutError = AxiosError & {
  code?: 'ECONNABORTED' | 'ETIMEDOUT';
};

/**
 * Type predicate that checks whether an unknown value is an Axios timeout error.
 *
 * @param err - Unknown value caught from Axios or application code.
 * @returns `true` if the value represents a request timeout.
 *
 * @remarks
 * This guard:
 * - Excludes cancellations via {@link isAxiosCanceledError}
 * - Accepts known timeout codes (`ECONNABORTED`, `ETIMEDOUT`)
 * - Falls back to a message check containing `"timeout"` for compatibility
 */
export function isAxiosTimeoutError(err: unknown): err is AxiosTimeoutError {
  if (!axios.isAxiosError(err)) return false;
  if (isAxiosCanceledError(err)) return false;

  const code = err.code;
  if (code === 'ECONNABORTED' || code === 'ETIMEDOUT') return true;

  const msg = (err.message || '').toLowerCase();
  return msg.includes('timeout');
}

/**
 * Narrowed Axios error shape for API/HTTP errors where a response was received.
 *
 * @remarks
 * This includes server responses with status codes such as 4xx and 5xx.
 */
export type AxiosApiError = AxiosError & {
  response: NonNullable<AxiosError['response']>;
};

/**
 * Type predicate that checks whether an unknown value is an Axios HTTP/API error.
 *
 * @param err - Unknown value caught from Axios or application code.
 * @returns `true` if the value is an {@link AxiosError} with a non-null `response`.
 *
 * @remarks
 * A truthy `response` indicates the server returned an HTTP response
 * (even if it indicates failure, e.g. 400/401/500).
 */
export function isAxiosApiError(err: unknown): err is AxiosApiError {
  return axios.isAxiosError(err) && !!err.response;
}

/**
 * Narrowed Axios error shape for "network error" cases where no HTTP response exists.
 *
 * @remarks
 * In browsers, Axios often uses the message `"Network Error"` for cases like:
 * - offline / lost connectivity
 * - DNS failures
 * - blocked requests (e.g., CORS)
 * - connection interruptions
 *
 * This type represents the common case where:
 * - `response` is undefined, and
 * - `message` equals `"Network Error"`.
 */
export type AxiosNetworkError = AxiosError & {
  response?: undefined;
  message: 'Network Error';
};

/**
 * Type predicate that checks whether an unknown value is an Axios "Network Error".
 *
 * @param err - Unknown value caught from Axios or application code.
 * @returns `true` if the value is an Axios error with no response and message `"Network Error"`.
 *
 * @remarks
 * This guard excludes:
 * - cancellations via {@link isAxiosCanceledError}
 * - timeouts via {@link isAxiosTimeoutError}
 *
 * If you need to distinguish "no internet" vs "server unreachable", pair this
 * with a connectivity check (e.g. `navigator.onLine` + a lightweight fetch probe).
 */
export function isAxiosNetworkError(err: unknown): err is AxiosNetworkError {
  return (
    axios.isAxiosError(err) &&
    !err.response &&
    err.message === 'Network Error' &&
    !isAxiosCanceledError(err) &&
    !isAxiosTimeoutError(err)
  );
}
