import { ApiResponse } from '@zoom-conference-manager/api-interfaces';
import { Request, Response } from 'express';

const responseFn = (json: ApiResponse<unknown>, res: Response) => {
  return res.status(json.status).json(json);
};

export default (
  controller: (req: Request) => Promise<ApiResponse<unknown>>
) => {
  return async (req: Request, res: Response) =>
    responseFn(await controller(req), res);
};