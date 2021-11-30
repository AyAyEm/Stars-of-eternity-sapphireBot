import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { EternityBaseEntity } from '#structures';

@Entity()
export class WarframeInvasion extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 24, nullable: false, unique: true })
  public apiId: string;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  public activation: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  public active: boolean;
}
