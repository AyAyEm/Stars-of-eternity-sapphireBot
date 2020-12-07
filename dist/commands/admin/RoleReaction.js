"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _lib_1 = require("@lib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const lodash_1 = __importDefault(require("lodash"));
const async_1 = __importDefault(require("async"));
const i18next_1 = __importDefault(require("i18next"));
let default_1 = class extends _lib_1.EternityCommandWSC {
    async document(guildId) {
        return new this.client.provider.Guilds(guildId);
    }
    async mapToEmbed(guild, emojiRoleMap, title) {
        const embed = new _lib_1.EternityMessageEmbed();
        const fields = [
            { name: 'Emoji', value: '', inline: true },
            { name: 'Cargo', value: '', inline: true },
        ];
        await async_1.default.forEach(emojiRoleMap.entries(), async ([emoji, roleId]) => {
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
    subCommands = {
        create: async (msg, args) => {
            const document = await this.document(msg.guild.id);
            const message = await msg.channel.send(this.firstEmbed);
            const messageContent = {
                emojiRoleMap: new Map(),
                msgType: 'roleReaction',
            };
            await args.pickResult('string')
                .then((result) => { if (result.success)
                messageContent.title = result.value; });
            document.set(`channels.${msg.channel.id}.messages.${message.id}`, messageContent);
        },
        delete: async (msg, args) => {
            const document = await this.document(msg.guild.id);
            const messagesPath = `channels.${msg.channel.id}.messages`;
            const messages = await document.get(messagesPath);
            const roleReactionMessage = await args.pickResult('message')
                .then((result) => {
                if (result.success && messages.has(result.value.id)) {
                    return result.value;
                }
                throw new framework_1.UserError('commands/RoleReaction:delete:invalidRoleReactionMessage', 'invalidRoleReactionMessage');
            });
            messages.delete(roleReactionMessage.id);
            document.set(messagesPath, messages);
            roleReactionMessage.delete();
            (await msg.replyTranslated('commands/RoleReaction:delete:success'))
                .delete({ timeout: 20000 });
            msg.delete({ timeout: 20000 });
        },
        add: async (msg, args) => {
            const document = await this.document(msg.guild.id);
            const emoji = await args.pick('emoji');
            const role = await args.pick('role');
            const messages = await document.get(`channels.${msg.channel.id}.messages`, Map);
            const roleEmojiMessage = await args.pickResult('message').then((result) => {
                if (result.success && messages.has(result.value.id))
                    return result.value;
                return msg.channel.messages.fetch(lodash_1.default.last([...messages.keys()]));
            });
            await roleEmojiMessage.react(emoji.toString());
            const { emojiRoleMap, title } = messages.get(roleEmojiMessage.id);
            emojiRoleMap.set(emoji.toString(), role.id);
            await roleEmojiMessage.edit(await this.mapToEmbed(msg.guild, emojiRoleMap, title));
            await document.set(`channels.${msg.channel.id}.messages.${roleEmojiMessage.id}.emojiRoleMap`, emojiRoleMap);
            (await msg.replyTranslated('commands/RoleReaction:add:success'))
                .delete({ timeout: 20000 });
            msg.delete({ timeout: 20000 });
        },
        renew: async (msg, args) => {
            const document = await this.document(msg.guild.id);
            const messagesPath = `channels.${msg.channel.id}.messages`;
            const messages = await document.get(`channels.${msg.channel.id}.messages`, Map);
            const emojiRoleMessage = await args.pickResult('message').then((result) => {
                if (result.success && messages.has(result.value.id))
                    return result.value;
                return msg.channel.messages.fetch(lodash_1.default.last([...messages.keys()]));
            });
            const { emojiRoleMap, title } = messages.get(emojiRoleMessage.id);
            const messageContent = emojiRoleMap.size > 0
                ? await this.mapToEmbed(msg.guild, emojiRoleMap, title)
                : this.firstEmbed;
            const newEmojiRoleMessage = await msg.channel.send(messageContent);
            messages.delete(emojiRoleMessage.id);
            messages.set(newEmojiRoleMessage.id, { emojiRoleMap, msgType: 'roleReaction' });
            await document.set(messagesPath, messages);
            await emojiRoleMessage.delete();
            (await msg.replyTranslated('commands/RoleReaction:renew:success'))
                .delete({ timeout: 20000 });
            msg.delete({ timeout: 20000 });
        },
    };
};
default_1 = __decorate([
    decorators_1.ApplyOptions({
        preconditions: ['GuildOnly', 'OwnerOnly'],
        subAliases: [
            ['delete', ['remove']],
        ],
        requiredArgs: [
            ['delete', ['message']],
            ['add', ['emoji', 'role']],
        ],
    })
], default_1);
exports.default = default_1;
