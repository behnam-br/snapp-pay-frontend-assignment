import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { ApiError } from '@/lib/axios/api-types';

export function requestInterceptorOnFulfilled(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  if (__DEV__) {
    console.log(`🌐 [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
  }

  return config;
}

export function requestInterceptorOnRejected(err: unknown): Promise<ApiError> {
  if (__DEV__) {
    let message = 'unknown error';
    if (err && typeof err === 'object' && 'message' in err) {
      message = (err as AxiosError).message;
    }
    console.error('❌ Request interceptor error', message);
  }

  return Promise.reject(err);
}

export function responseInterceptorOnFulfilled(response: AxiosResponse): AxiosResponse {
  if (__DEV__) {
    console.log(`✅ [${response.status}] ${response.config.url}`);
  }

  return response;
}

export async function responseInterceptorOnRejected(error: AxiosError): Promise<never> {
  if (__DEV__) {
    console.error(`❌ [${error.status}] ${error.config?.url}`, error.message);
  }

  return Promise.reject(error);
}
