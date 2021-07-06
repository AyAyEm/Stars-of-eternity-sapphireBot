import { EternityCommandWSC } from "../../lib";
import type { Args } from '@sapphire/framework';
import type { EternityMessage } from "../../lib";
export default class extends EternityCommandWSC {
    private document;
    private mapToEmbed;
    private get firstEmbed();
    subCommands: {
        create: (msg: EternityMessage, args: Args) => Promise<void>;
        delete: (msg: EternityMessage, args: Args) => Promise<void>;
        add: (msg: EternityMessage, args: Args) => Promise<void>;
        renew: (msg: EternityMessage, args: Args) => Promise<void>;
    };
}
