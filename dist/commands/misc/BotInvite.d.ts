import { EternityCommand } from "../../lib";
import type { EternityMessage } from "../../lib";
export default class extends EternityCommand {
    run(msg: EternityMessage): Promise<void>;
}
