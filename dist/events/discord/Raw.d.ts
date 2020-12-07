import { EternityEvent } from '@lib';
import type { RawPacket } from '@lib/types/Discord';
export default class extends EternityEvent<'raw'> {
    run(packet: RawPacket): Promise<void>;
}
