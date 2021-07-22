"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const async_1 = tslib_1.__importDefault(require("async"));
const decorators_1 = require("@sapphire/decorators");
const typeorm_1 = require("typeorm");
const _lib_1 = require("../../lib");
const _repositories_1 = require("../../lib/typeorm/repositories");
let default_1 = class extends _lib_1.EternityCommandWSC {
    async mapToEmbed(guild, roleEmoji, title) {
        const embed = new _lib_1.EternityMessageEmbed();
        const fields = [
            { name: 'Emoji', value: '', inline: true },
            { name: 'Cargo', value: '', inline: true },
        ];
        await async_1.default.forEach(roleEmoji.entries(), async ([roleId, emoji]) => {
            const role = await guild.roles.fetch(roleId);
            const [emojiField, roleField] = fields;
            roleField.value += `${role?.name}\n`;
            emojiField.value += `${emoji}\n`;
        });
        if (title)
            embed.setTitle(title);
        embed.addFields(...fields);
        return embed;
    }
    get firstEmbed() {
        return new _lib_1.EternityMessageEmbed().setTitle(i18next_1.default.t('commands/RoleReaction:firstEmbed'));
    }
    get roleReactionRepo() {
        return typeorm_1.getCustomRepository(_repositories_1.RoleReactionRepository);
    }
    async create(msg, args) {
    }
    async delete(msg, args) {
    }
    async add(msg, args) {
    }
    async renew(msg, args) {
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        preconditions: ['GuildOnly', 'OwnerOnly'],
        subCommands: [
            'create',
            'renew',
            { name: 'delete', requiredArgs: ['message'], aliases: ['remove'] },
            { name: 'add', requiredArgs: ['emoji', 'role'] },
        ],
        enabled: false,
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=RoleReaction.js.map