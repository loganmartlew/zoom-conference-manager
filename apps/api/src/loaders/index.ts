import { Express } from 'express';
import dotenvLoader from './dotenv';
import expressLoader from './express';
import { Logger } from './logger';
import typeormLoader from './typeorm';

export default (app: Express) => {
  dotenvLoader();
  Logger.info('Environment variables loaded');

  expressLoader(app);
  Logger.info('Express app loaded and configured');

  typeormLoader();
  Logger.info('Typeorm loaded and configured');
};
