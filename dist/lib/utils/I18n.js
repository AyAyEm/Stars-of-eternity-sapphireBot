"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationBy = exports.i18nClientOptions = void 0;
const tslib_1 = require("tslib");
require("@sapphire/plugin-i18next/register-discordjs");
const path_1 = tslib_1.__importDefault(require("path"));
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const LanguageFunctions_1 = require("./LanguageFunctions");
exports.i18nClientOptions = {
    i18n: {
        defaultName: 'pt-BR',
        defaultLanguageDirectory: path_1.default.resolve(__dirname.split('lib')[0], 'languages'),
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
function translationBy(preKey) {
    function translation(key, ...args) {
        return i18next_1.default.t(`${preKey}${key}`, ...args);
    }
    return translation;
}
exports.translationBy = translationBy;
//# sourceMappingURL=I18n.js.map