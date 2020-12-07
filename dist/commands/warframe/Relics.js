"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _lib_1 = require("@lib");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends _lib_1.EternityCommandWSC {
    subCommands = {
        enable: async (msg) => {
            const { guild, channel } = msg;
            const path = `channels.${channel.id}.relicTracker.enabled`;
            const document = await new this.client.provider.Guilds({ id: { id: guild.id } }).load;
            await document.set(path, true);
            msg.sendTranslated('commands/relics:succesfullEnabled');
        },
        disable: async (msg) => {
            const { guild, channel } = msg;
            const path = `channels.${channel.id}.relicTracker.enabled`;
            const document = await new this.client.provider.Guilds({ id: { id: guild.id } }).load;
            await document.set(path, false);
            msg.sendTranslated('commands/relics:succesfullDisabled');
        },
    };
};
default_1 = __decorate([
    decorators_1.ApplyOptions({
        preconditions: ['GuildOnly'],
    })
], default_1);
exports.default = default_1;
