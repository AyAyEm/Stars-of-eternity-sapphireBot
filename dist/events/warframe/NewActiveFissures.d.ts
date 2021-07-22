import { EternityEvent } from "../../lib";
import type { Fissure as WarframeFissure } from "../../lib/types/Warframe";
export default class extends EternityEvent<'warframeNewActiveFissures'> {
    run(fissures: WarframeFissure[]): Promise<void>;
}
