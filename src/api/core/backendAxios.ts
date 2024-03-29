import axios from 'axios';
import { API } from '../../config';

// 인증된 요청
const authorizationRequest = axios.create({
  baseURL: API.BASE_URL,
});

authorizationRequest.interceptors.request.use((config) => {
  return Object.assign(config, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
});

authorizationRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn('[Axios] ', error);
    return Promise.reject(error);
  },
);

// 인증되지 않은 요청
const unAuthorizationRequest = axios.create({
  baseURL: API.BASE_URL,
});

unAuthorizationRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn('[Axios] ', error);
    return Promise.reject(error);
  },
);

export { authorizationRequest, unAuthorizationRequest };
