/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from '@zoom-conference-manager/errors';
import Axios from 'axios';
import { environment } from '../environments/environment';

export const axios = Axios.create({
  baseURL: environment.apiUrl,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }

    if ((error as any).response?.data?.error instanceof ApiError) {
      const apiError = (error as any).response.data.error;
      return Promise.reject(apiError);
    }

    return Promise.reject(error);
  }
);
