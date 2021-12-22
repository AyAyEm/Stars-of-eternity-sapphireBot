import { Target } from '@sapphire/plugin-i18next';
import { NonNullObject } from '@sapphire/utilities';
export declare function translationBy(target: Target, preKey: string): <O extends NonNullObject>(key: string, formatOptions?: O) => Promise<string>;
