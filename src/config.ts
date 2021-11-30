import dotenv from 'dotenv';
import i18next from 'i18next';

import { Intents, ClientOptions } from 'discord.js';

import { SapphireClientOptions } from '@sapphire/framework';
import type { InternationalizationOptions } from '@sapphire/plugin-i18next';

import { list, EternityFormatters } from '#utils';

export const timezone = 'America/Sao_Paulo';

const env = dotenv.config().parsed;
export const config = {
  ownersIds: ['163751711532515329'],
  token: env.DISCORD_TOKEN || '',
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
