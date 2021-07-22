"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invasion = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../../structures");
let Invasion = class Invasion extends _structures_1.EternityBaseEntity {
    id;
    apiId;
    activation;
    active;
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Invasion.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 24, nullable: false, unique: true }),
    tslib_1.__metadata("design:type", String)
], Invasion.prototype, "apiId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: false }),
    tslib_1.__metadata("design:type", String)
], Invasion.prototype, "activation", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: false, default: true }),
    tslib_1.__metadata("design:type", Boolean)
], Invasion.prototype, "active", void 0);
Invasion = tslib_1.__decorate([
    typeorm_1.Entity({ schema: 'warframe' })
], Invasion);
exports.Invasion = Invasion;
//# sourceMappingURL=Invasion.js.map