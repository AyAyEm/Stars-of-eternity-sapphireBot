import { EternityCommandWSC, EternityMessageEmbed } from '@lib';
import type { EternityMessage } from '@lib';
import type { Args } from '@sapphire/framework';
export default class extends EternityCommandWSC {
    document(guildId: string): Promise<{
        document: any;
        query: import("../../lib/providers").Query;
        load: Promise<any>;
        reload(): Promise<any>;
        get<Result = unknown>(path: string, defaultType?: unknown): Promise<Result>;
        set<Value = unknown>(path: string, value: Value): Promise<any>;
    }>;
    possibleItemsEmbed: EternityMessageEmbed;
    items: {
        dictionary: Map<string, string>;
    };
    subCommands: {
        items: (msg: EternityMessage) => Promise<void>;
        listItems: (msg: EternityMessage) => Promise<void>;
        disable: (msg: EternityMessage) => Promise<void>;
        enable: (msg: EternityMessage) => Promise<void>;
        add: (msg: EternityMessage, args: Args) => Promise<void>;
        addAll: (msg: EternityMessage) => Promise<void>;
        delete: (msg: EternityMessage, args: Args) => Promise<void>;
        deleteAll: (msg: EternityMessage) => Promise<void>;
    };
}
