import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';
import { Message } from '#models/Message';
import { Channel } from '#models/Channel';

@Entity()
@Unique(['tier', 'channel'])
export class WarframeFissureTracker extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => Message, { nullable: false })
  @JoinColumn()
  public message: Message;

  @ManyToOne(() => Channel, { nullable: false })
  public channel: Channel;

  @Column({ type: 'boolean', nullable: false, default: true })
  public enabled: boolean;

  @Column({ type: 'int', nullable: false })
  public tier: number;
}
