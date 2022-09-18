/* eslint-disable import/no-cycle */
import { IEvent } from '@zoom-conference-manager/api-interfaces';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EventStatus } from '@zoom-conference-manager/types';
import Meeting from './Meeting';

@Entity()
export default class Event extends BaseEntity implements IEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ubid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status: EventStatus;

  @OneToMany(() => Meeting, (meeting) => meeting.event)
  meetings: Meeting[];
}
