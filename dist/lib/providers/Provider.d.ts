export declare type Filter = Record<string, any>;
export interface Query {
    model?: string;
    id: string | Record<string, any>;
}
export interface GetAllParams {
    path?: string;
    filter?: Filter;
}
declare type SetResult = Provider | void;
export declare abstract class Provider {
    abstract get<T = any>(query: Query, path: string): Promise<T | null>;
    abstract set<T = any>(query: Query, path: string, value: T): Promise<SetResult>;
    abstract getAll<T = any>(model: string, options: GetAllParams): Promise<T[] | null>;
}
export {};
