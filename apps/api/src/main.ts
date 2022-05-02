/* eslint-disable no-console */
import getApp from './app';
import { environment } from './environments/environment';

async function main() {
  const app = await getApp();
  const port = process.env.PORT || 3333;

  const server = app.listen(port, () => {
    console.log('--------------------------------------------------');
    console.log(`           Server running on port: ${port}           `);
    if (environment.mode === 'development') {
      console.log(`Base endpoint of the api is: http://localhost:${port}`);
    }
    console.log('--------------------------------------------------');
  });
  server.on('error', console.error);
}
