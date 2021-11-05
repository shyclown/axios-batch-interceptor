import { AxiosInstance } from "axios";
import { addBatchInterceptor } from "./addBatchInterceptor";
import { BatchingConfig, HandleBatching, ResolveBatchConfig, } from "./_types";

const handleFileIdsBatching: HandleBatching = (
    requestConfig,
    storage
) => {
    const url = requestConfig.url as string;

    // You can create new storage or you can use the Batch Interceptor storage
    // which will clean up automatically for [url] if url used as key
    // TODO: Improve batch storage so it is fully managed by BatchInterceptor

    // Create set if nothing in storage
    if (!storage[url]) { storage[url] = new Set(); }



    const ids = requestConfig.params.ids;
    ids?.forEach((id: string) => storage[url].add(id));
}

const resolveFileIdsBatch: ResolveBatchConfig = (
    requestConfig,
    storage
) => {
    const url = requestConfig.url as string;

    // Final update of executed config
    return {
        ...requestConfig,
        params: {
            ...requestConfig.params,
            ids: [...storage[url]]
        }
    };

    // You should clean up batch here and then return config, but
    // If storage is used it will be cleaned up automatically
    // Example:

    /*
        const newConfig = {}
        delete storage[url];
        return newConfig;
    */

}

export const addFileBatchInterceptor = (
    instance: AxiosInstance,
    batchingConfig: BatchingConfig
) => addBatchInterceptor(
    instance,
    batchingConfig
)(
    handleFileIdsBatching,
    resolveFileIdsBatch
);




