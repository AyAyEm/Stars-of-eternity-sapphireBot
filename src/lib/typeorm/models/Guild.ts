import {
  Entity,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';

import type { User } from './User';
import type { Channel } from './Channel';

@Entity()
export class Guild extends EternityBaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 19 })
  public id: string;

  @ManyToMany('User', (user: User) => user.guilds)
  @JoinTable({ name: 'guild_user' })
  public users: User[];

  @OneToMany('Channel', (channel: Channel) => channel.guild)
  public channels: Channel[];
}
