/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { db } from '../config';
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
  });

  try {
    await dataSource.initialize();
    console.info('Connected to database');
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to database');
  }
};
