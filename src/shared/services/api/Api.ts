import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshToken, removeAccessToken } from './authService/AuthService';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

Api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

Api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return Api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const refreshTokenValue = localStorage.getItem('refreshToken');
            if (!refreshTokenValue) {
              throw new Error('Refresh token is missing');
            }
            const newToken: string = await refreshToken({ refresh: refreshTokenValue });
            Api.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
            processQueue(null, newToken);
            resolve(Api(originalRequest));
          } catch (err) {
            processQueue(err, null);
            removeAccessToken();
            reject(err);
          } finally {
            isRefreshing = false;
          }
        })();
      });
    }

    return Promise.reject(error);
  }
);


export default Api;