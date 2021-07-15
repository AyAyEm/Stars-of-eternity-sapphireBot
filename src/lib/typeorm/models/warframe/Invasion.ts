import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { EternityBaseEntity } from '#structures';

import type { GuildInvasion } from './GuildInvasion';

@Entity({ schema: 'warframe' })
export class Invasion extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 24, nullable: false })
  public api_id: string;

  @Column({ type: 'int8', nullable: false })
  public activation: number;

  @Column({ type: 'boolean', nullable: false })
  public active: boolean;

  @ManyToOne('GuildInvasion', (guildInvasion: GuildInvasion) => guildInvasion.invasions)
  public guildInvasion: GuildInvasion;
}
