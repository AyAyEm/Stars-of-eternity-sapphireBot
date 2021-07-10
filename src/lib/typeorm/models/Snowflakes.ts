import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity } from 'typeorm';

@Entity()
export class Snowflakes extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflake: string;
}
