import {
  Entity,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';

import type { Channel } from './Channel';

@Entity()
export class Message extends EternityBaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 19 })
  public id: string;

  @ManyToOne('Channel', (channel: Channel) => channel.messages)
  public channel: Channel;
}
