"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModPagedEmbed = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const _decorators_1 = require("../../../decorators");
const _lib_1 = require("../../..");
const BaseItem_1 = require("./BaseItem");
let ModPagedEmbed = class ModPagedEmbed extends BaseItem_1.BaseItemPagedEmbed {
    rarityColorMap = new Map([
        ['Common', '#876f4e'],
        ['Uncommon', '#fefefe'],
        ['Rare', '#dec67c'],
        ['Legendary', '#fffeff'],
        ['Requiem', 'DARK_RED'],
    ]);
    baseEmbed() {
        const { name, rarity, polarity, imageName } = this.item;
        return new _lib_1.EternityMessageEmbed()
            .setTitle(`Mod: ${name}`)
            .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
            .setFooter(`${rarity} ${polarity}`)
            .setColor(this.rarityColorMap.get(rarity) || 'WHITE');
    }
    mainInfo() {
        const { tradable, levelStats, transmutable } = this.item;
        const embed = this.baseEmbed();
        embed.addFields([
            { name: this.t('fields:tradable'), value: tradable ? '✅' : '❌', inline: true },
            { name: this.t('fields:transmutable'), value: transmutable ? '✅' : '❌', inline: true },
            { ..._lib_1.EternityMessageEmbed.blankField, inline: true },
        ]);
        if (levelStats) {
            const percentageRegex = /[+-]?\d+%/;
            const statsFields = levelStats[levelStats.length - 1].stats.map((stat, index) => {
                const minStat = levelStats[0].stats[index].match(percentageRegex)?.[0];
                const maxStat = stat.match(percentageRegex)?.[0];
                return [
                    { name: this.t('fields:stat'), value: stat, inline: true },
                    { name: this.t('fields:minMax'), value: `${minStat}/${maxStat}`, inline: true },
                    { ..._lib_1.EternityMessageEmbed.blankField, inline: true },
                ];
            });
            embed.addFields(statsFields.flat());
        }
        return embed;
    }
    dropsPage() {
        const { drops } = this.item;
        if (!drops)
            return null;
        const embed = this.baseEmbed();
        lodash_1.default(drops)
            .groupBy('type')
            .forEach((dropsList, group) => {
            const [locationsString, percentagesString,] = dropsList.reduce(([locations, percentages], { location, chance = 0 }) => ([
                `${locations}${location}\n`,
                `${percentages}${lodash_1.default.round(chance * 100, 2)}%\n`,
            ]), ['', '']);
            embed.addFields([
                { name: this.t(`mod:groups:${group}`, group), value: locationsString, inline: true },
                { name: this.t('fields:chance'), value: percentagesString, inline: true },
                { ..._lib_1.EternityMessageEmbed.blankField, inline: true },
            ]);
        });
        return embed;
    }
};
tslib_1.__decorate([
    _decorators_1.Page({ emoji: '📋' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ModPagedEmbed.prototype, "mainInfo", null);
tslib_1.__decorate([
    _decorators_1.Page({ emoji: '♻' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ModPagedEmbed.prototype, "dropsPage", null);
ModPagedEmbed = tslib_1.__decorate([
    _decorators_1.InitPagedEmbed()
], ModPagedEmbed);
exports.ModPagedEmbed = ModPagedEmbed;
//# sourceMappingURL=Mod.js.map