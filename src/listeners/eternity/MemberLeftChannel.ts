import { Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

import type { VoiceChannel } from 'discord.js';

import { toJoinChannel } from '#lib/eternity';

@ApplyOptions<Listener.Options>({ event: 'memberLeftChannel', enabled: false })
export default class extends Listener {
  public async run(channel: VoiceChannel) {
    toJoinChannel(channel);
  }
}
