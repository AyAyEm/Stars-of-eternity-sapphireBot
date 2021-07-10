import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

import { Messages } from '#models/Messages';
import { Guilds } from '#models/Guilds';

@Entity({ schema: 'warframe' })
export class RelicsTracker extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Messages)
  public message: Messages;

  @ManyToOne(() => Guilds)
  public guild: Guilds;

  @Column({ type: 'int', nullable: false })
  public tier: number;
}
