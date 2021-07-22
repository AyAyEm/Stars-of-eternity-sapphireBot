import { EternityCommandWSC } from "../../lib";
import type { EternityMessage } from "../../lib";
export default class extends EternityCommandWSC {
    private get fissureTrackerRepo();
    private setEnabled;
    enable(msg: EternityMessage): Promise<void>;
    disable(msg: EternityMessage): Promise<void>;
    reset(msg: EternityMessage): Promise<void>;
}
