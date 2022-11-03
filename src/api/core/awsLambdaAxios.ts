import axios from 'axios';
import { API } from '../../config';

const awsRequest = axios.create({
  baseURL: API.INVITE,
});

awsRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn('[Axios] ', error);
    return Promise.reject(error);
  },
);

export { awsRequest };
