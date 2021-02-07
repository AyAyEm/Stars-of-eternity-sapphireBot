"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityCommand = void 0;
const framework_1 = require("@sapphire/framework");
const async_1 = __importDefault(require("async"));
const LanguageFunctions_1 = require("@root/lib/utils/LanguageFunctions");
const errors_1 = require("./errors");
class EternityCommand extends framework_1.Command {
    requiredArgs;
    constructor(context, options) {
        super(context, options);
        this.requiredArgs = options.requiredArgs ?? [];
    }
    get client() {
        return super.context.client;
    }
    error = (identifier, message) => new errors_1.CommandError({ identifier, message });
    async verifyArgs(args, message) {
        const missingArguments = await async_1.default.filter(this.requiredArgs, async (arg) => (!(await args.pickResult(arg)).success));
        if (missingArguments.length > 0) {
            message.channel.sendTranslated('missingArgument', [{ args: missingArguments }]);
            throw this.error('missingArgument', `The argument(s) ${LanguageFunctions_1.list(missingArguments, 'and')} was missing.`);
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