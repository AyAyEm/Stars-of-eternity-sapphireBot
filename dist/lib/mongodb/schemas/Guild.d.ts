import { Ref } from '@typegoose/typegoose';
import { Channel } from './Channel';
import { Role } from './Role';
import { User } from './User';
export declare class Guild {
    _id: string;
    channels: Ref<Channel, string>[];
    roles: Ref<Role, string>[];
    members: Ref<User, string>[];
}
