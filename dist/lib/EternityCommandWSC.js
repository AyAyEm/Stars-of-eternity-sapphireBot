"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityCommandWSC = void 0;
const framework_1 = require("@sapphire/framework");
const LanguageFunctions_1 = require("@utils/LanguageFunctions");
const errors_1 = require("@lib/errors");
const _utils_1 = require("@utils");
const async_1 = __importDefault(require("async"));
class EternityCommandWSC extends framework_1.Command {
    requiredArgs;
    subAliases;
    defaultCommand;
    enableDefault;
    caseInsensitive;
    #dictionary;
    subCommands = {
        default() { },
    };
    constructor(context, options) {
        super(context, options);
        this.requiredArgs = new Map(options.requiredArgs ?? []);
        this.enableDefault = options.enableDefault ?? false;
        this.defaultCommand = options.defaultCommand ?? 'default';
        this.caseInsensitive = options.caseInsensitive ?? true;
        this.subAliases = new Map(options.subAliases ?? []);
        this.#dictionary = this.caseInsensitive ? new _utils_1.CIMap() : new Map();
        options.subAliases?.forEach(([commandName, aliases]) => {
            aliases.forEach((alias) => this.#dictionary.set(alias, commandName));
        });
    }
    get client() {
        return super.client;
    }
    get subCommandsList() {
        const commandsList = Object.keys(this.subCommands);
        return this.enableDefault ? commandsList
            : commandsList.filter((commandName) => commandName !== 'default');
    }
    async onLoad() {
        super.onLoad();
        this.subCommandsList.forEach((command) => this.#dictionary.set(command, command));
    }
    async run(message, args) {
        const subCommand = await args.pickResult('string')
            .then((result) => {
            if (result.success && this.#dictionary.has(result.value)) {
                args.save();
                return this.#dictionary.get(result.value);
            }
            args.start();
            return this.defaultCommand;
        });
        // eslint-disable-next-line no-useless-catch
        try {
            await this.subCommands[subCommand](message, args);
        }
        catch (e) {
            throw e;
        }
    }
    error = (type, message) => new errors_1.CommandError(type, message);
    async preParse(message, parameters) {
        const args = await super.preParse(message, parameters);
        if (this.requiredArgs.size > 0)
            await this.verifyArgs(args, message);
        return args.start();
    }
    async verifyArgs(args, message) {
        const subCommand = await args.pickResult('string')
            .then((result) => (result.success ? result.value : this.defaultCommand));
        if (this.#dictionary.has(subCommand) || this.enableDefault) {
            const requiredArgs = this.requiredArgs.get(subCommand) ?? [];
            const missingArguments = await async_1.default.filterSeries(requiredArgs, async (arg) => (!(await args.pickResult(arg)).success));
            if (missingArguments.length > 0) {
                message.sendTranslated('missingArgument', [{ args: missingArguments }]);
                throw this.error('missingArgument', `The argument(s) ${LanguageFunctions_1.list(missingArguments, 'and')} was missing.`);
            }
        }
        else {
            message.sendTranslated('missingSubCommand', [{ args: this.subCommandsList }]);
            throw this.error('missingSubCommand', `The subcommand ${LanguageFunctions_1.list(this.subCommandsList, 'or')} was missing.`);
        }
        return args.start();
    }
}
exports.EternityCommandWSC = EternityCommandWSC;
