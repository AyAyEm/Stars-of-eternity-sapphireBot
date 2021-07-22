"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FissureRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../../structures");
const _models_1 = require("../../models");
let FissureRepository = class FissureRepository extends _structures_1.BaseRepository {
    async findLatest() {
        return this.createQueryBuilder('fissure')
            .orderBy('fissure.activation', 'DESC')
            .getOne();
    }
    async insert(fissures) {
        return this.createQueryBuilder('fissure')
            .insert()
            .values(fissures.map(({ activation, id }) => ({ activation, apiId: id })))
            .execute();
    }
};
FissureRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.Fissure)
], FissureRepository);
exports.FissureRepository = FissureRepository;
//# sourceMappingURL=Fissure.js.map