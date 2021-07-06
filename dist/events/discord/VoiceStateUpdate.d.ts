import { EternityEvent } from "../../lib";
import { Events } from '@sapphire/framework';
import type { VoiceState } from 'discord.js';
export default class extends EternityEvent<Events.VoiceStateUpdate> {
    run(oldState: VoiceState, newState: VoiceState): Promise<void>;
}
