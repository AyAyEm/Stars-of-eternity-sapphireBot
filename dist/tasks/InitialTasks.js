"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("@lib/structures");
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
let default_1 = class extends structures_1.Task {
    async run() {
        // Cache active bot voice connections
        const clientId = this.client.id || '';
        await new Promise((resolve) => this.client.guilds.cache.each(async (guild) => {
            const voiceChannels = guild.channels.cache.filter(({ type }) => type === 'voice');
            await Promise.all(voiceChannels.map(async (voiceChannel) => {
                const { members } = voiceChannel;
                if (!members.has(clientId))
                    return;
                const guildMember = await members.get(clientId)?.fetch();
                const clientVoiceConnection = guildMember?.voice.connection;
                // If the client is in a channel and doesn't have a connection we'll kick it.
                if (!clientVoiceConnection) {
                    guildMember?.voice.kick('Server restart auto bot kick');
                    return;
                }
                const snowflake = discord_js_1.SnowflakeUtil.generate();
                this.client.voice?.connections.set(snowflake, clientVoiceConnection);
            }));
            resolve();
        }));
        this.client.voice?.connections.each((voiceConnection) => voiceConnection.disconnect());
        setTimeout(() => this.client.emit('initialTasksCompleted'), 500);
    }
};
default_1 = __decorate([
    decorators_1.ApplyOptions({ time: 10000, once: true })
], default_1);
exports.default = default_1;
//# sourceMappingURL=InitialTasks.js.map