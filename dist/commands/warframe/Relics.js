"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends _lib_1.EternityCommandWSC {
    subCommands = {
        enable: async (msg) => {
            const { guild, channel } = msg;
            const path = `channels.${channel.id}.relicTracker.enabled`;
            const document = await new this.client.provider.Guilds({ id: { id: guild.id } }).load;
            await document.set(path, true);
            msg.channel.sendTranslated('commands/Relics:succesfullEnabled');
        },
        disable: async (msg) => {
            const { guild, channel } = msg;
            const path = `channels.${channel.id}.relicTracker.enabled`;
            const document = await new this.client.provider.Guilds({ id: { id: guild.id } }).load;
            await document.set(path, false);
            msg.channel.sendTranslated('commands/Relics:succesfullDisabled');
        },
    };
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        preconditions: ['GuildOnly'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Relics.js.map