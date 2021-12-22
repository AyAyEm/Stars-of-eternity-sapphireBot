"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const voice_1 = require("@discordjs/voice");
const decorators_1 = require("@sapphire/decorators");
const structures_1 = require("../lib/structures");
let default_1 = class extends structures_1.Task {
    async run() {
        this.container.client.guilds.cache.each((guild) => (0, voice_1.getVoiceConnection)(guild.id)?.destroy());
        this.container.client.emit('initialTasksCompleted');
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({ time: 10000, once: true })
], default_1);
exports.default = default_1;
//# sourceMappingURL=InitialTasks.js.map