import {
  Entity,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';

import type { Role } from './Role';
import type { Channel } from './Channel';

@Entity()
export class Message extends EternityBaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 19 })
  public id: string;

  @ManyToMany('Role', (role: Role) => role.messages)
  @JoinTable({ name: 'role_message' })
  public roles: Role[];

  @ManyToOne('Channel', (channel: Channel) => channel.messages)
  public channel: Channel;
}
