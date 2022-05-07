import getApp from './app';
import { environment } from './environments/environment';
import logger from './loaders/logger';

import 'reflect-metadata';

async function main() {
  const app = await getApp();
  const port = process.env.PORT || 3333;

  const server = app.listen(port, () => {
    logger.info('--------------------------------------------------');
    logger.info(`           Server running on port: ${port}           `);
    if (environment.mode === 'development') {
      logger.info(`Base endpoint of the api is: http://localhost:${port}`);
    }
    logger.info('--------------------------------------------------');
  });
  server.on('error', logger.error);
}

main();
