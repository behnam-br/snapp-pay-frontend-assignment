import axios from 'axios';

import {
  requestInterceptorOnFulfilled,
  requestInterceptorOnRejected,
  responseInterceptorOnFulfilled,
  responseInterceptorOnRejected,
} from '@/lib/axios/interceptors';

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
