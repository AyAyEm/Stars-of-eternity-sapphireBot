declare class Follow {
    items: string[];
}
declare class Settings {
    follow: Follow;
}
export declare class Users {
    id: string;
    name: string;
    settings: Settings;
}
export {};
