"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const structures_1 = require("../lib/structures");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends structures_1.Task {
    async run() {
        const { Guilds } = this.client.provider.models;
        this.client.guilds.cache.each(async (guild, guildId) => {
            const exists = await Guilds.exists({ id: guildId });
            if (!exists) {
                const guildDocument = new Guilds({ id: guildId, name: guild.name });
                guildDocument.save();
            }
        });
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ time: 10000, once: true })
], default_1);
exports.default = default_1;
//# sourceMappingURL=RegisterServers.js.map