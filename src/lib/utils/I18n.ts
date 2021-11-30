import { resolveKey, Target } from '@sapphire/plugin-i18next';
import { NonNullObject } from '@sapphire/utilities';

export function translationBy(target: Target, preKey: string) {
  return function translate<O extends NonNullObject>(key: string, formatOptions?: O) {
    return resolveKey(target, `${preKey}${key}`, formatOptions);
  };
}
