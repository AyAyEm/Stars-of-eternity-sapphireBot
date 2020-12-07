"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const _lib_1 = require("@lib");
const _ = __importStar(require("lodash"));
const groupsDictionary = new Map([
    ['Enemy Mod Tables', 'Inimigos'],
    ['Mission Rewards', 'Recompensa de missão'],
]);
const rarityColorMap = new Map([
    ['Common', '#876f4e'],
    ['Uncommon', '#fefefe'],
    ['Rare', '#dec67c'],
    ['Legendary', '#fffeff'],
    ['Requiem', 'DARK_RED'],
]);
class ModEmbed {
    modItem;
    getBaseEmbed;
    constructor(modItem) {
        this.modItem = modItem;
        const { name, polarity, rarity, imageName, } = modItem;
        this.getBaseEmbed = () => new _lib_1.EternityMessageEmbed()
            .setTitle(`Mod: ${name}`)
            .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
            .setFooter(`${rarity} ${polarity}`)
            .setColor(rarityColorMap.get(rarity) || 'WHITE');
    }
    get mainInfoPage() {
        const { getBaseEmbed, modItem } = this;
        const { tradable, levelStats, transmutable, } = modItem;
        const embedPage = getBaseEmbed().addFields([
            { name: 'Trocável', value: tradable ? '✅' : '❌', inline: true },
            { name: 'Transmutável', value: transmutable ? '✅' : '❌', inline: true },
            { ..._lib_1.EternityMessageEmbed.blankField, inline: true },
        ]);
        if (levelStats) {
            const statsFields = levelStats[0].stats.map((stat, index) => {
                const percentageRegex = /[+-]?\d+%/;
                const minStat = stat.match(percentageRegex)?.[0];
                const maxStat = levelStats[levelStats.length - 1].stats[index].match(percentageRegex)?.[0];
                return [
                    { name: 'Atributo', value: stat, inline: true },
                    { name: 'Min/Max', value: `${minStat}/${maxStat}`, inline: true },
                    { ..._lib_1.EternityMessageEmbed.blankField, inline: true },
                ];
            });
            embedPage.addFields(statsFields.flat());
        }
        return embedPage;
    }
    get dropsPage() {
        const { getBaseEmbed, modItem: { drops } } = this;
        const embedPage = drops ? getBaseEmbed() : null;
        if (embedPage) {
            const dropsGroups = _.groupBy(drops, 'type');
            _.forEach(dropsGroups, (dropsList, group) => {
                const [locationsString, percentagesString,] = dropsList.reduce(([locations, percentages], { location, chance }) => ([
                    `${locations}${location}\n`,
                    `${percentages}${((chance || 0) * 100).toFixed(2)}%\n`,
                ]), ['', '']);
                const translatedGroup = groupsDictionary.get(group) || group;
                embedPage.addFields([
                    { name: translatedGroup, value: locationsString, inline: true },
                    { name: 'chance', value: percentagesString, inline: true },
                    { ..._lib_1.EternityMessageEmbed.blankField, inline: true },
                ]);
            });
        }
        return embedPage;
    }
}
function mod(modItem) {
    const modEmbed = new ModEmbed(modItem);
    const { mainInfoPage, dropsPage } = modEmbed;
    const embedMap = new Map();
    embedMap.set('📋', mainInfoPage);
    if (dropsPage)
        embedMap.set('♻', dropsPage);
    return embedMap;
}
exports.mod = mod;
