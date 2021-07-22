import { EternityBaseEntity } from "../../structures";
import { Guild } from './Guild';
import type { Message } from './Message';
export declare class Channel extends EternityBaseEntity {
    id: string;
    name: string;
    messages: Message[];
    guild: Guild;
}
