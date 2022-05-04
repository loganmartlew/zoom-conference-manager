/* eslint-disable import/no-cycle */
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import Meeting from './Meeting';

@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @OneToMany(() => Meeting, (meeting) => meeting.event)
  meetings: Meeting[];
}
