import { IBlacklistManager } from "./IBlacklistManager";

export class TimeBlacklistManager implements IBlacklistManager {
    private blacklistedUsers: Map<string, number> = new Map();
    private readonly cooldownDuration: number;

    constructor(cooldownDuration: number) {
        this.cooldownDuration = cooldownDuration;
    }

    addToBlacklist(id: string): void {
        this.blacklistedUsers.set(id, Date.now() + this.cooldownDuration * 1000);

        setTimeout(() => {
            this.removeFromBlacklist(id);
        }, this.cooldownDuration * 1000);
    }

    isBlacklisted(id: string): boolean {
        return this.blacklistedUsers.has(id) && this.blacklistedUsers.get(id)! > Date.now();
    }

    private removeFromBlacklist(id: string): void {
        this.blacklistedUsers.delete(id);
    }

    getSecondsLeft(id: string): number {
        if (!this.blacklistedUsers.has(id)) {
            return 0;
        }

        const endTime = this.blacklistedUsers.get(id)!;
        const currentTime = Date.now();
        return Math.max(0, Math.round((endTime - currentTime) / 1000));
    }
}
