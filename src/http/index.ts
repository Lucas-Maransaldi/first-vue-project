import axios, { AxiosInstance } from 'axios';
import { Axios, Axios as axiosObservable } from 'axios-observable';

export const httpClientObservable: Axios = axiosObservable.create({
    baseURL: 'http://localhost:3000'
});

const httpClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

export default httpClient