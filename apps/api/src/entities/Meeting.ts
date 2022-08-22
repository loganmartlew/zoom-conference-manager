/* eslint-disable import/no-cycle */
import { IMeeting } from '@zoom-conference-manager/api-interfaces';
import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Event from './Event';

@Entity()
export default class Meeting extends BaseEntity implements IMeeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zoomId: string;

  @Column()
  name: string;

  @Column()
  startDateTime: Date;

  @Column()
  endDateTime: Date;

  @ManyToOne(() => Event, (event) => event.meetings, { onDelete: 'CASCADE' })
  event: Event;
}
