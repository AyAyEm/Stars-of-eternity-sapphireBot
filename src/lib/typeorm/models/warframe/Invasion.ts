import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { EternityBaseEntity } from '#structures';

@Entity({ schema: 'warframe' })
export class Invasion extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 24, nullable: false, unique: true })
  public apiId: string;

  @Column({ type: 'timestamp', nullable: false })
  public activation: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  public active: boolean;
}
