import {AxiosInstance, AxiosRequestConfig} from "axios";

export type BatchingConfig = {
    timeout: number,
    urls: { method:string, url: string }[]
}

export type HandleBatching = (
    requestConfig: AxiosRequestConfig,
    storage?: any
) => void;

export type ResolveBatchConfig = (
    requestConfig: AxiosRequestConfig,
    storage?: any
) => AxiosRequestConfig;

export type UseBatchInterceptor = (
    instance: AxiosInstance,
    batchingConfig: BatchingConfig
) => (
    handleBatching: HandleBatching,
    resolveBatchConfig: ResolveBatchConfig
) => void