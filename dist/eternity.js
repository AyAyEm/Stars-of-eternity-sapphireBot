"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./registerPaths");
const _lib_1 = require("@lib");
const config_1 = require("./config");
const client = new _lib_1.EternityClient();
(async function main() {
    client.login(config_1.config.token);
    client.once('ready', () => console.log('Ready'));
}());
