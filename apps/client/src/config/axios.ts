/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from '@zoom-conference-manager/api-interfaces';
import { ApiError } from '@zoom-conference-manager/errors';
import Axios, { AxiosError } from 'axios';
import { environment } from '../environments/environment';

export const axios = Axios.create({
  baseURL: environment.apiUrl,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<ApiResponse<never>>) => {
    if (error.response?.data.error) {
      const e = error.response.data.error as ApiError;
      return Promise.reject(e);
    }

    return Promise.reject(new ApiError(error, 1000, null));
  }
);
