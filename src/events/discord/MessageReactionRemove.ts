import { EternityEvent } from '@lib';
import { Events } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

import type { EventOptions } from '@sapphire/framework';
import type { MessageReaction, User } from 'discord.js';

@ApplyOptions<EventOptions>({ event: Events.MessageReactionRemove })
export default class extends EternityEvent<Events.MessageReactionRemove> {
  public async run(messageReaction: MessageReaction, user: User) {}
}
