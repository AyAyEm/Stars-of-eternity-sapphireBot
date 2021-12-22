import { ClientOptions } from 'discord.js';
import { SapphireClientOptions } from '@sapphire/framework';
import type { InternationalizationOptions } from '@sapphire/plugin-i18next';
export declare const timezone = "America/Sao_Paulo";
export declare const config: {
    ownersIds: string[];
    token: string;
    redisUrl: string;
    mongoUser: string;
    mongoPass: string;
    mongoUrl: string;
};
export declare const i18nClientOptions: InternationalizationOptions;
export declare const clientOptions: ClientOptions & SapphireClientOptions;
