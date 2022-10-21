import axios from 'axios';
import { API } from '../../config';

const youtubeAxios = axios.create({
  baseURL: API.YOUTUBE,
});

// add youtube key in params
youtubeAxios.interceptors.request.use((config) => {
  return Object.assign(config, {
    params: {
      ...config.params,
      key: process.env.REACT_APP_YOUTUBE_KEY,
    },
  });
});

youtubeAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn('[Axios] ', error);
    return Promise.reject(error);
  },
);

const thumbnailAxios = axios.create({
  baseURL: API.YOUTUBE_THUMBNAIL,
});

// thumbnailAxios.interceptors.request.use((config) => {
//   return Object.assign(config, {
//     params: {
//       ...config.params,
//       key: process.env.REACT_APP_YOUTUBE_KEY,
//     },
//   });
// });

thumbnailAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn('[Axios] ', error);
    return Promise.reject(error);
  },
);

export { youtubeAxios, thumbnailAxios };
