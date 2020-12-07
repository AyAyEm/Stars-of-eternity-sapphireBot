import { Task } from '@lib/structures';
export default class extends Task {
    document: {
        document: import("@typegoose/typegoose").DocumentType<import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/Models").Guilds, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/Models").Trackers, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/Models").Users, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("../../lib/providers/mongoose/Models").Utils, {}>>;
        query: import("../../lib/providers").Query;
        load: Promise<any>;
        reload(): Promise<any>;
        get<Result = unknown>(path: string, defaultType?: unknown): Promise<Result>;
        set<Value = unknown>(path: string, value: Value): Promise<any>;
    };
    fissuresUrl: string;
    run(): Promise<void>;
}
