"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
let User = class User extends _structures_1.EternityBaseEntity {
    id;
    name;
    guilds;
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 19 }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 250, nullable: false, unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany('Guild', (guild) => guild.users),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "guilds", void 0);
User = tslib_1.__decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map