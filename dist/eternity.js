"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("@sapphire/plugin-i18next/register");
require("@sapphire/plugin-logger/register");
const mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
const redis_1 = require("redis");
const framework_1 = require("@sapphire/framework");
const _lib_1 = require("./lib");
const eternity_1 = require("./lib/eternity");
const config_1 = require("./config");
const client = new _lib_1.EternityClient();
(async function main() {
    framework_1.container.warframe = {
        items: new eternity_1.Items(),
    };
    framework_1.container.redisClient = (0, redis_1.createClient)({ url: config_1.config.redisUrl });
    await framework_1.container.redisClient.connect();
    framework_1.container.redisClient.on('error', (err) => framework_1.container.logger.error('Redis ', err));
    framework_1.container.mongoClient = await mongoose_1.default.connect(config_1.config.mongoUrl, {
        authSource: 'admin',
        user: config_1.config.mongoUser,
        pass: config_1.config.mongoPass,
    });
    client.once('ready', () => framework_1.container.logger.info('Ready'));
    await client.login(config_1.config.token);
}()).catch(console.error);
//# sourceMappingURL=eternity.js.map