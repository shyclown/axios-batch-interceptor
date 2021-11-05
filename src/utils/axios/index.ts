import axios, { AxiosInstance } from 'axios';


const baseURL = 'https://europe-west1-quickstart-1573558070219.cloudfunctions.net/file-batch-api';

// local server can be run by command: "node server"
// const baselURL = 'http://localhost:8000/';

const client = (): AxiosInstance => {
    const config = {
        baseURL,
        headers: {}
    };
    const instance = axios.create(config);
    return instance;
};

const apiClient = client();

export default apiClient;