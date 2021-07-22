"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fissure = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../../structures");
let Fissure = class Fissure extends _structures_1.EternityBaseEntity {
    id;
    apiId;
    activation;
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Fissure.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 24, nullable: false, unique: true }),
    tslib_1.__metadata("design:type", String)
], Fissure.prototype, "apiId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: false }),
    tslib_1.__metadata("design:type", String)
], Fissure.prototype, "activation", void 0);
Fissure = tslib_1.__decorate([
    typeorm_1.Entity({ schema: 'warframe' })
], Fissure);
exports.Fissure = Fissure;
//# sourceMappingURL=Fissure.js.map