"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponPagedEmbed = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const _utils_1 = require("../../../utils");
const extensions_1 = require("../../../extensions");
const _decorators_1 = require("../../../decorators");
const SpecialItems_1 = require("./SpecialItems");
const BaseItem_1 = require("./BaseItem");
let WeaponPagedEmbed = class WeaponPagedEmbed extends BaseItem_1.BaseItemPagedEmbed {
    bpSource = _utils_1.ItemUtilities.blueprintSource(this.item);
    baseEmbed() {
        const { name, type, imageName, category, masteryReq, disposition = 1, } = this.item;
        const fields = [{ name: this.t('fields:category'), value: category, inline: true }];
        if (type)
            fields.push({ name: this.t('fields:type'), value: type, inline: true });
        return new extensions_1.EternityMessageEmbed()
            .setTitle(`${name} ${_utils_1.rivenDisposition[disposition - 1]}`)
            .addFields(fields)
            .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
            .setFooter(`${this.t('footer:mastery')} ${masteryReq}`, _utils_1.masteryRankImgs[masteryReq || 0]);
    }
    mainInfo() {
        const embed = this.baseEmbed();
        const specialAdjustment = SpecialItems_1.specialItems.get(this.item.name);
        if (specialAdjustment)
            return specialAdjustment(embed);
        const { components = [] } = this.item;
        const [resources, componentItems] = _utils_1.ItemUtilities.partitionComponents(components);
        if (_utils_1.ItemUtilities.isPrime(this.item)) {
            const primeComponentsString = _utils_1.ItemUtilities.filterForPrimeComponents(components)
                .sort(({ name }) => (name === 'Blueprint' ? -1 : 0))
                .reduce((strings, component) => `${strings}${component.name} **${component.itemCount}**\n`, '');
            embed.addField(this.t('fields:components'), primeComponentsString, false);
            const resourcesString = components
                .filter(({ uniqueName }) => uniqueName.split('/')[3] === 'Items')
                .reduce((string, resource) => `${string}${resource.name} **${resource.itemCount}**\n`, '');
            if (resourcesString) {
                embed.addField(this.t('fields:resources'), resourcesString, false);
            }
        }
        else {
            if ('id' in this.bpSource && 'location' in this.bpSource) {
                const blueprintString = this.bpSource.id === 1
                    ? `${this.bpSource.location} Lab: ${this.bpSource.lab}`
                    : `${this.bpSource.location}`;
                embed.addField(this.t('fields:blueprint'), blueprintString, false);
            }
            if (componentItems.length > 0) {
                const componentsString = componentItems
                    .map(({ name, itemCount }) => `${name} **${itemCount}**`)
                    .join('\n');
                embed.addField(this.t('fields:components'), componentsString, false);
            }
            if (resources.length > 0) {
                const resourcesNames = resources.map(({ name, itemCount }) => `${name} **${itemCount}**`);
                embed.addField(this.t('fields:resources'), resourcesNames.join('\n'), false);
            }
        }
        return embed;
    }
    components() {
        const embed = this.baseEmbed();
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
                embed.addField(this.t('fields:resources'), resourcesString, false);
            }
        }
        return embed;
    }
    status() {
        const embed = this.baseEmbed();
        const { criticalChance, criticalMultiplier, procChance, fireRate, accuracy, trigger, magazineSize, reloadTime, ammo, damageTypes = {}, totalDamage, projectile, category,
        // flight,secondary,areaAttack, damage, multishot, noise,
         } = this.item;
        const embedStrings = {
            critical: this.t('weapon:fields:critical', { chance: lodash_1.default.round(criticalChance * 100, 2), multiplier: criticalMultiplier }),
            status: this.t('weapon:fields:status', { chance: lodash_1.default.round(procChance * 100, 2) }),
            damage: `${Object.entries(damageTypes).map(([type, dmg]) => `${type}: ${dmg}`).join('\n')}`,
            ammo: this.t('weapon:fields:ammo', { ammo, magazineSize }),
            utility: [
                this.t(
                // eslint-disable-next-line no-constant-condition
                `weapon:fields:utility:${category === 'Melee' || 'Arch-Melee' ? 'attackSpeed' : 'fireRate'}`, { fireRate: lodash_1.default.round(fireRate, 2) }),
                `${trigger ? this.t('weapon:fields:utility:trigger', { trigger }) : ''}`,
                `${projectile ? this.t('weapon:fields:utility:projectile', { projectile }) : ''}`,
                `${reloadTime ? this.t('weapon:fields:utility:reloadTime', { reloadTime }) : ''}`,
                `${accuracy ? this.t('weapon:fields:utility:accuracy', { accuracy: lodash_1.default.round(accuracy, 2) }) : ''}`,
            ].filter((str) => str).join('\n'),
        };
        const fields = [
            { name: this.t('fields:damage', { totalDamage }), value: embedStrings.damage, inline: false },
            { name: this.t('fields:critical'), value: embedStrings.critical, inline: false },
            { name: this.t('fields:status'), value: embedStrings.status, inline: false },
            { name: this.t('fields:utility'), value: embedStrings.utility, inline: false },
        ];
        if (ammo)
            fields.push({ name: this.t('fields:ammo'), value: embedStrings.ammo, inline: true });
        embed.addFields(fields);
        return embed;
    }
};
tslib_1.__decorate([
    _decorators_1.Page({ emoji: '📋' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], WeaponPagedEmbed.prototype, "mainInfo", null);
tslib_1.__decorate([
    _decorators_1.Page({ emoji: '♻' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], WeaponPagedEmbed.prototype, "components", null);
tslib_1.__decorate([
    _decorators_1.Page({ emoji: '🃏' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], WeaponPagedEmbed.prototype, "status", null);
WeaponPagedEmbed = tslib_1.__decorate([
    _decorators_1.InitPagedEmbed()
], WeaponPagedEmbed);
exports.WeaponPagedEmbed = WeaponPagedEmbed;
//# sourceMappingURL=Weapon.js.map