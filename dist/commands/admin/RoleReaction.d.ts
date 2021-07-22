import type { Args } from '@sapphire/framework';
import { EternityCommandWSC } from "../../lib";
import type { EternityMessage } from "../../lib";
export default class extends EternityCommandWSC {
    private mapToEmbed;
    private get firstEmbed();
    private get roleReactionRepo();
    create(msg: EternityMessage, args: Args): Promise<void>;
    delete(msg: EternityMessage, args: Args): Promise<void>;
    add(msg: EternityMessage, args: Args): Promise<void>;
    renew(msg: EternityMessage, args: Args): Promise<void>;
}
