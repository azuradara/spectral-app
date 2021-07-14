import axios from 'axios';

axios.interceptors.request.use(
  (request) => {
    request.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
      'token'
    )}`;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
