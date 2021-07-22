"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaCreation1625784978957 = void 0;
const graceful_fs_1 = require("graceful-fs");
class SchemaCreation1625784978957 {
    async schemaRun(cb) {
        const files = await graceful_fs_1.promises.readdir('./src/lib/typeorm/models', { withFileTypes: true });
        const dirs = files.filter((file) => file.isDirectory());
        return dirs.map(async ({ name }) => cb(name));
    }
    async up(queryRunner) {
        await Promise.all(await this.schemaRun((schema) => queryRunner.createSchema(schema, true)));
    }
    async down(queryRunner) {
        await Promise.all(await this.schemaRun((schema) => queryRunner.dropSchema(schema, true)));
    }
}
exports.SchemaCreation1625784978957 = SchemaCreation1625784978957;
//# sourceMappingURL=1625784978957-schemaCreation.js.map