import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { ApiError } from '@/lib/axios/res-types';

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

export const http = createHttpClient();

function requestInterceptorOnFulfilled(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  if (__DEV__) {
    console.log(`🌐 [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
  }

  return config;
}

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

function responseInterceptorOnFulfilled(response: AxiosResponse): AxiosResponse {
  if (__DEV__) {
    console.log(`✅ [${response.status}] ${response.config.url}`);
  }

  return response;
}

async function responseInterceptorOnRejected(error: AxiosError): Promise<never> {
  if (__DEV__) {
    console.error(`❌ [${error.status}] ${error.config?.url}`, error.message);
  }

  return Promise.reject(error);
}
