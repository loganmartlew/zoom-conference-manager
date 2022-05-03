/* eslint-disable import/no-cycle */
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import Event from './Event';

@Entity()
export default class Meeting {
  @PrimaryColumn()
  ubid: string;

  @Column()
  name: string;

  @Column()
  startDateTime: Date;

  @Column()
  duration: number;

  @ManyToOne(() => Event, (event) => event.meetings)
  event: Event;
}
