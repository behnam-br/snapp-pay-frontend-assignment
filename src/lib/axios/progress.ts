import { AxiosProgressEvent } from 'axios';

/**
 * Normalized progress information derived from an Axios progress event.
 *
 * @remarks
 * Axios emits upload/download progress events that may or may not include a `total` value,
 * depending on whether the browser/server can determine the full content length.
 *
 * When `total` is not available, `percent` will be `undefined`.
 */
export type Progress = {
  /** Number of bytes transferred so far. */
  loaded: number;
  /** Total number of bytes expected, if known. */
  total?: number;
  /** Percentage complete (0–100), if `total` is known. */
  percent?: number;
};

/**
 * Converts an {@link AxiosProgressEvent} into a stable {@link Progress} shape.
 *
 * @param e - Axios progress event from `onUploadProgress` or `onDownloadProgress`.
 * @returns A normalized {@link Progress} object with `loaded`, optional `total`, and optional `percent`.
 *
 * @remarks
 * - `loaded` defaults to `0` when missing.
 * - `total` is omitted when unknown.
 * - `percent` is calculated only when `total` is a positive number.
 *
 * @example
 * ```ts
 * http.post('/upload', formData, {
 *   onUploadProgress: (e) => {
 *     const p = toProgress(e);
 *     console.log(p.percent); // e.g. 42 (or undefined if total unknown)
 *   },
 * });
 * ```
 */
export function toProgress(e: AxiosProgressEvent): Progress {
  const loaded = e.loaded ?? 0;
  const total = e.total ?? undefined;
  const percent = total && total > 0 ? Math.round((loaded / total) * 100) : undefined;
  return { loaded, total, percent };
}
