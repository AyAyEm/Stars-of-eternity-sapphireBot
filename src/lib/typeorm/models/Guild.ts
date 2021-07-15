import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';

import type { User } from './User';
import type { Channel } from './Channel';

@Entity()
export class Guild extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @ManyToMany('User', (user: User) => user.guilds)
  @JoinTable({ name: 'guild_user' })
  public users: User[];

  @OneToMany('Channel', (channel: Channel) => channel.guild)
  public channels: Channel[];
}
