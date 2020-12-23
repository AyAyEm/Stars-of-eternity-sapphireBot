import { EternityCommand } from '@lib';
import { ApplyOptions } from '@sapphire/decorators';

import type { EternityCommandOptions, EternityMessage } from '@lib';

@ApplyOptions<EternityCommandOptions>({
  preconditions: ['OwnerOnly'],
  aliases: ['wfs-update', 'wfsu', 'wfs-u', 'warframeItems-update'],
})
export default class extends EternityCommand {
  public async run(msg: EternityMessage) {
    msg.replyTranslated('commands/WfsUpdate:updating');
    await this.client.warframe.items.create();
    msg.replyTranslated('commands/WfsUpdate:success');
  }
}
