import { Ref } from '@typegoose/typegoose';
import { Message } from './Message';
export declare class Channel {
    _id: string;
    messages: Ref<Message, string>[];
}
