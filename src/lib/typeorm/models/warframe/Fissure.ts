import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { EternityBaseEntity } from '#structures';

@Entity()
export class WarframeFissure extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 24, nullable: false, unique: true })
  public apiId: string;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  public activation: string;
}
