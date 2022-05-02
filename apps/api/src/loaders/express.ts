import { json, Express } from 'express';
import cors from 'cors';
import routes from '../routes';

export default (app: Express) => {
  app.use(cors());
  app.use(json());

  app.use(routes);
};
