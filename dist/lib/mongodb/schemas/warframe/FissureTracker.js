"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FissureTracker = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
class FissureTracker {
    messages;
    channel;
    enabled;
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ type: String, default: [] }),
    (0, tslib_1.__metadata)("design:type", Array)
], FissureTracker.prototype, "messages", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], FissureTracker.prototype, "channel", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], FissureTracker.prototype, "enabled", void 0);
exports.FissureTracker = FissureTracker;
//# sourceMappingURL=FissureTracker.js.map