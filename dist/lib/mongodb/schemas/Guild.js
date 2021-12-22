"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const Channel_1 = require("./Channel");
const Role_1 = require("./Role");
const User_1 = require("./User");
class Guild {
    _id;
    channels;
    roles;
    members;
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], Guild.prototype, "_id", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: () => Channel_1.Channel, type: () => String }),
    (0, tslib_1.__metadata)("design:type", Array)
], Guild.prototype, "channels", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: () => Role_1.Role, type: () => String }),
    (0, tslib_1.__metadata)("design:type", Array)
], Guild.prototype, "roles", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: () => User_1.User, type: () => String }),
    (0, tslib_1.__metadata)("design:type", Array)
], Guild.prototype, "members", void 0);
exports.Guild = Guild;
//# sourceMappingURL=Guild.js.map