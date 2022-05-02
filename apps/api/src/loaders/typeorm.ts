/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { db } from '../config';
import entities from '../entities';

// export const AppDataSource1 = new DataSource({
//   type: 'postgres',
//   host: db.host,
//   port: db.port,
//   username: db.username,
//   password: db.password,
//   database: db.database,
//   synchronize: true,
//   entities,
// });

class AppDataSource {
  private static instance: AppDataSource;

  private appDataSource: DataSource;

  private constructor() {
    const dbVars = db();

    this.appDataSource = new DataSource({
      type: 'postgres',
      host: dbVars.host,
      port: dbVars.port,
      username: dbVars.username,
      password: dbVars.password,
      database: dbVars.database,
      synchronize: true,
      entities,
    });
  }

  public static getInstance() {
    if (!AppDataSource.instance) {
      AppDataSource.instance = new AppDataSource();
    }

    return AppDataSource.instance;
  }

  public getDataSource() {
    return this.appDataSource;
  }
}

export function getDataSource() {
  return AppDataSource.getInstance().getDataSource();
}

export default async () => {
  try {
    await getDataSource().initialize();
    console.info('Connected to database');
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to database');
  }
};
