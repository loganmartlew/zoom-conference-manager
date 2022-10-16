import { Express, NextFunction, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import routes from '../routes';
import { Logger } from './logger';

export default (app: Express) => {
  app.use((req, res, next) => {
    try {
      next();
    } catch (error) {
      Logger.error(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        error,
      });
    }
  });

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use(routes);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    Logger.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: err,
    });
  });
};
