"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponPagedEmbed = void 0;
const tslib_1 = require("tslib");
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
const _utils_1 = require("../../../utils");
const extensions_1 = require("../../../extensions");
const _decorators_1 = require("../../../decorators");
const BaseItem_1 = require("./BaseItem");
let WeaponPagedEmbed = class WeaponPagedEmbed extends BaseItem_1.BaseItemPagedEmbed {
    _specialWeapons;
    async specialWeapons() {
        if (!this._specialWeapons) {
            const specialItemsT = (0, _utils_1.translationBy)(this.channel, 'embeds/itemSearch:specialItems:');
            const embedFieldsT = (0, _utils_1.translationBy)(this.channel, 'embeds/itemSearch:fields:');
            const loginWeapon = await specialItemsT('loginWeapon', { startDay: '100', example: '100, 300, 500, 700, 900' });
            const sigmaWeapon = await specialItemsT('loginWeapon', { startDay: '300', example: '300, 500, 700, 900' });
            function acquisitionField(value, inline = false) {
                return async (embed) => embed.addField(await embedFieldsT('acquisition'), value, inline);
            }
            this._specialWeapons = new Map([
                ['Azima', acquisitionField(loginWeapon)],
                ['Zenistar', acquisitionField(loginWeapon)],
                ['Zenith', acquisitionField(loginWeapon)],
                ['Sigma & Octantis', acquisitionField(sigmaWeapon)],
            ]);
        }
        return this._specialWeapons;
    }
    bpSource = _utils_1.ItemUtilities.blueprintSource(this.item);
    async baseEmbed() {
        const { name, type, imageName, category, masteryReq, disposition = 1, } = this.item;
        const fields = [{
                name: await this.t('fields:category'),
                value: category,
                inline: true,
            }];
        if (type)
            fields.push({ name: await this.t('fields:type'), value: type, inline: true });
        return new extensions_1.EternityMessageEmbed()
            .setTitle(`${name} ${_utils_1.rivenDisposition[disposition - 1]}`)
            .addFields(fields)
            .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
            .setFooter(`${await this.t('footer:mastery')} ${masteryReq}`, _utils_1.masteryRankImgs[masteryReq || 0]);
    }
    async mainInfo() {
        const embed = await this.baseEmbed();
        const specialAdjustment = (await this.specialWeapons()).get(this.item.name);
        if (specialAdjustment)
            return specialAdjustment(embed);
        const { components = [] } = this.item;
        const [resources, componentItems] = _utils_1.ItemUtilities.partitionComponents(components);
        if (_utils_1.ItemUtilities.isPrime(this.item)) {
            const primeComponentsString = _utils_1.ItemUtilities.filterForPrimeComponents(components)
                .sort(({ name }) => (name === 'Blueprint' ? -1 : 0))
                .reduce((strings, component) => `${strings}${component.name} **${component.itemCount}**\n`, '');
            embed.addField(await this.t('fields:components'), primeComponentsString, false);
            const resourcesString = components
                .filter(({ uniqueName }) => uniqueName.split('/')[3] === 'Items')
                .reduce((string, resource) => `${string}${resource.name} **${resource.itemCount}**\n`, '');
            if (resourcesString) {
                embed.addField(await this.t('fields:resources'), resourcesString, false);
            }
        }
        else {
            if ('id' in this.bpSource && 'location' in this.bpSource) {
                const blueprintString = this.bpSource.id === 1
                    ? `${this.bpSource.location} Lab: ${this.bpSource.lab}`
                    : `${this.bpSource.location}`;
                embed.addField(await this.t('fields:blueprint'), blueprintString, false);
            }
            if (componentItems.length > 0) {
                const componentsString = componentItems
                    .map(({ name, itemCount }) => `${name} **${itemCount}**`)
                    .join('\n');
                embed.addField(await this.t('fields:components'), componentsString, false);
            }
            if (resources.length > 0) {
                const resourcesNames = resources.map(({ name, itemCount }) => `${name} **${itemCount}**`);
                embed.addField(await this.t('fields:resources'), resourcesNames.join('\n'), false);
            }
        }
        return embed;
    }
    async components() {
        const embed = await this.baseEmbed();
        const { components } = this.item;
        if (!('location' in this.bpSource) || this.bpSource.location !== 'Drop' || !components) {
            return null;
        }
        if (_utils_1.ItemUtilities.isPrime(this.item)) {
            const componentsFields = components
                .filter(({ drops = [] }) => drops[0]?.location?.toLowerCase().includes('relic'))
                .sort(({ name }) => (name === 'Blueprint' ? -1 : 1))
                .map(({ name, drops }) => {
                const bestDropsString = _utils_1.ItemUtilities.dropsString(_utils_1.ItemUtilities.bestDrops(drops));
                return { name, value: bestDropsString, inline: false };
            });
            embed.addFields(...componentsFields);
        }
        else {
            const [resources, componentItems] = _utils_1.ItemUtilities.partitionComponents(components);
            const componentsFields = componentItems.map(({ drops, name }) => {
                const nameAndChance = lodash_1.default.uniqBy(drops, 'location')
                    .map((drop) => _utils_1.ItemUtilities.dropToNameAndChance(drop))
                    .sort(({ chance: A }, { chance: B }) => B - A)
                    .slice(0, 3);
                const dataString = nameAndChance
                    .map(({ name: enemyName, chance }) => `${enemyName} **${Math.round(chance * 100) / 100}%**`)
                    .join('\n');
                return { name, value: dataString, inline: false };
            });
            embed.addFields(componentsFields);
            if (resources.length > 0) {
                const resourcesString = resources
                    .map(({ name, itemCount }) => `${name} **${itemCount}**`)
                    .join('\n');
                embed.addField(await this.t('fields:resources'), resourcesString, false);
            }
        }
        return embed;
    }
    async status() {
        const embed = await this.baseEmbed();
        const { criticalChance, criticalMultiplier, procChance, fireRate, accuracy, trigger, magazineSize, reloadTime, ammo, damageTypes = {}, totalDamage, projectile, category,
        // flight,secondary,areaAttack, damage, multishot, noise,
         } = this.item;
        const embedStrings = {
            critical: await this.t('weapon:fields:critical', { chance: lodash_1.default.round(criticalChance * 100, 2), multiplier: criticalMultiplier }),
            status: await this.t('weapon:fields:status', { chance: lodash_1.default.round(procChance * 100, 2) }),
            damage: `${Object.entries(damageTypes).map(([type, dmg]) => `${type}: ${dmg}`).join('\n')}`,
            ammo: await this.t('weapon:fields:ammo', { ammo, magazineSize }),
            utility: [
                await this.t(`weapon:fields:utility:${category === 'Melee' || 'Arch-Melee' ? 'attackSpeed' : 'fireRate'}`, { fireRate: lodash_1.default.round(fireRate, 2) }),
                `${trigger ? await this.t('weapon:fields:utility:trigger', { trigger }) : ''}`,
                `${projectile ? await this.t('weapon:fields:utility:projectile', { projectile }) : ''}`,
                `${reloadTime ? await this.t('weapon:fields:utility:reloadTime', { reloadTime }) : ''}`,
                `${accuracy ? await this.t('weapon:fields:utility:accuracy', { accuracy: lodash_1.default.round(accuracy, 2) }) : ''}`,
            ].filter((str) => str).join('\n'),
        };
        const fields = [
            { name: await this.t('fields:damage', { totalDamage }), value: embedStrings.damage, inline: false },
            { name: await this.t('fields:critical'), value: embedStrings.critical, inline: false },
            { name: await this.t('fields:status'), value: embedStrings.status, inline: false },
            { name: await this.t('fields:utility'), value: embedStrings.utility, inline: false },
        ];
        if (ammo)
            fields.push({ name: await this.t('fields:ammo'), value: embedStrings.ammo, inline: true });
        embed.addFields(fields);
        return embed;
    }
};
(0, tslib_1.__decorate)([
    (0, _decorators_1.Page)({ emoji: '📋' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WeaponPagedEmbed.prototype, "mainInfo", null);
(0, tslib_1.__decorate)([
    (0, _decorators_1.Page)({ emoji: '♻' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WeaponPagedEmbed.prototype, "components", null);
(0, tslib_1.__decorate)([
    (0, _decorators_1.Page)({ emoji: '🃏' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WeaponPagedEmbed.prototype, "status", null);
WeaponPagedEmbed = (0, tslib_1.__decorate)([
    (0, _decorators_1.InitPagedEmbed)()
], WeaponPagedEmbed);
exports.WeaponPagedEmbed = WeaponPagedEmbed;
//# sourceMappingURL=Weapon.js.map