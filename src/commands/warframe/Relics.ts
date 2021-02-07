import { EternityCommandWSC } from '@lib';
import { ApplyOptions } from '@sapphire/decorators';

import type { EternityCommandWSCOptions, EternityMessage } from '@lib';

@ApplyOptions<EternityCommandWSCOptions>({
  preconditions: ['GuildOnly'],
})
export default class extends EternityCommandWSC {
  public subCommands = {
    enable: async (msg: EternityMessage) => {
      const { guild, channel } = msg;
      const path = `channels.${channel.id}.relicTracker.enabled`;
      const document = await new this.client.provider.Guilds({ id: { id: guild.id } }).load;
      await document.set(path, true);
      msg.channel.sendTranslated('commands/Relics:succesfullEnabled');
    },

    disable: async (msg: EternityMessage) => {
      const { guild, channel } = msg;
      const path = `channels.${channel.id}.relicTracker.enabled`;
      const document = await new this.client.provider.Guilds({ id: { id: guild.id } }).load;
      await document.set(path, false);
      msg.channel.sendTranslated('commands/Relics:succesfullDisabled');
    },
  };
}
