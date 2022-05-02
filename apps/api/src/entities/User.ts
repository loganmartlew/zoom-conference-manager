import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
