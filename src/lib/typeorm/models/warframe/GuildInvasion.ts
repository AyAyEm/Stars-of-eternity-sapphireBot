import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  Column,
  JoinColumn,
} from 'typeorm';

import { Channel } from '#models/Channel';
import { EternityBaseEntity } from '#structures';
import { Item } from './Item';

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

  @Column({ type: 'boolean', nullable: false, default: true })
  public enabled: boolean;
}
