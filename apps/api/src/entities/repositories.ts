import { AppDataSource } from '../loaders/typeorm';
import User from './User';

export const userRepository = AppDataSource.getRepository(User);
