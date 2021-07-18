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
export class InvasionTracker extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(() => Item)
  @JoinTable({ name: 'invasion_tracker_item' })
  public items: Item[];

  @OneToOne(() => Channel, { nullable: false })
  @JoinColumn()
  public channel: Channel;

  @Column({ type: 'boolean', nullable: false, default: true })
  public enabled: boolean;
}
