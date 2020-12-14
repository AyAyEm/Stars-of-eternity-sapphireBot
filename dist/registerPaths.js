"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = require("module-alias");
const path_1 = __importDefault(require("path"));
module_alias_1.addAliases({
    '@root': __dirname,
    '@lib': path_1.default.join(__dirname, 'lib'),
    '@config': path_1.default.join(__dirname, 'config'),
    '@utils': path_1.default.join(__dirname, 'lib/utils'),
    '@embeds': path_1.default.join(__dirname, '/lib/embeds'),
    '@providers': path_1.default.join(__dirname, '/lib/providers'),
});
//# sourceMappingURL=registerPaths.js.map