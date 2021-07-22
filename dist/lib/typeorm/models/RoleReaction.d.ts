import { EternityBaseEntity } from "../../structures";
import { Message } from './Message';
import { Role } from './Role';
export declare class RoleReaction extends EternityBaseEntity {
    id: number;
    message: Message;
    role: Role;
    emoji: string;
}
