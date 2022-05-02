/* eslint-disable no-console */
import { Express } from 'express';
import expressLoader from './express';
import typeormLoader from './typeorm';

export default (app: Express) => {
  expressLoader(app);
  console.info('Express app loaded and configured');

  typeormLoader();
  console.info('Typeorm loaded and configured');
};
