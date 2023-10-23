/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const requestHandler: any = (config: AxiosRequestConfig) => {
  config.params = {
    ...config.params,
  };
  return config;
};

const responseErrorHandler = async (err: AxiosError) => {
  const data: any = err?.response?.data;
  const message = data?.message;

  if (message) throw new Error(message);
  return Promise.reject(err);
};

axiosInstance.interceptors.request.use(requestHandler, (err) =>
  Promise.reject(err),
);
axiosInstance.interceptors.response.use(
  (response: any) => response,
  responseErrorHandler,
);

export { axiosInstance as ApiClient };
