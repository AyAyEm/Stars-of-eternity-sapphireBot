import { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { replyLocalized } from '@sapphire/plugin-i18next';

import { EternityCommand, EternityCommandOptions } from '#lib';

@ApplyOptions<EternityCommandOptions>({
  preconditions: ['OwnerOnly'],
  aliases: ['wfs-update', 'wfsu', 'wfs-u', 'warframeItems-update'],
})
export default class extends EternityCommand {
  public async messageRun(msg: Message) {
    replyLocalized(msg, 'commands/WfsUpdate:updating');
    await this.container.warframe.items.create();
    replyLocalized(msg, 'commands/WfsUpdate:success');
  }
}
