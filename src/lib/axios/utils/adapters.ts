import { AxiosError, AxiosProgressEvent, AxiosResponse, HttpStatusCode } from 'axios';

import {
  ApiError,
  ApiResponse,
  AxiosErrorCode,
  AxiosErrorCodeKeys,
} from '@/lib/axios/utils/api-types';
import {
  isAxiosApiError,
  isAxiosCanceledError,
  isAxiosNetworkError,
  isAxiosTimeoutError,
} from '@/lib/axios/utils/predicate-types';

export function responseAdapter(response: AxiosResponse): ApiResponse<unknown> {
  return { status: response.status, message: response.statusText, data: response.data };
}

export async function errorAdapter(error: AxiosError): Promise<ApiError<unknown>> {
  const apiError = await transformResponseError(error);

  return apiError;
}

export type Progress = {
  loaded: number;
  total?: number;
  percent?: number;
};

export function toProgress(e: AxiosProgressEvent): Progress {
  const loaded = e.loaded ?? 0;
  const total = e.total ?? undefined;
  const percent = total && total > 0 ? Math.round((loaded / total) * 100) : undefined;
  return { loaded, total, percent };
}

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

export function getDefaultMessage(status: HttpStatusCode | AxiosErrorCode): string {
  const messages: Record<string, string> = {
    REQUEST_SETUP_ERROR: 'Failed to prepare request. Please try again later.',
    API_ERROR: 'An unexpected error occurred. Please try again later.',
    INVALID_RESPONSE: 'Invalid response from server. Please try again later.',
    NO_INTERNET: 'No internet connection. Please check your network and try again.',
    SERVER_UNREACHABLE: 'Server is not responding. Please try again later.',
    REQUEST_CANCELED: 'Request was canceled.',
    REQUEST_TIMEOUT: 'Request timed out. Please try again.',
  };

  return messages[status] || `Request failed with status ${status}`;
}

export const invalidResponseError = {
  status: 0,
  code: AxiosErrorCodeKeys.INVALID_RESPONSE,
  message: getDefaultMessage(AxiosErrorCodeKeys.INVALID_RESPONSE),
};
