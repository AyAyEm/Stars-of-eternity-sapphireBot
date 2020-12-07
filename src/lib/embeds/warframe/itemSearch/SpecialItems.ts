import type { MessageEmbed } from 'discord.js';

const loginWeapon = 'Arma de login\nAdquirida como opção de recompensa diária\nDe 200 em 200'
  + ' dias a partir do 100\n**Exemplo**:\n*[100, 300, 500, 700, 900...]*';
const sigmaWeapon = 'Arma de login\nAdquirida como opção de recompensa diária\nDe 200 em 200'
  + ' dias a partir do 300\n**Exemplo**:\n*[300, 500, 700, 900...]*';

function acquisitionField(value: string, inline = false) {
  return (embed: MessageEmbed) => embed.addField('Aquisição', value, inline);
}

export default new Map([
  ['Athodai', acquisitionField('TennoCon 2020\nAssistindo a live por 30 minutos na Twitch')],
  ['Azima', acquisitionField(loginWeapon)],
  ['Zenistar', acquisitionField(loginWeapon)],
  ['Zenith', acquisitionField(loginWeapon)],
  ['Sigma & Octantis', acquisitionField(sigmaWeapon)],
]);
