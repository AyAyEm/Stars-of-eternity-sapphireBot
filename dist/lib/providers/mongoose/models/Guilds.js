"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guilds = exports.Member = exports.Channel = exports.Message = exports.EmojiRole = exports.InvasionItems = exports.RelicTracker = void 0;
const tslib_1 = require("tslib");
/* eslint-disable max-classes-per-file */
const typegoose_1 = require("@typegoose/typegoose");
class RelicTracker {
    enabled;
    messages;
}
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", Boolean)
], RelicTracker.prototype, "enabled", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ _id: false }),
    tslib_1.__metadata("design:type", Map)
], RelicTracker.prototype, "messages", void 0);
exports.RelicTracker = RelicTracker;
class InvasionItems {
    enabled;
    items;
}
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", Boolean)
], InvasionItems.prototype, "enabled", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ type: () => [String] }),
    tslib_1.__metadata("design:type", Array)
], InvasionItems.prototype, "items", void 0);
exports.InvasionItems = InvasionItems;
class EmojiRole {
    roleId;
}
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], EmojiRole.prototype, "roleId", void 0);
exports.EmojiRole = EmojiRole;
class Message {
    msgType;
    title;
    emojiRoleMap;
}
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "msgType", void 0);
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "title", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ _id: false, type: String }),
    tslib_1.__metadata("design:type", Map)
], Message.prototype, "emojiRoleMap", void 0);
exports.Message = Message;
class Channel {
    relicTracker;
    invasionItems;
    messages;
}
tslib_1.__decorate([
    typegoose_1.prop({ _id: false }),
    tslib_1.__metadata("design:type", RelicTracker)
], Channel.prototype, "relicTracker", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ _id: false }),
    tslib_1.__metadata("design:type", InvasionItems)
], Channel.prototype, "invasionItems", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ _id: false, type: Message }),
    tslib_1.__metadata("design:type", Map)
], Channel.prototype, "messages", void 0);
exports.Channel = Channel;
class Member {
    toFollow;
}
tslib_1.__decorate([
    typegoose_1.prop({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Member.prototype, "toFollow", void 0);
exports.Member = Member;
class Guilds {
    id;
    name;
    members;
    channels;
}
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Guilds.prototype, "id", void 0);
tslib_1.__decorate([
    typegoose_1.prop(),
    tslib_1.__metadata("design:type", String)
], Guilds.prototype, "name", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ _id: false, type: Member }),
    tslib_1.__metadata("design:type", Map)
], Guilds.prototype, "members", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ _id: false, type: Channel }),
    tslib_1.__metadata("design:type", Map)
], Guilds.prototype, "channels", void 0);
exports.Guilds = Guilds;
//# sourceMappingURL=Guilds.js.map