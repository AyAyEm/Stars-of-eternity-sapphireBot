import { EternityCommandWSC } from "../../lib";
import type { EternityMessage } from "../../lib";
export default class extends EternityCommandWSC {
    subCommands: {
        enable: (msg: EternityMessage) => Promise<void>;
        disable: (msg: EternityMessage) => Promise<void>;
    };
}
