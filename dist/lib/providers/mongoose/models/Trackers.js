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
exports.Trackers = void 0;
/* eslint-disable max-classes-per-file */
const typegoose_1 = require("@typegoose/typegoose");
class Data {
    cacheIds;
}
__decorate([
    typegoose_1.prop({ type: () => [String] }),
    __metadata("design:type", Array)
], Data.prototype, "cacheIds", void 0);
let Trackers = class Trackers {
    tracker;
    type;
    data;
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Trackers.prototype, "tracker", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Trackers.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({ _id: false }),
    __metadata("design:type", Data)
], Trackers.prototype, "data", void 0);
Trackers = __decorate([
    typegoose_1.ModelOptions({ options: { allowMixed: 0, customName: 'Trackers' } })
], Trackers);
exports.Trackers = Trackers;
//# sourceMappingURL=Trackers.js.map