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
exports.Guilds = exports.Member = exports.Channel = exports.Message = exports.EmojiRole = exports.InvasionItems = exports.RelicTracker = void 0;
/* eslint-disable max-classes-per-file */
const typegoose_1 = require("@typegoose/typegoose");
class RelicTracker {
    enabled;
    messages;
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], RelicTracker.prototype, "enabled", void 0);
__decorate([
    typegoose_1.prop({ _id: false, type: String }),
    __metadata("design:type", Map)
], RelicTracker.prototype, "messages", void 0);
exports.RelicTracker = RelicTracker;
class InvasionItems {
    enabled;
    items;
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], InvasionItems.prototype, "enabled", void 0);
__decorate([
    typegoose_1.prop({ type: () => [String] }),
    __metadata("design:type", Array)
], InvasionItems.prototype, "items", void 0);
exports.InvasionItems = InvasionItems;
class EmojiRole {
    roleId;
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], EmojiRole.prototype, "roleId", void 0);
exports.EmojiRole = EmojiRole;
class Message {
    msgType;
    title;
    emojiRoleMap;
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Message.prototype, "msgType", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Message.prototype, "title", void 0);
__decorate([
    typegoose_1.prop({ _id: false, type: String }),
    __metadata("design:type", Map)
], Message.prototype, "emojiRoleMap", void 0);
exports.Message = Message;
class Channel {
    relicTracker;
    invasionItems;
    messages;
}
__decorate([
    typegoose_1.prop({ _id: false }),
    __metadata("design:type", RelicTracker)
], Channel.prototype, "relicTracker", void 0);
__decorate([
    typegoose_1.prop({ _id: false }),
    __metadata("design:type", InvasionItems)
], Channel.prototype, "invasionItems", void 0);
__decorate([
    typegoose_1.prop({ _id: false, type: Message }),
    __metadata("design:type", Map)
], Channel.prototype, "messages", void 0);
exports.Channel = Channel;
class Member {
    toFollow;
}
__decorate([
    typegoose_1.prop({ default: false }),
    __metadata("design:type", Boolean)
], Member.prototype, "toFollow", void 0);
exports.Member = Member;
class Guilds {
    id;
    name;
    members;
    channels;
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Guilds.prototype, "id", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Guilds.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ _id: false, type: Member }),
    __metadata("design:type", Map)
], Guilds.prototype, "members", void 0);
__decorate([
    typegoose_1.prop({ _id: false, type: Channel }),
    __metadata("design:type", Map)
], Guilds.prototype, "channels", void 0);
exports.Guilds = Guilds;
