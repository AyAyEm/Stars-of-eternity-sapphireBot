import '@sapphire/plugin-i18next/register-discordjs';
import type { TOptions, StringMap } from 'i18next';
export declare const i18nClientOptions: {
    i18n: {
        defaultName: string;
        defaultLanguageDirectory: string;
        i18next: {
            fallbackNS: string;
            interpolation: {
                format: (value: unknown, format?: string, lang?: string) => string;
            };
        };
    };
};
export declare function translationBy(preKey: string): {
    (key: string, defaultValue: string, options?: TOptions<StringMap> | TOptions<StringMap>[]): string;
    (key: string, options?: TOptions<StringMap> | TOptions<StringMap>[]): string;
};
