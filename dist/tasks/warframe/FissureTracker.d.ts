import { Task } from "../../lib/structures";
export default class extends Task {
    document: {
        document: any;
        query: import("../../lib/providers").Query;
        load: Promise<any>;
        reload(): Promise<any>;
        get<Result = unknown>(path: string, defaultType?: unknown): Promise<Result>;
        set<Value = unknown>(path: string, value: Value): Promise<any>;
    };
    fissuresUrl: string;
    run(): Promise<void>;
}
