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
import { WarframeItem } from './Item';

@Entity()
export class WarframeInvasionTracker extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(() => WarframeItem)
  @JoinTable({ name: 'invasion_tracker_item' })
  public items: WarframeItem[];

  @OneToOne(() => Channel, { nullable: false })
  @JoinColumn()
  public channel: Channel;

  @Column({ type: 'boolean', nullable: false, default: true })
  public enabled: boolean;
}
