import axios, { AxiosError } from 'axios';

type AxiosCanceledError = AxiosError & {
  code?: 'ERR_CANCELED';
  name?: 'CanceledError';
};

export function isAxiosCanceledError(err: unknown): err is AxiosCanceledError {
  return (
    axios.isCancel(err) ||
    (axios.isAxiosError(err) &&
      (err.code === 'ERR_CANCELED' ||
        err.name === 'CanceledError' ||
        (err as unknown as { __CANCEL__: boolean }).__CANCEL__ === true))
  );
}

export type AxiosTimeoutError = AxiosError & {
  code?: 'ECONNABORTED' | 'ETIMEDOUT';
};

export function isAxiosTimeoutError(err: unknown): err is AxiosTimeoutError {
  if (!axios.isAxiosError(err)) return false;
  if (isAxiosCanceledError(err)) return false;

  const code = err.code;
  if (code === 'ECONNABORTED' || code === 'ETIMEDOUT') return true;

  const msg = (err.message || '').toLowerCase();
  return msg.includes('timeout');
}

export type AxiosApiError = AxiosError & {
  response: NonNullable<AxiosError['response']>;
};

export function isAxiosApiError(err: unknown): err is AxiosApiError {
  return axios.isAxiosError(err) && !!err.response;
}

export type AxiosNetworkError = AxiosError & {
  response?: undefined;
  message: 'Network Error';
};

export function isAxiosNetworkError(err: unknown): err is AxiosNetworkError {
  return (
    axios.isAxiosError(err) &&
    !err.response &&
    err.message === 'Network Error' &&
    !isAxiosCanceledError(err) &&
    !isAxiosTimeoutError(err)
  );
}
