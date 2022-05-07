import { Express } from 'express';
import dotenvLoader from './dotenv';
import expressLoader from './express';
import logger from './logger';
import typeormLoader from './typeorm';

export default (app: Express) => {
  dotenvLoader();
  logger.info('Environment variables loaded');

  expressLoader(app);
  logger.info('Express app loaded and configured');

  typeormLoader();
  logger.info('Typeorm loaded and configured');
};
