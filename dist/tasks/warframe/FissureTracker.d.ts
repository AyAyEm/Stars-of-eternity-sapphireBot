import { Task } from '@lib/structures';
export default class extends Task {
    document: {
        document: import("@typegoose/typegoose").DocumentType<import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/models").Guilds, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/models").Trackers, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/models").Users, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/models").Utils, {}>>;
        query: import("../../lib/providers").Query;
        load: Promise<any>;
        reload(): Promise<any>;
        get<Result = unknown>(path: string, defaultType?: unknown): Promise<Result>;
        set<Value = unknown>(path: string, value: Value): Promise<any>;
    };
    fissuresUrl: string;
    run(): Promise<void>;
}
