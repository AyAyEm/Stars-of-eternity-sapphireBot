"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
class User {
    _id;
    guilds;
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "_id", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: 'Guild', type: () => String }),
    (0, tslib_1.__metadata)("design:type", Array)
], User.prototype, "guilds", void 0);
exports.User = User;
//# sourceMappingURL=User.js.map