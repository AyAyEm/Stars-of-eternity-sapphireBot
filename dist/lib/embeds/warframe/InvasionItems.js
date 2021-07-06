"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Constants_1 = require("../../utils/Constants");
const { commonItems, uncommonItems, rareItems, weapons, goodOnes, faction, others, } = Constants_1.itemNames;
const fields = [
    { name: 'Recursos comums', value: commonItems.join(' | '), inline: false },
    { name: 'Recursos incomuns', value: uncommonItems.join(' | '), inline: false },
    { name: 'Recursos raros', value: rareItems.join(' | '), inline: false },
    { name: 'Armas', value: weapons.join(' | '), inline: false },
    { name: 'Melhores items', value: goodOnes.join(' | '), inline: false },
    { name: 'Items de facção', value: faction.join(' | '), inline: false },
    { name: 'Outros', value: others.join(' | '), inline: false },
];
exports.default = new discord_js_1.MessageEmbed()
    .addFields(fields)
    .setTitle('Possíveis opções de items para a invasão:');
//# sourceMappingURL=InvasionItems.js.map