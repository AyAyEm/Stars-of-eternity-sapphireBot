import { EternityEvent } from '@lib';
import { AudioRecorder } from '@lib/eternity';
import type { Channel, VoiceState } from 'discord.js';
export default class extends EternityEvent<'clientJoinedChannel'> {
    recorders: Map<string, AudioRecorder>;
    run(_channel: Channel, state: VoiceState): Promise<void>;
}
