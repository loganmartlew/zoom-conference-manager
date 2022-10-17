import { ApiError } from '@zoom-conference-manager/errors';
import { DataSource } from 'typeorm';
import { db } from '../config';
import { Logger } from './logger';
import entities from '../entities';
import { environment } from '../environments/environment';

export default async () => {
  const dbVars = db();

  const prodOptions = environment.production
    ? {
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : {};

  const dataSource = new DataSource({
    type: 'postgres',
    host: dbVars.host,
    port: dbVars.port,
    username: dbVars.username,
    password: dbVars.password,
    database: dbVars.database,
    synchronize: true,
    entities,
    ...prodOptions,
  });

  try {
    await dataSource.initialize();
    Logger.info('Connected to database');
  } catch (error) {
    Logger.error(error);
    throw new ApiError(error, 3001, null);
  }
};
