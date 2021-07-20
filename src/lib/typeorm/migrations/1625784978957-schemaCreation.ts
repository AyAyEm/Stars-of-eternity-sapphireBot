import { MigrationInterface, QueryRunner } from 'typeorm';
import { promises as fs } from 'graceful-fs';

export class SchemaCreation1625784978957 implements MigrationInterface {
  public async schemaRun(cb: (schema: string) => Promise<unknown>) {
    const files = await fs.readdir('./src/lib/typeorm/models', { withFileTypes: true });
    const dirs = files.filter((file) => file.isDirectory());

    return dirs.map(async ({ name }) => cb(name));
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(await this.schemaRun((schema) => queryRunner.createSchema(schema, true)));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(await this.schemaRun((schema) => queryRunner.dropSchema(schema, true)));
  }
}
