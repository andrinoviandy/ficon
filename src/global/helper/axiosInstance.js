// import axios from 'axios';
// import { getCookies, removeCookies } from './cookie';

// const baseApiHub = process.env.REACT_APP_API_URL;
// // const baseApi = process.env.REACT_APP_BASE_URL;
// const baseApi = process.env.REACT_APP_BASE_URL_LOCAL;
// // const baseApi = 'http://173.212.225.28:3000/api/v1/costrack';
// const accountAccess = getCookies('accountAccess');

// export const apiHub = axios.create({
//   baseURL: baseApiHub,
// });

// export const api = axios.create({
//   baseURL: baseApi,
//   headers: {
//     'Authorization': accountAccess,
//   },
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {

//     if (
//       error.response?.data?.code === "SESSION_EXPIRED"
//     ) {

//       removeCookies("loginData");
//       removeCookies("accountAccess");

//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

import axios from 'axios';
import { getCookies, removeCookies } from './cookie';

const baseApi = process.env.REACT_APP_BASE_URL_LOCAL;

export const api = axios.create({
  baseURL: baseApi,
  withCredentials: true,
});

// Selalu ambil token terbaru
api.interceptors.request.use((config) => {

  const token = getCookies("accountAccess");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.data?.code === "SESSION_EXPIRED") {

      removeCookies("loginData");
      removeCookies("accountAccess");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);