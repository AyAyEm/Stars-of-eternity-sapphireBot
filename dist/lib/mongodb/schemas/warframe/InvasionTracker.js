"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvasionTracker = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const Item_1 = require("./Item");
class InvasionTracker {
    items;
    channel;
    enabled;
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: () => Item_1.Item, default: [] }),
    (0, tslib_1.__metadata)("design:type", Array)
], InvasionTracker.prototype, "items", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ type: String }),
    (0, tslib_1.__metadata)("design:type", String)
], InvasionTracker.prototype, "channel", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], InvasionTracker.prototype, "enabled", void 0);
exports.InvasionTracker = InvasionTracker;
//# sourceMappingURL=InvasionTracker.js.map