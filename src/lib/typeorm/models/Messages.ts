import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

import type { Roles } from './Roles';
import type { Channels } from './Channels';

@Entity()
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @ManyToMany('Roles', (role: Roles) => role.messages)
  @JoinTable({ name: 'role_message' })
  public roles: Roles[];

  @ManyToOne('Channels', (channel: Channels) => channel.messages)
  public channel: Channels;
}
