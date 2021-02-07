import '@sapphire/plugin-i18next/register-discordjs';
export declare const clientOptions: {
    i18n: {
        defaultName: string;
        i18next: {
            fallbackNS: string;
            interpolation: {
                format: (value: unknown, format?: string, lang?: string) => string;
            };
        };
    };
};
