"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCommandRequiredArgs = void 0;
const tslib_1 = require("tslib");
const async_1 = (0, tslib_1.__importDefault)(require("async"));
const plugin_i18next_1 = require("@sapphire/plugin-i18next");
const languageFunctions_1 = require("../languageFunctions");
function subCommandRequiredArgs(command, requiredArgs) {
    return async (context) => {
        const missingArguments = (await async_1.default.filterSeries(requiredArgs, async (argType) => {
            const argIsPassed = (await context.args.pickResult(argType)).success;
            return !argIsPassed;
        }));
        if (missingArguments.length > 0) {
            (0, plugin_i18next_1.sendLocalized)(context.message.channel, { keys: 'missingArgument', formatOptions: { args: missingArguments } });
            throw this.error('missingArgument', `The argument(s) ${(0, languageFunctions_1.list)(missingArguments, 'and')} was missing.`);
        }
        else {
            return command;
        }
    };
}
exports.subCommandRequiredArgs = subCommandRequiredArgs;
//# sourceMappingURL=subCommandRequiredArgs.js.map