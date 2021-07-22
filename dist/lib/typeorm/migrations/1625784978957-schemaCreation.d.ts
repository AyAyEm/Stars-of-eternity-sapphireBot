import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class SchemaCreation1625784978957 implements MigrationInterface {
    schemaRun(cb: (schema: string) => Promise<unknown>): Promise<Promise<unknown>[]>;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
