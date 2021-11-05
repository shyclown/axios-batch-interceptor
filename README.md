# Axios Batch Interceptor Example

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Mock server
In the project was crated simple mock server that will let you test the batching function. 
However you will need ot make some changes for it to work.
```ts
// /src/utils/axios/index.ts

// Uncoment this baseUrl and remove default baseURL in the same file
const baselURL = 'http://localhost:8000/';
```
After this change when you start the server `npm run start` axios will request data from your local server which is set 
up to work with the example
```nodejs
node server
```

# How to create custom batch interceptor
## Custom batch interceptors

Custom batch interceptor requires two functions and one config object. New batch interceptor is created by calling
`addCustomBatchInterceptor` function.

```ts
const client = (): AxiosInstance => {
    const config = {
        baseURL,
        headers: {}
    };
    const instance = axios.create(config);
    
    addCustomBatchInterceptor(instance, batchingConfig); // <--- Custom Batching Interceptor
    
    addResponseInterceptor(instance); // Response interceptor to clean up cancellation errors

    return instance;
};

const apiClient = client();
```
Add custom interceptor is wrapper for universal `addBatchInterceptor` to which we send customised functions and config.
```ts
export const addCustomBatchInterceptor = (
    instance: AxiosInstance,
    batchingConfig: BatchingConfig // <-- Batching config
) => addBatchInterceptor(
    instance,
    batchingConfig
)(
    handleCustomBatching, // <-- Funciton that handles batching
    resolveCustomBatch // <-- Function that creates final request config
);
```

### Batching config
You need to specify the batching interval and endpoints which should be batched. 
This config needs to be passed to Interceptor as shown above.
```ts
const batchingConfig: BatchingConfig = {
    timeout: 300,
    // setup which endpoints should be batching
    urls: [{method: 'get', url: '/api/files/batch'}],
}
```

### Handle Batching Function
Handle batching function is executed every time when request is made. You can capture request data in this 
function
```ts
export type HandleBatching = (
    requestConfig: AxiosRequestConfig,
    storage?: any 
) => void;

const storedDataByUrl = {}; // <-- store batched data

const handleCustomBatching: HandleBatching = (requestConfig, storage) => {
    // You can use local storage or you can use the Batch Interceptor storage
    // but you will need to be carefull and use only [requestConfig.url] as key
}
```
### Resolve Batch Function
The resolve batch function is executed once when the batching ends after the timeout, in this function you can use the stored data 
and manipulate final request that will be sent to server. Function needs to return Axios config.
```ts
export type ResolveBatchConfig = (
    requestConfig: AxiosRequestConfig,
    storage?: any
) => AxiosRequestConfig;

const resolveCustomBatch: ResolveBatchConfig = (
    requestConfig,
    storage // <-- not used in this example
) => {
    const url = requestConfig.url as string;

    // Final update of executed config example with ids array in get method
    return {
        ...requestConfig,
        params: {
            ...requestConfig.params,
            ids: [...storedDataByUrl[url]]
        }
    };

    // You should clean up batch here and then return config, but
    // If storage is used it will be cleaned up automatically
    // Example:
    
    //   const newConfig = {...new data}
    //   delete storedDataByUrl[url]; <-- clean up after data is used in new config
    //  return newConfig;
    

}
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Learn More about React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
