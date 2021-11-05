import axios, { AxiosInstance } from 'axios';
import {addFileBatchInterceptor} from "./addFileBatchInterceptor";
import {addResponseInterceptor} from "./addResponseInterceptor";
import {BatchingConfig} from "./_types";

const baseURL = 'https://europe-west1-quickstart-1573558070219.cloudfunctions.net/file-batch-api';

// local server can be run by command: "node server"
// const baselURL = 'http://localhost:8000/';

const batchingConfig: BatchingConfig = {
    timeout: 300,
    // setup which endpoints should be batching
    urls: [{method: 'get', url: '/api/files/batch'}],
}

const client = (): AxiosInstance => {
    const config = {
        baseURL,
        headers: {}
    };
    const instance = axios.create(config);

    // Batching files if url should be batched based on config
    addFileBatchInterceptor(instance, batchingConfig); // Batching files

    addResponseInterceptor(instance); // To clean up cancellation errors

    return instance;
};

const apiClient = client();

export default apiClient;