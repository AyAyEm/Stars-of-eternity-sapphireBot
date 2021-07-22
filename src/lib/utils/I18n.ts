import '@sapphire/plugin-i18next/register-discordjs';
import path from 'path';

import i18next from 'i18next';

import type { TOptions, StringMap } from 'i18next';

import { list } from './LanguageFunctions';
import { EternityFormatters } from './Enums';

export const i18nClientOptions = {
  i18n: {
    defaultName: 'pt-BR',
    defaultLanguageDirectory: path.resolve(__dirname.split('lib')[0], 'languages'),
    i18next: {
      fallbackNS: 'default',
      interpolation: {
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
  },
};

export function translationBy(preKey: string) {
  function translation(
    key: string,
    defaultValue: string,
    options?: TOptions<StringMap> | TOptions<StringMap>[]
  ): string;
  function translation(key: string, options?: TOptions<StringMap> | TOptions<StringMap>[]): string;
  function translation(
    key: string,
    ...args: Array<string | TOptions<StringMap> | TOptions<StringMap>[]>
  ) {
    return i18next.t(`${preKey}${key}`, ...args);
  }

  return translation;
}
