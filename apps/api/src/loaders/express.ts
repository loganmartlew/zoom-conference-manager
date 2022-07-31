import { Express } from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import routes from '../routes';

export default (app: Express) => {
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use(routes);
};
