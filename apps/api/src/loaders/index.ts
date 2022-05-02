/* eslint-disable no-console */
import { Express } from 'express';
import dotenvLoader from './dotenv';
import expressLoader from './express';
import typeormLoader from './typeorm';

export default (app: Express) => {
  dotenvLoader();
  console.info('Environment variables loaded');

  expressLoader(app);
  console.info('Express app loaded and configured');

  typeormLoader();
  console.info('Typeorm loaded and configured');
};
