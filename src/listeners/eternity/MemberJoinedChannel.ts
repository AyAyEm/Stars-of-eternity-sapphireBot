import { Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

import type { VoiceChannel } from 'discord.js';

import { toJoinChannel } from '#lib/eternity';

@ApplyOptions<Listener.Options>({ event: 'memberJoinedChannel', enabled: false })
export default class extends Listener {
  public async run(channel: VoiceChannel) {
    toJoinChannel(channel);
  }
}
