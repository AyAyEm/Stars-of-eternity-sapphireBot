import type { DocumentType } from '@typegoose/typegoose';
import { generateMongoDocument } from './MongoDocument';
import { Provider, GetAllParams } from '../Provider';
import { models } from './models';
import type { Query as ProviderQuery } from '../Provider';
export interface Query extends ProviderQuery {
    model: keyof typeof models;
}
declare type Models = typeof models[keyof typeof models];
export declare class Mongoose extends Provider {
    generateDocument: typeof generateMongoDocument;
    Trackers: {
        new (query: string | {
            id: string | Record<string, any>;
        }): {
            document: DocumentType<import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Guilds, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Trackers, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Users, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Utils, {}>>;
            query: Query;
            load: Promise<any>;
            reload(): Promise<any>;
            get<Result = unknown>(path: string, defaultType?: unknown): Promise<Result>;
            set<Value = unknown>(path: string, value: Value): Promise<any>;
        };
    };
    Guilds: {
        new (query: string | {
            id: string | Record<string, any>;
        }): {
            document: DocumentType<import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Guilds, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Trackers, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Users, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Utils, {}>>;
            query: Query;
            load: Promise<any>;
            reload(): Promise<any>;
            get<Result = unknown>(path: string, defaultType?: unknown): Promise<Result>;
            set<Value = unknown>(path: string, value: Value): Promise<any>;
        };
    };
    Users: {
        new (query: string | {
            id: string | Record<string, any>;
        }): {
            document: DocumentType<import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Guilds, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Trackers, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Users, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Utils, {}>>;
            query: Query;
            load: Promise<any>;
            reload(): Promise<any>;
            get<Result = unknown>(path: string, defaultType?: unknown): Promise<Result>;
            set<Value = unknown>(path: string, value: Value): Promise<any>;
        };
    };
    Utils: {
        new (query: string | {
            id: string | Record<string, any>;
        }): {
            document: DocumentType<import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Guilds, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Trackers, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Users, {}> | import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Utils, {}>>;
            query: Query;
            load: Promise<any>;
            reload(): Promise<any>;
            get<Result = unknown>(path: string, defaultType?: unknown): Promise<Result>;
            set<Value = unknown>(path: string, value: Value): Promise<any>;
        };
    };
    models: {
        Guilds: import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Guilds, {}>;
        Trackers: import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Trackers, {}>;
        Users: import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Users, {}>;
        Utils: import("@typegoose/typegoose").ReturnModelType<typeof import("./models").Utils, {}>;
    };
    connection: Promise<this>;
    constructor(connectionString?: string);
    get<T = Models>(query: Query, path?: string): Promise<DocumentType<T>>;
    getAll<T>(model: string, { filter, path }?: GetAllParams): Promise<any[]>;
    set<T = any>(query: Query, path: string, value: T): Promise<this>;
}
export {};
