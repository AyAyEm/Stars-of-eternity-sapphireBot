"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const extensions_1 = require("./extensions");
discord_js_1.Structures.extend('Guild', () => extensions_1.EternityGuild);
discord_js_1.Structures.extend('Message', () => extensions_1.EternityMessage);
discord_js_1.Structures.extend('VoiceChannel', () => extensions_1.EternityVoiceChannel);
discord_js_1.Structures.extend('TextChannel', () => extensions_1.EternityTextChannel);
//# sourceMappingURL=Extenders.js.map