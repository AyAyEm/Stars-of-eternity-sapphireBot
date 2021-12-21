import i18next from 'i18next';

import { Intents, ClientOptions } from 'discord.js';

import { SapphireClientOptions } from '@sapphire/framework';
import type { InternationalizationOptions } from '@sapphire/plugin-i18next';

import { list, EternityFormatters } from '#utils';

export const timezone = 'America/Sao_Paulo';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  process.env = { ...process.env, ...require('dotenv').config().parsed };
}

export const config = {
  ownersIds: ['163751711532515329'],
  token: process.env.DISCORD_TOKEN ?? '',
  redisUrl: (() => {
    const host = process.env.REDIS_HOSTNAME ?? 'localhost';
    const port = process.env.REDIS_PORT ?? '6379';

    return `redis://${host}:${port}`;
  })(),
  mongoUser: process.env.MONGO_USERNAME ?? 'admin',
  mongoPass: process.env.MONGO_PASSWORD ?? 'password',
  mongoUrl: (() => {
    const host = process.env.MONGO_HOSTNAME ?? 'localhost';
    const port = process.env.MONGO_PORT ?? '27017';
    const dbName = process.env.MONGO_DB_NAME ?? 'starsOfEternity';
    const dns = (process.env.MONGO_DNS ?? 'false') === 'true';

    return `mongodb${dns ? '+srv' : ''}://${host}${dns ? '' : `:${port}`}/${dbName}`;
  })(),
};

const intents = new Intents();
intents.add([
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
]);


export const i18nClientOptions: InternationalizationOptions = {
  fetchLanguage: () => 'pt-BR',
  i18next: {
    interpolation: {
      escapeValue: false,
      format: (value: unknown, format?: string, lang?: string) => {
        switch (format as EternityFormatters) {
          case EternityFormatters.AndList: {
            return list(value as string[], i18next.t('global:and', { lng: lang }));
          }
          case EternityFormatters.OrList: {
            return list(value as string[], i18next.t('global:or', { lng: lang }));
          }
          default:
            return value as string;
        }
      },
    },
  },
};

export const clientOptions: ClientOptions & SapphireClientOptions = {
  intents,
  caseInsensitiveCommands: true,
  i18n: i18nClientOptions,
};
