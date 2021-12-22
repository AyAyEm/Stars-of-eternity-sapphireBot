"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarframePagedEmbed = void 0;
const tslib_1 = require("tslib");
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
const extensions_1 = require("../../../extensions");
const _decorators_1 = require("../../../decorators");
const _utils_1 = require("../../../utils");
const BaseItem_1 = require("./BaseItem");
let WarframePagedEmbed = class WarframePagedEmbed extends BaseItem_1.BaseItemPagedEmbed {
    bpSource = _utils_1.ItemUtilities.blueprintSource(this.item);
    async baseEmbed() {
        const { name, imageName, masteryReq, category } = this.item;
        return new extensions_1.EternityMessageEmbed()
            .setTitle(`${name}`)
            .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
            .addField(await this.t('fields:category'), category, false)
            .setFooter(`${await this.t('footer:mastery')} ${masteryReq}`, _utils_1.masteryRankImgs[masteryReq || 0]);
    }
    async mainInfo() {
        const { components = [] } = this.item;
        const embed = await this.baseEmbed();
        embed.addField(await this.t('fields:status'), await this.t('warframe:fields:status', this.item), false);
        const prime = _utils_1.ItemUtilities.isPrime(this.item);
        const [resources, componentItems] = _utils_1.ItemUtilities.partitionComponents(components, prime);
        const { bpSource } = this;
        if ('location' in bpSource && 'id' in bpSource && !prime) {
            const blueprintString = bpSource.id === 1
                ? `${bpSource.location} Lab: ${bpSource.lab}`
                : `${bpSource.location}`;
            embed.addField(await this.t('fields:blueprint'), blueprintString, false);
        }
        if (componentItems.length > 0) {
            const componentsString = componentItems
                .map(({ name, itemCount }) => `${name} **${itemCount}**`)
                .join('\n');
            embed.addField(await this.t('fields:components'), componentsString, false);
        }
        if (resources.length > 0) {
            const resourcesNames = resources.map(({ name: resourceName, itemCount }) => (`${resourceName} **${itemCount}**`));
            embed.addField(await this.t('fields:resources'), resourcesNames.join('\n'), false);
        }
        return embed;
    }
    async componentsPage() {
        if (!this.item.components || this.item.components.length === 0) {
            return null;
        }
        const { components, category } = this.item;
        const embed = await this.baseEmbed();
        if (_utils_1.ItemUtilities.isPrime(this.item)) {
            const componentsFields = _utils_1.ItemUtilities.filterForPrimeComponents(components)
                .sort(({ name }) => (name === 'Blueprint' ? -1 : 1))
                .map(({ name, drops }) => {
                const bestDropsString = _utils_1.ItemUtilities.dropsString(_utils_1.ItemUtilities.bestDrops(drops));
                return { name, value: bestDropsString, inline: false };
            });
            embed.addFields(...componentsFields);
        }
        else {
            const [resources, componentItems] = _utils_1.ItemUtilities.partitionComponents(components, true);
            if (category === 'Warframes') {
                const componentsFields = componentItems
                    .filter(({ drops }) => drops && drops.length > 0)
                    .map(({ drops, name }) => {
                    const nameAndChance = lodash_1.default.uniqBy(drops, 'location')
                        .map((drop) => _utils_1.ItemUtilities.dropToNameAndChance(drop))
                        .sort(({ chance: a }, { chance: b }) => {
                        if (a === b)
                            return 0;
                        return a < b ? 1 : -1;
                    })
                        .slice(0, 3);
                    const dataString = nameAndChance
                        .map(({ name: enemyName, chance }) => `${enemyName} **${Math.round(chance * 100) / 100}%**`)
                        .join('\n');
                    return { name, value: dataString, inline: false };
                });
                embed.addFields(componentsFields);
            }
            else if (category === 'Archwing') {
                const componentsFields = componentItems
                    .map(({ name }) => ({ name, value: 'Tenno lab', inline: false }));
                embed.addFields(componentsFields);
            }
            if (resources.length > 0) {
                const resourcesString = resources
                    .map(({ name, itemCount }) => `${name} **${itemCount}**`)
                    .join('\n');
                embed.addField(await this.t('fields:resources'), resourcesString, false);
            }
        }
        return embed;
    }
};
(0, tslib_1.__decorate)([
    (0, _decorators_1.Page)({ emoji: '📋' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WarframePagedEmbed.prototype, "mainInfo", null);
(0, tslib_1.__decorate)([
    (0, _decorators_1.Page)({ emoji: '♻' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WarframePagedEmbed.prototype, "componentsPage", null);
WarframePagedEmbed = (0, tslib_1.__decorate)([
    (0, _decorators_1.InitPagedEmbed)()
], WarframePagedEmbed);
exports.WarframePagedEmbed = WarframePagedEmbed;
//# sourceMappingURL=Warframe.js.map