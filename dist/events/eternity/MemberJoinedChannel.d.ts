import { EternityEvent } from "../../lib";
import type { EternityVoiceChannel } from "../../lib";
export default class extends EternityEvent<'memberJoinedChannel'> {
    run(channel: EternityVoiceChannel): Promise<void>;
}
