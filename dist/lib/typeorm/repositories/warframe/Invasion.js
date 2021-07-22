"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvasionRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../../structures");
const _models_1 = require("../../models");
let InvasionRepository = class InvasionRepository extends _structures_1.BaseRepository {
    async findLatest() {
        return this.createQueryBuilder('invasion')
            .orderBy('invasion.activation', 'DESC')
            .getOne();
    }
    async insert(invasions) {
        return this.createQueryBuilder('invasion')
            .insert()
            .values(invasions.map(({ activation, id }) => ({ activation, apiId: id })))
            .execute();
    }
};
InvasionRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.Invasion)
], InvasionRepository);
exports.InvasionRepository = InvasionRepository;
//# sourceMappingURL=Invasion.js.map