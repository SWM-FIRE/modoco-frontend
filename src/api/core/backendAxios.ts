import axios from 'axios';
import { API } from '../../config';

const request = axios.create({
  baseURL: API.BASE_URL,
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn('[Axios] ', error);
    return Promise.reject(error);
  },
);

export { request };
