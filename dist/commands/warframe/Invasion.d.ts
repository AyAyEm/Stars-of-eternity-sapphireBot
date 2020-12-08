import { EternityCommandWSC, EternityMessageEmbed } from '@lib';
import type { EternityMessage } from '@lib';
import type { Args } from '@sapphire/framework';
export default class extends EternityCommandWSC {
    document(guildId: string): Promise<{
        document: import("@typegoose/typegoose").DocumentType<import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/models").Guilds, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/models").Trackers, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/models").Users, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/models").Utils, {}>>;
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
