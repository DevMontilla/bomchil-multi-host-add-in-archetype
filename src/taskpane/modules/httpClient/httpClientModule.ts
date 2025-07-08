import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import HttpStatusCode from "./httpStatusCodes";
import { HttpParams, HttpResponse, IHttpClient } from "./interfaces";
import { BASE_URL } from "../../config";
import { DependencyManager } from "../../dependencyManager";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export const httpClientModuleInitialize = (
  dependencyManager: DependencyManager
): void => {
  const axiosInstance = createAxiosInstance();
  configRetryStrategy(axiosInstance);
  configRequestInterceptor(axiosInstance);
  configResponseInterceptor(axiosInstance);
  const httpClient = getHttpClient(axiosInstance);
  dependencyManager.register("httpClient", httpClient);
};

/**
 * @description creates a new instance of axios
 **/
const createAxiosInstance = () => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
  };
  return axios.create(config);
};

/**
 * @description retry strategy for axios
 **/
const configRetryStrategy = (axiosInstance: AxiosInstance) => {
  axiosRetry(axiosInstance as any, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
  });
};

/**
 * @description intercept every request and add custom headers
 **/
const configRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (request) => {
    const token = localStorage.getItem("token");
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    if (request.data) {
      //console.info('Request Params', request.data);
    }
    return request;
  });
};

/**
 * @description intercept every response and check if it has error
 **/
const configResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      if (!response) {
        redirectToErrorScreen();
        throw undefinedResponseError;
      } else if (isServerError(response)) {
        redirectToErrorScreen();
        throw toHttpResponse(response);
      } else if (isBusinessError(response)) {
        throw toHttpResponse(response);
      } else {
        return response;
      }
    },
    (_) => {
      // TODO: Reemplazar logs por manejo de errores adecuado
      return Promise.reject(toGeneralErrorResponse(_.response));
    }
  );
};

/**
 * @description redirects to error screen
 **/
const redirectToErrorScreen = (error?: unknown): void => {
  console.error(error);
  // TODO: Implementar navegación a la pantalla de error según la arquitectura de la app
};

/**
 * @description creates http response
 **/
const createHttpResponse = (
  code: number,
  data: unknown,
  error: unknown,
  status: boolean,
  statusText?: string
): HttpResponse => {
  return {
    code,
    data,
    error: {
      message: status ? (error as { message: string }).message : (error as { message?: string }).message ?? "Undefined error",
    },
    status,
    statusText,
  } as HttpResponse;
};

/**
 * @description http response in case of undefined response of part of axios
 **/
const undefinedResponseError: HttpResponse = createHttpResponse(
  -1,
  {},
  "Undefined response",
  false
);

/**
 * @description converts axios response to http response
 **/
const toHttpResponse = (response: AxiosResponse): HttpResponse => {
  const data = response.data;
  return createHttpResponse(
    response.status,
    data.data,
    data.message,
    data.success,
    data.statusText
  );
};

/**
 * @description creates general error response
 **/
const toGeneralErrorResponse = (error: AxiosResponse): HttpResponse =>
  createHttpResponse(error.status, error.data, error.statusText, false);

/**
 * @description check if response is server error
 **/
const isServerError = (response: AxiosResponse): boolean => {
  return response.status >= HttpStatusCode.INTERNAL_SERVER_ERROR;
};

/**
 * @description check if response is business error
 **/
const isBusinessError = (response: AxiosResponse): boolean => {
  return response.status >= HttpStatusCode.BAD_REQUEST;
};

/**
 * @param {string}  url url to request
 * @param {object}  params key value pair of params
 * @returns {string} url concatenated with query params
 **/
const getFullUrl = (url = "", params?: HttpParams) => {
  let queryParams = "";
  if (params && Object.keys(params).length > 0) {
    queryParams = `?${Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&")}`;
  }
  return `${url}${queryParams}`;
};

/**
 * @param {AxiosInstance}  axiosInstance axios instance
 * @param {HttpMethod}  httpMethod http method to use
 * @param {string}  url url to request
 * @param {object}  params key value pair of params
 * @param {object}  headers key value pair of headers
 * @param {string}  contentType content type of request
 * @returns {string} url concatenated with query params
 **/
const checkInternetConnectionAndExecuteApiCall = async (
  axiosInstance: AxiosInstance,
  httpMethod: HttpMethod,
  url = "",
  params = {},
  headers = {},
  contentType = "application/json"
): Promise<HttpResponse> => {
  const isFormData = params instanceof FormData;
  const customHeaders = {
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": contentType }), // Dejar que el navegador maneje multipart/form-data
      ...headers,
    },
  };

  if (httpMethod === HttpMethod.GET) {
    return axiosInstance.get(getFullUrl(url, params), customHeaders);
  }

  if (httpMethod === HttpMethod.DELETE) {
    return axiosInstance.delete(getFullUrl(url), customHeaders);
  }

  if (httpMethod === HttpMethod.PUT) {
    return axiosInstance.put(getFullUrl(url), params, customHeaders);
  }

  return axiosInstance.post(getFullUrl(url), params, customHeaders);
};

/**
 * @param {AxiosInstance} axiosInstance axios instance
 * @returns {IHttpClient} http client
 **/
const getHttpClient = (axiosInstance: AxiosInstance): IHttpClient => {
  return {
    get: (
      url = "",
      params = {},
      headers = {},
      contentType = "application/json"
    ) => {
      return checkInternetConnectionAndExecuteApiCall(
        axiosInstance,
        HttpMethod.GET,
        url,
        params,
        headers,
        contentType
      );
    },
    post: (
      url = "",
      params = {},
      headers = {},
      contentType = "application/json"
    ) => {
      return checkInternetConnectionAndExecuteApiCall(
        axiosInstance,
        HttpMethod.POST,
        url,
        params,
        headers,
        contentType
      );
    },
    delete: (
      url = "",
      params = {},
      headers = {},
      contentType = "application/json"
    ) => {
      return checkInternetConnectionAndExecuteApiCall(
        axiosInstance,
        HttpMethod.DELETE,
        url,
        params,
        headers,
        contentType
      );
    },
    put: (
      url = "",
      params = {},
      headers = {},
      contentType = "application/json"
    ) => {
      return checkInternetConnectionAndExecuteApiCall(
        axiosInstance,
        HttpMethod.PUT,
        url,
        params,
        headers,
        contentType
      );
    },
  };
};
