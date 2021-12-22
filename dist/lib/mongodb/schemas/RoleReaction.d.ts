import { Ref } from '@typegoose/typegoose';
import { Role } from './Role';
import { Message } from './Message';
export declare class RoleReaction {
    message: Ref<Message, string>;
    role: Ref<Role, string>;
    emoji: string;
}
