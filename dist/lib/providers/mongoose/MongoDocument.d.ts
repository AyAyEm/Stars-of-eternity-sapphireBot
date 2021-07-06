import type { DocumentType } from '@typegoose/typegoose';
import type { Query } from './Mongoose';
import type { ModelsKeys } from './models';
export declare function generateMongoDocument(modelKey: ModelsKeys): {
    new (query: {
        id: Query['id'];
    } | string): {
        document: any;
        query: Query;
        load: Promise<any>;
        reload(): Promise<any>;
        get<Result = unknown>(path: string, defaultType?: unknown): Promise<Result>;
        set<Value = unknown>(path: string, value: Value): Promise<any>;
    };
};
export declare type MongoDocument = ReturnType<typeof generateMongoDocument>;
