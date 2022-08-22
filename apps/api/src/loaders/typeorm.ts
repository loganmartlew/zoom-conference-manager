import { DataSource } from 'typeorm';
import { db } from '../config';
import { Logger } from './logger';
import entities from '../entities';

export default async () => {
  const dbVars = db();

  const dataSource = new DataSource({
    type: 'postgres',
    host: dbVars.host,
    port: dbVars.port,
    username: dbVars.username,
    password: dbVars.password,
    database: dbVars.database,
    synchronize: true,
    entities,
    // extra: {
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
  });

  try {
    await dataSource.initialize();
    Logger.info('Connected to database');
  } catch (error) {
    Logger.error(error);
    throw new Error('Unable to connect to database');
  }
};
