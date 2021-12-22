"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientOptions = exports.i18nClientOptions = exports.config = exports.timezone = void 0;
const tslib_1 = require("tslib");
const i18next_1 = (0, tslib_1.__importDefault)(require("i18next"));
const discord_js_1 = require("discord.js");
const _utils_1 = require("./lib/utils");
exports.timezone = 'America/Sao_Paulo';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    process.env = { ...process.env, ...require('dotenv').config().parsed };
}
exports.config = {
    ownersIds: ['163751711532515329'],
    token: process.env.DISCORD_TOKEN ?? '',
    redisUrl: (() => {
        const host = process.env.REDIS_HOSTNAME ?? 'localhost';
        const port = process.env.REDIS_PORT ?? '6379';
        return `redis://${host}:${port}`;
    })(),
    mongoUser: process.env.MONGO_USERNAME ?? 'admin',
    mongoPass: process.env.MONGO_PASSWORD ?? 'password',
    mongoUrl: (() => {
        const host = process.env.MONGO_HOSTNAME ?? 'localhost';
        const port = process.env.MONGO_PORT ?? '27017';
        const dbName = process.env.MONGO_DB_NAME ?? 'starsOfEternity';
        const dns = (process.env.MONGO_DNS ?? 'false') === 'true';
        return `mongodb${dns ? '+srv' : ''}://${host}${dns ? '' : `:${port}`}/${dbName}`;
    })(),
};
const intents = new discord_js_1.Intents();
intents.add([
    discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
    discord_js_1.Intents.FLAGS.GUILDS,
    discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
    discord_js_1.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
]);
exports.i18nClientOptions = {
    fetchLanguage: () => 'pt-BR',
    i18next: {
        interpolation: {
            escapeValue: false,
            format: (value, format, lang) => {
                switch (format) {
                    case "andList" /* AndList */: {
                        return (0, _utils_1.list)(value, i18next_1.default.t('global:and', { lng: lang }));
                    }
                    case "orList" /* OrList */: {
                        return (0, _utils_1.list)(value, i18next_1.default.t('global:or', { lng: lang }));
                    }
                    default:
                        return value;
                }
            },
        },
    },
};
exports.clientOptions = {
    intents,
    caseInsensitiveCommands: true,
    i18n: exports.i18nClientOptions,
};
//# sourceMappingURL=config.js.map