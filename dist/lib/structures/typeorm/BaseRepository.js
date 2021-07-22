"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
class BaseRepository extends typeorm_1.AbstractRepository {
    createQueryBuilder(alias, queryRunner) {
        return this.repository.createQueryBuilder(alias, queryRunner);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map