// Add a request interceptor
// https://axios-http.com/docs/interceptors

import axios, {AxiosInstance} from "axios";

export const addResponseInterceptor = (instance: AxiosInstance) =>
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (axios.isCancel(error)) {
                console.info(error.message);
                return new Promise(() => {});
            }

            return Promise.reject(error);
        }
    );