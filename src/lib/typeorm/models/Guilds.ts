import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity,
} from 'typeorm';

import type { Users } from './Users';
import type { Channels } from './Channels';

@Entity()
export class Guilds extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @ManyToMany('Users', (user: Users) => user.guilds)
  @JoinTable({ name: 'guild_user' })
  public users: Users[];

  @OneToMany('Channels', (channel: Channels) => channel.guild)
  public channels: Channels[];
}
