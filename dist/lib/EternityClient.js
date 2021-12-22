"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityClient = void 0;
const framework_1 = require("@sapphire/framework");
const config_1 = require("../config");
const structures_1 = require("./structures");
class EternityClient extends framework_1.SapphireClient {
    tasks;
    fetchPrefix = () => '/';
    ready = new Promise((resolve) => this.once('ready', () => resolve()));
    /**
     * Returns a promise that resolves when the client is ready.
     */
    constructor() {
        super(config_1.clientOptions);
        this.tasks = new structures_1.TaskStore();
        this.stores.register(this.tasks).registerPath();
    }
    /**
     * Returns an invitation link for the bot.
     */
    get invite() {
        return `https://discord.com/oauth2/authorize?client_id=${this.id}&scope=bot`;
    }
}
exports.EternityClient = EternityClient;
//# sourceMappingURL=EternityClient.js.map