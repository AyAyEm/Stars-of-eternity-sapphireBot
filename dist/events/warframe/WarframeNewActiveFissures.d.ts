import { EternityEvent } from "../../lib";
import type { Fissure } from "../../lib/types/Warframe";
export default class extends EternityEvent<'warframeNewActiveFissures'> {
    run(fissures: Fissure[]): Promise<void>;
}
