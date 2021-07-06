"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trackers = void 0;
const tslib_1 = require("tslib");
/* eslint-disable max-classes-per-file */
const typegoose_1 = require("@typegoose/typegoose");
class Data {
    cacheIds;
}
tslib_1.__decorate([
    typegoose_1.prop({ type: () => [String] }),
    tslib_1.__metadata("design:type", Array)
], Data.prototype, "cacheIds", void 0);
let Trackers = class Trackers {
    tracker;
    type;
    data;
};
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Trackers.prototype, "tracker", void 0);
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Trackers.prototype, "type", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ _id: false }),
    tslib_1.__metadata("design:type", Data)
], Trackers.prototype, "data", void 0);
Trackers = tslib_1.__decorate([
    typegoose_1.ModelOptions({ options: { allowMixed: 0, customName: 'Trackers' } })
], Trackers);
exports.Trackers = Trackers;
//# sourceMappingURL=Trackers.js.map