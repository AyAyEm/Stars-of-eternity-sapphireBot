"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const plugin_i18next_1 = require("@sapphire/plugin-i18next");
const async_1 = (0, tslib_1.__importDefault)(require("async"));
const _utils_1 = require("./utils");
const errors_1 = require("./errors");
class EternityCommand extends framework_1.Command {
    requiredArgs;
    constructor(context, options) {
        super(context, options);
        this.requiredArgs = options.requiredArgs ?? [];
    }
    error = (identifier, message) => new errors_1.CommandError({ identifier, message });
    async verifyArgs(args, message) {
        const missingArguments = await async_1.default.filter(this.requiredArgs, async (arg) => (!(await args.pickResult(arg)).success));
        if (missingArguments.length > 0) {
            await (0, plugin_i18next_1.sendLocalized)(message, { keys: 'missingArgument', formatOptions: { args: missingArguments } });
            throw this.error('missingArgument', `The argument(s) ${(0, _utils_1.list)(missingArguments, 'and')} was missing.`);
        }
    }
    async preParse(message, parameters, context) {
        const args = await super.preParse(message, parameters, context);
        if (this.requiredArgs.length > 0)
            await this.verifyArgs(args, message);
        return args.start();
    }
}
exports.EternityCommand = EternityCommand;
//# sourceMappingURL=EternityCommand.js.map