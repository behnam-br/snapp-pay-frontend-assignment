export type ApiResponse<Data = unknown> = {
  status: number;
  message: string;
  data: Data;
};

export interface ApiError<Data = unknown> {
  status: number;
  message: string;
  code?: AxiosErrorCode;
  data?: Data;
}

export type AxiosErrorCode =
  | 'REQUEST_SETUP_ERROR'
  | 'API_ERROR'
  | 'NO_INTERNET'
  | 'SERVER_UNREACHABLE'
  | 'REQUEST_CANCELED'
  | 'REQUEST_TIMEOUT'
  | string;

export enum AxiosErrorCodeKeys {
  REQUEST_SETUP_ERROR = 'REQUEST_SETUP_ERROR',
  API_ERROR = 'API_ERROR',
  NO_INTERNET = 'NO_INTERNET',
  SERVER_UNREACHABLE = 'SERVER_UNREACHABLE',
  REQUEST_CANCELED = 'REQUEST_CANCELED',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
}
