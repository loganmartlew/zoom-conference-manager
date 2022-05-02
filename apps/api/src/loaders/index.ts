/* eslint-disable no-console */
import { Express } from 'express';
import expressLoader from './express';

export default (app: Express) => {
  expressLoader(app);
  console.info('Express app loaded and configured');
};
