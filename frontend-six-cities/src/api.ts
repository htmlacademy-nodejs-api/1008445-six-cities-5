import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import request from 'axios';
import { toast } from 'react-toastify';
import { Token } from './utils';
import { ValidationErrorField } from './types/error';
import { HttpCode } from './const';

const BACKEND_URL = 'http://localhost:5001';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = Token.get();

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: Error) => {
      toast.dismiss();
      if (!request.isAxiosError(error)) {
        toast.warn(error.message);
        throw error;
      }

      const { response } = error;
      if (response) {
        switch (response.status) {
          case HttpCode.BadRequest:
            (response.data.details)
              ? response.data.details
                .forEach(
                  (detail: ValidationErrorField) =>
                    detail.messages
                      .forEach(
                        (message: string) => toast.info(message),
                      ),
                )
              : toast.info(response.data.message);
            break;
          case HttpCode.NoAuth:
            toast.info(response.data.message ? response.data.message : response.data.error);
            break;
          case HttpCode.NotFound:
            toast.info(response.data.message ? response.data.message : response.data.error);
            break;
          case HttpCode.Conflict:
            toast.info(response.data.message);
            break;
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
