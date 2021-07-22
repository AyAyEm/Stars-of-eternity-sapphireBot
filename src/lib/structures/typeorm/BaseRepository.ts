import { AbstractRepository } from 'typeorm';

import type { ObjectLiteral, QueryRunner, SelectQueryBuilder } from 'typeorm';

export class BaseRepository<Entity extends ObjectLiteral> extends AbstractRepository<Entity> {
  public createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }
}
