import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity } from 'typeorm';

@Entity()
export class Emojis extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public identifier: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;
}
