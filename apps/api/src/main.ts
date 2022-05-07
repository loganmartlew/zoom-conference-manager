import getApp from './app';
import { environment } from './environments/environment';
import { Logger } from './loaders/logger';

import 'reflect-metadata';

async function main() {
  const app = await getApp();
  const port = process.env.PORT || 3333;

  const server = app.listen(port, () => {
    Logger.info('--------------------------------------------------');
    Logger.info(`           Server running on port: ${port}           `);
    if (environment.mode === 'development') {
      Logger.info(`Base endpoint of the api is: http://localhost:${port}`);
    }
    Logger.info('--------------------------------------------------');
  });
  server.on('error', Logger.error);
}

main();
