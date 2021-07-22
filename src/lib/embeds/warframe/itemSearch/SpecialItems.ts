import { translationBy } from '#utils';

import type { EternityMessageEmbed } from '#lib/extensions';

const specialItemsT = translationBy('embeds/itemSearch:specialItems:');
const embedFieldsT = translationBy('embeds/itemSearch:fields:');

const loginWeapon = specialItemsT('loginWeapon', { startDay: '100', example: '100, 300, 500, 700, 900' });
const sigmaWeapon = specialItemsT('loginWeapon', { startDay: '300', example: '300, 500, 700, 900' });

function acquisitionField(value: string, inline = false) {
  return (embed: EternityMessageEmbed) => embed.addField(embedFieldsT('acquisition'), value, inline);
}

export const specialItems = new Map([
  ['Azima', acquisitionField(loginWeapon)],
  ['Zenistar', acquisitionField(loginWeapon)],
  ['Zenith', acquisitionField(loginWeapon)],
  ['Sigma & Octantis', acquisitionField(sigmaWeapon)],
]);
