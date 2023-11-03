import { GuildMember } from "discord.js";
import { AvatarScopes } from "./AvatarScopes";

export interface IDiscordFetcher {
    fetchAvatarUrl(target: GuildMember, scope: AvatarScopes): Promise<string>;
}
