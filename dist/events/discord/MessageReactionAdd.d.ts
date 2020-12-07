import { EternityEvent } from '@lib';
import { Events } from '@sapphire/framework';
import type { MessageReaction, User } from 'discord.js';
export default class extends EternityEvent<Events.MessageReactionRemove> {
    run(messageReaction: MessageReaction, user: User): Promise<void>;
}
