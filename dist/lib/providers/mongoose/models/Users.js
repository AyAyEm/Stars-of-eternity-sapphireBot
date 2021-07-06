"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const tslib_1 = require("tslib");
/* eslint-disable max-classes-per-file */
const typegoose_1 = require("@typegoose/typegoose");
class Follow {
    items;
}
tslib_1.__decorate([
    typegoose_1.prop({ type: () => [String] }),
    tslib_1.__metadata("design:type", Array)
], Follow.prototype, "items", void 0);
class Settings {
    follow;
}
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", Follow)
], Settings.prototype, "follow", void 0);
let Users = class Users {
    id;
    name;
    settings;
};
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "id", void 0);
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Users.prototype, "name", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ _id: false }),
    tslib_1.__metadata("design:type", Settings)
], Users.prototype, "settings", void 0);
Users = tslib_1.__decorate([
    typegoose_1.ModelOptions({ options: { customName: 'Users' } })
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map