"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = exports.Emoji = void 0;
const tslib_1 = require("tslib");
/* eslint-disable max-classes-per-file */
const typegoose_1 = require("@typegoose/typegoose");
class Emoji {
    id;
    guild;
}
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Emoji.prototype, "id", void 0);
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Emoji.prototype, "guild", void 0);
exports.Emoji = Emoji;
let Utils = class Utils {
    type;
    emojis;
};
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Utils.prototype, "type", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ _id: false }),
    tslib_1.__metadata("design:type", Map)
], Utils.prototype, "emojis", void 0);
Utils = tslib_1.__decorate([
    typegoose_1.ModelOptions({ options: { customName: 'Utils' } })
], Utils);
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map