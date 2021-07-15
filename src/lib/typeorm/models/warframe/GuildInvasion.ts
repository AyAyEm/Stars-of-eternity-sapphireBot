import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Channel } from '#models/Channel';
import { EternityBaseEntity } from '#structures';
import { Item } from './Item';

import type { Invasion } from './Invasion';

@Entity({ schema: 'warframe' })
export class GuildInvasion extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(() => Item)
  @JoinTable({ name: 'guild_invasion_item' })
  public items: Item[];

  @OneToOne(() => Channel, { nullable: false })
  @JoinColumn()
  public channel: Channel;

  @OneToMany('Invasion', (invasion: Invasion) => invasion.guildInvasion)
  public invasions: Invasion[];

  @Column({ type: 'boolean', nullable: false, default: true })
  public enabled: boolean;
}
