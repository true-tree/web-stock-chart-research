import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const serviceRequestInterceptor = (config: AxiosRequestConfig) => {
  console.log("Request Interceptor", config);
  const token =
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken");
  if (token) {
    config.headers!.Authorization = token;
  }
  return config;
};

export const serviceResponseInterceptor = (response: AxiosResponse) => {
  console.log(`Response Interceptor`, response);
  return response.data;
};

export const serviceErrorHandler = (error: AxiosError) => {
  console.log(`error : `, error);
  // promise가 실패(거부)되면 error를 반환
  return Promise.reject(error);
};
