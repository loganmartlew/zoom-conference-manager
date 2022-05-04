/* eslint-disable import/no-cycle */
import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import Event from './Event';

@Entity()
export default class Meeting extends BaseEntity {
  @PrimaryColumn()
  ubid: string;

  @Column()
  name: string;

  @Column()
  startDateTime: Date;

  @Column()
  duration: number;

  @ManyToOne(() => Event, (event) => event.meetings, { onDelete: 'CASCADE' })
  event: Event;
}
