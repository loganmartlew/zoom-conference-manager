import { ApiResponse } from '@zoom-conference-manager/api-interfaces';
import { NextFunction, Request, Response } from 'express';

const responseFn = (json: ApiResponse<unknown>, res: Response) => {
  res.status(json.status);

  if (json.download) {
    return res.end(json.download);
  }

  return res.json(json);
};

export default (
  controller: (req: Request, res: Response) => Promise<ApiResponse<unknown>>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      responseFn(await controller(req, res), res);
    } catch (err) {
      next(err);
    }
  };
};
