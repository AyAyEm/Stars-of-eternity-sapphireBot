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
default_1 = __decorate([
    decorators_1.ApplyOptions({ time: 10000, once: true })
], default_1);
exports.default = default_1;
//# sourceMappingURL=RegisterServers.js.map