"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _lib_1 = require("@lib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
// TODO CLEAN UNECESSARY EVENT EMITTERS
let default_1 = class extends _lib_1.EternityEvent {
    async run(oldState, newState) {
        const oldChannelId = oldState.channelID;
        const newChannelId = newState.channelID;
        const bothDefined = oldChannelId && newChannelId;
        if (oldChannelId === newChannelId)
            return;
        // Member joined a channel
        if (!oldChannelId || (oldChannelId !== newChannelId && bothDefined)) {
            const { member, channel } = newState;
            const botOrMember = member?.user.bot ? 'bot' : 'member';
            if (this.client.id === member.id)
                this.client.emit('clientJoinedChannel', channel, newState);
            else
                this.client.emit(`${botOrMember}JoinedChannel`, channel, member, newState);
            // Custom events
            if (!member?.user.bot)
                this.client.emit(`${channel?.id}memberJoined`, member);
        }
        // Member left a channel
        if (!newChannelId || (oldChannelId !== newChannelId && bothDefined)) {
            const { member, channel } = oldState;
            const botOrMember = member?.user.bot ? 'bot' : 'member';
            if (this.client.id === member.id)
                this.client.emit('clientLeftChannel', channel, oldState);
            else
                this.client.emit(`${botOrMember}LeftChannel`, channel, member, oldState);
            // Custom events
            if (!member?.user.bot)
                this.client.emit(`${channel?.id}memberLeft`, member);
        }
    }
};
default_1 = __decorate([
    decorators_1.ApplyOptions({ event: framework_1.Events.VoiceStateUpdate })
], default_1);
exports.default = default_1;
//# sourceMappingURL=VoiceStateUpdate.js.map