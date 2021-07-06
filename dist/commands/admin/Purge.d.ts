import { EternityCommand, EternityMessage } from "../../lib";
import { Args } from '@sapphire/framework';
export default class extends EternityCommand {
    run(msg: EternityMessage, args: Args): Promise<void>;
}
