import { AbstractRepository } from 'typeorm';
import type { ObjectLiteral, QueryRunner, SelectQueryBuilder } from 'typeorm';
export declare class BaseRepository<Entity extends ObjectLiteral> extends AbstractRepository<Entity> {
    createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity>;
}
