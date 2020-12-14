"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
/* eslint-disable max-classes-per-file */
const typegoose_1 = require("@typegoose/typegoose");
class Follow {
    items;
}
__decorate([
    typegoose_1.prop({ type: () => [String] }),
    __metadata("design:type", Array)
], Follow.prototype, "items", void 0);
class Settings {
    follow;
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Follow)
], Settings.prototype, "follow", void 0);
let Users = class Users {
    id;
    name;
    settings;
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ _id: false }),
    __metadata("design:type", Settings)
], Users.prototype, "settings", void 0);
Users = __decorate([
    typegoose_1.ModelOptions({ options: { customName: 'Users' } })
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map