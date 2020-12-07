import { Guilds } from './Guilds';
import { Trackers } from './Trackers';
import { Users } from './Users';
import { Utils } from './Utils';
export * from './Guilds';
export * from './Trackers';
export * from './Users';
export * from './Utils';
export declare const schemas: {
    Guilds: typeof Guilds;
    Trackers: typeof Trackers;
    Users: typeof Users;
    Utils: typeof Utils;
};
export declare const models: {
    Guilds: import("@typegoose/typegoose").ReturnModelType<typeof Guilds, {}>;
    Trackers: import("@typegoose/typegoose").ReturnModelType<typeof Trackers, {}>;
    Users: import("@typegoose/typegoose").ReturnModelType<typeof Users, {}>;
    Utils: import("@typegoose/typegoose").ReturnModelType<typeof Utils, {}>;
};
export declare type ModelsKeys = keyof typeof models;
