import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EternityBaseEntity } from '#structures';
import { Message } from '#models/Message';
import { Guild } from '#models/Guild';

@Entity({ schema: 'warframe' })
export class RelicsTracker extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Message)
  public message: Message;

  @ManyToOne(() => Guild)
  public guild: Guild;

  @Column({ type: 'int', nullable: false })
  public tier: number;
}
