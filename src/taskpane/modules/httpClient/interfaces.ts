export interface HttpParams {
  [key: string]: unknown;
}

export interface HttpHeaders {
  [key: string]: unknown;
}

export interface HttpResponse {
  code: number;
  data: unknown;
  error?: HttpError;
  status?: boolean;
  statusText?: string;
  success: boolean;
  message: string;
}

export interface IHttpClient {
  get: (
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders,
    contentType?: string,
  ) => Promise<HttpResponse>;
  post: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string,
  ) => Promise<HttpResponse>;
  delete: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string,
  ) => Promise<HttpResponse>;
  put: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string,
  ) => Promise<HttpResponse>;
}

interface HttpError {
  message: string;
}
