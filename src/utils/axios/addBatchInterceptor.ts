// Add a request interceptor
// https://axios-http.com/docs/interceptors

import axios, {AxiosRequestConfig} from "axios";
import {BatchingConfig, UseBatchInterceptor} from "./_types";

const CancelToken = axios.CancelToken;

// TODO: Improve batch storage so it is fully managed by BatchInterceptor
const batchedDataByUrl: { [key: string]: any } = {};

const requestShouldBeBatched = (
    requestConfig: AxiosRequestConfig,
    batchingConfig: BatchingConfig
) => {
    // Check if url should be batched
    const shouldBatch = (batchingConfig?.urls?.find(batch =>
        batch.method === requestConfig.method &&
        batch.url === requestConfig.url
    ));
    if (!shouldBatch) {
        console.log("Request should not be batched", batchingConfig.urls[0].url, requestConfig.url)
    }
    return shouldBatch;
}

export const addBatchInterceptor: UseBatchInterceptor = (
    instance,
    batchingConfig
) => (
    handleBatching,
    resolveBatchConfig
) => {

    instance.interceptors.request.use(
        (requestConfig) => {
            const url = requestConfig.url as string;

            // Check if url should be batched
            if (
                !requestShouldBeBatched(requestConfig, batchingConfig)
            ) {
                return requestConfig;
            }

            if (batchedDataByUrl[url]) {
                // Batching is already in progress -> we execute batching function
                handleBatching(requestConfig, batchedDataByUrl);

                // Canceling request
                return {
                    ...requestConfig,
                    cancelToken: new CancelToken((cancel) => cancel('Batching repeating requests'))
                }
            } else {

                handleBatching(requestConfig, batchedDataByUrl);

                // Execute request with delay
                return new Promise(resolve => setTimeout(() => {

                    // Batching completed -> we execute resolving function
                    const updatedConfig = resolveBatchConfig(requestConfig, batchedDataByUrl);

                    // Clean up storage
                    delete batchedDataByUrl[url];
                    resolve(updatedConfig);
                }, batchingConfig.timeout));
            }
        }, (error) => {
            return Promise.reject(error);
        }
    );
}