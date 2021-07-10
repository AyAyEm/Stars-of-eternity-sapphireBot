import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Column,
  BaseEntity,
} from 'typeorm';

import { Guilds } from '#models/Guilds';
import { Channels } from '#models/Channels';

import { Items } from './Items';

@Entity({ schema: 'warframe' })
export class GuildInvasions extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Guilds)
  public guild: Guilds;

  @ManyToMany(() => Items)
  @JoinTable({ name: 'guild_invasion_item' })
  public item: Items;

  @ManyToMany('Channels')
  @JoinTable({ name: 'guild_invasion_channel' })
  public channels: Channels[];

  @Column({ type: 'bool', nullable: false, default: true })
  public enabled: boolean;
}
