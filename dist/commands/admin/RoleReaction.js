"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
const async_1 = (0, tslib_1.__importDefault)(require("async"));
const decorators_1 = require("@sapphire/decorators");
const plugin_subcommands_1 = require("@sapphire/plugin-subcommands");
const _lib_1 = require("../../lib");
let default_1 = class extends plugin_subcommands_1.SubCommandPluginCommand {
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
    // private async firstEmbed() {
    //   return new EternityMessageEmbed().setTitle(await resolveKey(this.container.client, 'commands/RoleReaction:firstEmbed'));
    // }
    async create(msg, args) {
    }
    async delete(msg, args) {
    }
    async add(msg, args) {
    }
    async renew(msg, args) {
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        preconditions: ['GuildOnly', 'OwnerOnly'],
        subCommands: [
            'create',
            'renew',
            'delete',
            'add',
        ],
        enabled: false,
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=RoleReaction.js.map