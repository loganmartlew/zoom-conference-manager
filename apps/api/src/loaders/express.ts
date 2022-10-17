import { ApiResponse } from '@zoom-conference-manager/api-interfaces';
import { ApiError } from '@zoom-conference-manager/errors';
import { Express, NextFunction, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import routes from '../routes';
import { Logger } from './logger';

export default (app: Express) => {
  app.use((req, res, next) => {
    try {
      next();
    } catch (error) {
      Logger.error(error);

      let apiError: ApiError;

      if (error instanceof ApiError) {
        apiError = error;
      } else {
        apiError = new ApiError(error, 1000, null);
      }

      const response: ApiResponse<never> = {
        status: apiError.statusCode,
        message: apiError.message,
        error: apiError,
      };

      res.status(apiError.statusCode).json(response);
    }
  });

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use(routes);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    Logger.error(error);

    let apiError: ApiError;

    if (error instanceof ApiError) {
      apiError = error;
    } else {
      apiError = new ApiError(error, 1000, null);
    }

    const response: ApiResponse<never> = {
      status: apiError.statusCode,
      message: apiError.message,
      error: apiError,
    };

    res.status(apiError.statusCode).json(response);
  });
};
