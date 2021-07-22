"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
const Guild_1 = require("./Guild");
let Role = class Role extends _structures_1.EternityBaseEntity {
    id;
    name;
    guild;
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 19 }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 250, nullable: false }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => Guild_1.Guild),
    tslib_1.__metadata("design:type", Guild_1.Guild)
], Role.prototype, "guild", void 0);
Role = tslib_1.__decorate([
    typeorm_1.Entity()
], Role);
exports.Role = Role;
//# sourceMappingURL=Role.js.map