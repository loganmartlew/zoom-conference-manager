import { IZoomUser } from '@zoom-conference-manager/api-interfaces';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class ZoomUser extends BaseEntity implements IZoomUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
