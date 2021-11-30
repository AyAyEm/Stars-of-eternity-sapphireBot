import { CommandOptions } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

import type { Message, TextChannel } from 'discord.js';

import { EternityCommand } from '#lib';
import { sendAndDelete } from '#utils';

@ApplyOptions<CommandOptions>({
  preconditions: ['OwnerOnly'],
})
export default class extends EternityCommand {
  public async messageRun(msg: Message) {
    const invite = `https://discord.com/oauth2/authorize?client_id=${this.container.client.id}&scope=bot`;

    sendAndDelete(msg.channel as TextChannel, { content: invite });
  }
}
