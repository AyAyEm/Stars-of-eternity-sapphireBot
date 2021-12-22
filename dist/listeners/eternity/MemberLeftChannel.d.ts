import { Listener } from '@sapphire/framework';
import type { VoiceChannel } from 'discord.js';
export default class extends Listener {
    run(channel: VoiceChannel): Promise<void>;
}
