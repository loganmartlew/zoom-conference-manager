import Axios, { AxiosRequestConfig } from 'axios';
import { inspect } from 'util';
import ZoomTokenService from '../services/ZoomTokenService';
import { Logger } from './logger';

export const axios = Axios.create({
  baseURL: 'https://api.zoom.us/v2',
});

axios.interceptors.request.use(
  async (config) => {
    const newConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${await ZoomTokenService.getToken()}`,
      },
    };

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Logger.error(inspect(error.response));
    return Promise.reject(error);
  }
);
