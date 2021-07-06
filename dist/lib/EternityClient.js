"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityClient = void 0;
const framework_1 = require("@sapphire/framework");
const utilities_1 = require("@sapphire/utilities");
const I18n_1 = require("./utils/I18n");
const providers_1 = require("./providers");
const structures_1 = require("./structures");
const warframe_1 = require("./eternity/warframe");
require("./Extenders");
class EternityClient extends framework_1.SapphireClient {
    tasks = new structures_1.TaskStore();
    provider = new providers_1.Mongoose();
    fetchPrefix = () => '/';
    fetchLanguage = () => 'pt-BR';
    warframe = {
        items: new warframe_1.Items(),
    };
    console = console;
    /**
     * Returns a promise that resolves when the client is ready.
     */
    ready = new Promise((resolve) => this.once('ready', () => resolve()));
    constructor(options) {
        // @ts-expect-error Type instantiation is excessively deep and possibly infinite. ts(2589)
        super(utilities_1.mergeDefault(I18n_1.clientOptions, { ...options, caseInsensitiveCommands: true }));
        this.stores.register(this.tasks)
            .registerUserDirectories();
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