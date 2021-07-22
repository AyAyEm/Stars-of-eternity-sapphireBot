"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityCommandWSC = void 0;
const tslib_1 = require("tslib");
const async_1 = tslib_1.__importDefault(require("async"));
const discord_js_1 = require("discord.js");
const framework_1 = require("@sapphire/framework");
const LanguageFunctions_1 = require("./utils/LanguageFunctions");
const errors_1 = require("./errors");
const _structures_1 = require("./structures");
class EternityCommandWSC extends framework_1.Command {
    subCommands;
    caseInsensitive;
    #subCommandsDict;
    defaultCommand;
    constructor(context, options) {
        if (options.subCommands) {
            const flags = new Set(options.strategyOptions?.flags);
            for (const subCommand of options.subCommands) {
                if (typeof subCommand !== 'string') {
                    subCommand.flags?.forEach((flag) => flags.add(flag));
                    const { requiredArgs = [] } = subCommand;
                    if (requiredArgs.length > 0) {
                        for (const requiredArg of requiredArgs) {
                            if (typeof requiredArg !== 'string') {
                                requiredArg.orFlags?.forEach((flag) => flags.add(flag));
                            }
                        }
                    }
                }
            }
            super(context, { ...options, strategyOptions: { flags: [...flags] } });
        }
        else {
            super(context, options);
        }
        this.caseInsensitive = options.caseInsensitive ?? true;
        if (options.subCommands) {
            this.subCommands = new discord_js_1.Collection(options.subCommands?.map((subCommand) => {
                if (typeof subCommand === 'string') {
                    return [subCommand, { name: subCommand }];
                }
                return [subCommand.name, subCommand];
            }));
            if (this.caseInsensitive) {
                const subCommandsEntries = [
                    ...options.subCommands.flatMap((sb) => {
                        let aliases = [];
                        let name;
                        if (typeof sb === 'string') {
                            name = sb;
                        }
                        else {
                            name = sb.name;
                            aliases = sb.aliases ?? [];
                        }
                        return [[name, name], ...aliases.map((alias) => [alias, name])];
                    })
                ];
                this.#subCommandsDict = new _structures_1.CaseInsensitiveMap(subCommandsEntries);
            }
        }
        else {
            this.subCommands = new discord_js_1.Collection();
        }
        this.defaultCommand = this.subCommands.find((subCommand) => subCommand?.default)?.name ?? null;
    }
    get client() {
        return super.context.client;
    }
    async run(message, args) {
        const subCommandName = await args.pickResult('string')
            .then((result) => {
            const subCommand = result.success ? this.findSubCommand(result.value) : null;
            if (subCommand) {
                args.save();
                return subCommand.name;
            }
            args.start();
            return this.defaultCommand;
        });
        try {
            await this[subCommandName](message, args);
        }
        catch (e) {
            console.error(e);
        }
    }
    error = (identifier, message) => new errors_1.CommandError({ identifier, message });
    async preParse(message, parameters, context) {
        const args = await super.preParse(message, parameters, context);
        await this.verifyArgs(args, message);
        return args.start();
    }
    async verifyArgs(args, message) {
        const subCommandName = await args.pickResult('string')
            .then((result) => (result.success ? result.value : this.defaultCommand));
        const subCommand = this.findSubCommand(subCommandName);
        if (subCommand) {
            const requiredArgs = subCommand.requiredArgs ?? [];
            const missingArguments = (await async_1.default.filterSeries(requiredArgs, async (arg) => {
                const argName = typeof arg === 'string' ? arg : arg.name;
                const orFlags = arg.orFlags ?? [];
                const argIsPassed = (await args.pickResult(argName)).success;
                if (!argIsPassed && orFlags.length > 0) {
                    return !args.getFlags(...orFlags);
                }
                return !argIsPassed;
            })).map((arg) => (typeof arg === 'string' ? arg : arg.name));
            if (missingArguments.length > 0) {
                message.channel.sendTranslated('missingArgument', [{ args: missingArguments }]);
                throw this.error('missingArgument', `The argument(s) ${LanguageFunctions_1.list(missingArguments, 'and')} was missing.`);
            }
        }
        else {
            const subCommandNames = this.subCommands.map(({ name }) => name);
            message.channel.sendTranslated('missingSubCommand', [{ args: subCommandNames }]);
            throw this.error('missingSubCommand', `The subcommand ${LanguageFunctions_1.list(subCommandNames, 'or')} was missing.`);
        }
        return args.start();
    }
    findSubCommand(subCommandName) {
        if (this.caseInsensitive) {
            return this.subCommands.get(this.#subCommandsDict.get(subCommandName));
        }
        return this.subCommands.get(subCommandName);
    }
}
exports.EternityCommandWSC = EternityCommandWSC;
//# sourceMappingURL=EternityCommandWSC.js.map