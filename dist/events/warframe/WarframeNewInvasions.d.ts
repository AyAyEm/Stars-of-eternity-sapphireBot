import { EternityEvent } from '@lib';
import type { InvasionData } from '@lib/types/Warframe';
export default class extends EternityEvent<'warframeNewInvasions'> {
    run(invasions: InvasionData[]): Promise<void>;
    private makeEmbeds;
}
