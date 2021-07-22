"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleReaction = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
const Message_1 = require("./Message");
const Role_1 = require("./Role");
let RoleReaction = class RoleReaction extends _structures_1.EternityBaseEntity {
    id;
    message;
    role;
    emoji;
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], RoleReaction.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => Message_1.Message, { nullable: false }),
    tslib_1.__metadata("design:type", Message_1.Message)
], RoleReaction.prototype, "message", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => Role_1.Role, { nullable: false }),
    tslib_1.__metadata("design:type", Role_1.Role)
], RoleReaction.prototype, "role", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 19, nullable: false }),
    tslib_1.__metadata("design:type", String)
], RoleReaction.prototype, "emoji", void 0);
RoleReaction = tslib_1.__decorate([
    typeorm_1.Entity()
], RoleReaction);
exports.RoleReaction = RoleReaction;
//# sourceMappingURL=RoleReaction.js.map