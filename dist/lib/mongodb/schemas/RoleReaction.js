"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleReaction = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const Role_1 = require("./Role");
const Message_1 = require("./Message");
class RoleReaction {
    message;
    role;
    emoji;
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: () => Message_1.Message }),
    (0, tslib_1.__metadata)("design:type", Object)
], RoleReaction.prototype, "message", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: () => Role_1.Role, type: () => String }),
    (0, tslib_1.__metadata)("design:type", Object)
], RoleReaction.prototype, "role", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], RoleReaction.prototype, "emoji", void 0);
exports.RoleReaction = RoleReaction;
//# sourceMappingURL=RoleReaction.js.map