/* eslint-disable no-console */
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const _axios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

_axios.interceptors.request.use(
  function (config) {
    return {
      ...config,
      params: {
        api_key: API_KEY,
        ...config.params,
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (process.env.NODE_ENV === 'development') {
      console.log(response.data);
    }
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default _axios;
