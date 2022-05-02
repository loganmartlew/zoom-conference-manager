import express from 'express';
import loaders from '../loaders';

const getApp = async () => {
  const app = express();

  loaders(app);

  return app;
};

export default getApp;
