import { IDiscordFetcher } from "./IDiscordFetcher";
import { GuildMember } from "discord.js";
import process from "process";
import { AvatarScopes } from "./AvatarScopes";

export class DiscordFetcher implements IDiscordFetcher {
    async fetchGlobalAvatar(target: GuildMember) {
        const avatarUrl = target.user.avatarURL({
            size: 4096,
        });
        if (!avatarUrl) {
            throw new Error("Could not parse global avatar");
        }

        return avatarUrl;
    }

    async fetchServerAvatar(target: GuildMember) {
        const url = `https://discord.com/api/guilds/${target.guild.id}/members/${target.id}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bot ${process.env.LEONIE_BOT_TOKEN}`,
            },
        });

        const responseAsJson = await response.json();

        if (!responseAsJson.avatar) {
            throw new Error("Could not parse guild avatar");
        }

        return `https://cdn.discordapp.com/guilds/${target.guild.id}/users/${target.id}/avatars/${responseAsJson.avatar}.webp?size=4096`;
    }

    async fetchAvatarUrl(target: GuildMember, scope: AvatarScopes): Promise<string> {
        switch (scope) {
            case AvatarScopes.GLOBAL:
                return this.fetchGlobalAvatar(target);
            case AvatarScopes.SERVER:
                try {
                    return await this.fetchServerAvatar(target);
                } catch (error) {
                    return await this.fetchGlobalAvatar(target);
                }
        }
    }
}
