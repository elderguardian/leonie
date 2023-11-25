export interface IBlacklistManager {
    isBlacklisted(id: string): boolean;
    addToBlacklist(id: string): void;
    getSecondsLeft(id: string): number;
}
