"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientOptions = void 0;
require("@sapphire/plugin-i18next/register-discordjs");
const i18next_1 = __importDefault(require("i18next"));
const LanguageFunctions_1 = require("./LanguageFunctions");
exports.clientOptions = {
    i18n: {
        defaultName: 'pt-BR',
        i18next: {
            fallbackNS: 'default',
            interpolation: {
                format: (value, format, lang) => {
                    switch (format) {
                        case "andList" /* AndList */: {
                            return LanguageFunctions_1.list(value, i18next_1.default.t('global:and', { lng: lang }));
                        }
                        case "orList" /* OrList */: {
                            return LanguageFunctions_1.list(value, i18next_1.default.t('global:or', { lng: lang }));
                        }
                        default:
                            return value;
                    }
                },
            },
        },
    },
};
//# sourceMappingURL=I18n.js.map