export declare class RelicTracker {
    enabled: boolean;
    messages: Map<string, string>;
}
export declare class InvasionItems {
    enabled: boolean;
    items: string[];
}
export declare class EmojiRole {
    roleId: string;
}
export declare class Message {
    msgType?: string;
    title?: string;
    emojiRoleMap?: Map<string, string>;
}
export declare class Channel {
    relicTracker: RelicTracker;
    invasionItems: InvasionItems;
    messages: Map<string, Message>;
}
export declare class Member {
    toFollow: boolean;
}
export declare class Guilds {
    id: string;
    name: string;
    members: Map<string, Member>;
    channels: Map<string, Channel>;
}
