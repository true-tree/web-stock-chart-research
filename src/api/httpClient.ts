import axios from "axios";
import { SERVICE_API_PORT, SERVICE_API_URL } from "./constants";
import {
  serviceErrorHandler,
  serviceRequestInterceptor,
  serviceResponseInterceptor,
} from "./helper";

const serviceInstance = axios.create({
  baseURL: SERVICE_API_URL + ":" + SERVICE_API_PORT,
});

serviceInstance.interceptors.request.use(
  serviceRequestInterceptor,
  serviceErrorHandler
);
serviceInstance.interceptors.response.use(
  serviceResponseInterceptor,
  serviceErrorHandler
);

export { serviceInstance };
