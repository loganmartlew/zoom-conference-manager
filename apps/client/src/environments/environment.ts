// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import IEnvironment from './IEnvironment';

export const environment: IEnvironment = {
  production: false,
  mode: 'development',
  apiUrl: 'http://localhost:3333',
};
