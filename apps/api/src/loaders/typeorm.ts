/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { db } from '../config';
import entities from '../entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities,
});

export default async () => {
  try {
    await AppDataSource.initialize();
    console.info('Connected to database');
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to database');
  }
};
