"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
let default_1 = class extends _lib_1.EternityEvent {
    async run(packet) {
        // We don't want this to run on unrelated packets
        if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t))
            return;
        // Grab the channel to check the message from
        const channel = await this.client.channels.fetch(packet.d.channel_id, true);
        // There's no need to emit if the message is cached, because the event will fire anyway for that
        if (channel.messages.cache.has(packet.d.message_id))
            return;
        // Since we have confirmed the message is not cached, let's fetch it
        channel.messages.fetch(packet.d.message_id).then((message) => {
            // Emojis can have identifiers of name:id format, so we have to account for that case as well
            const emoji = packet.d.emoji.id ? packet.d.emoji.id : packet.d.emoji.name;
            // This gives us the reaction we need to emit the event properly, in top of the message object
            const reaction = new discord_js_1.MessageReaction(this.client, {
                emoji: {
                    name: emoji, id: null,
                },
            }, message);
            // Adds the currently reacting user to the reaction's users collection.
            const user = this.client.users.resolve(packet.d.user_id);
            if (reaction)
                reaction.users.cache.set(packet.d.user_id, user);
            // Check which type of event it is before emitting
            if (packet.t === 'MESSAGE_REACTION_ADD') {
                this.client.emit('messageReactionAdd', reaction, user);
            }
            if (packet.t === 'MESSAGE_REACTION_REMOVE') {
                this.client.emit('messageReactionRemove', reaction, user);
            }
        });
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: 'raw' })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Raw.js.map