"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const Message_1 = require("./Message");
class Channel {
    _id;
    messages;
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], Channel.prototype, "_id", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: () => Message_1.Message, type: String }),
    (0, tslib_1.__metadata)("design:type", Array)
], Channel.prototype, "messages", void 0);
exports.Channel = Channel;
//# sourceMappingURL=Channel.js.map