/* eslint-disable no-console */
import { Express } from 'express';
import dotenvLoader from './dotenv';
import expressLoader from './express';
import typeormLoader from './typeorm';

export default async (app: Express) => {
  await dotenvLoader();
  console.info('Environment variables loaded');

  await expressLoader(app);
  console.info('Express app loaded and configured');

  await typeormLoader();
  console.info('Typeorm loaded and configured');
};
