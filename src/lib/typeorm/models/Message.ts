import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';

import type { Role } from './Role';
import type { Channel } from './Channel';

@Entity()
export class Message extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @ManyToMany('Role', (role: Role) => role.messages)
  @JoinTable({ name: 'role_message' })
  public roles: Role[];

  @ManyToOne('Channel', (channel: Channel) => channel.messages)
  public channel: Channel;
}
