"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.timezone = void 0;
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
exports.timezone = 'America/Sao_Paulo';
const env = dotenv.config().parsed;
exports.config = {
    ownersIds: ['163751711532515329'],
    token: env.DISCORD_TOKEN || '',
    mongoConnectionString: env.MONGO_CONNECTION_STRING || '',
};
//# sourceMappingURL=config.js.map