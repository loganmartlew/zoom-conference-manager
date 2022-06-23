import { ApiResponse } from '@zoom-conference-manager/api-interfaces';
import { Response } from 'express';

export default (json: ApiResponse<unknown>, res: Response) => {
  return res.status(json.status).json(json);
};
