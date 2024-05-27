import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { kernel } from "../core/ioc/Container";
import { AvatarScopes } from "../components/discordFetcher/AvatarScopes";
import { leonieConfig } from "../core/config/LeonieConfig";

export class AvatarCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return <SlashCommandBuilder>new SlashCommandBuilder()
            .addUserOption((option) => option
                .setName("target")
                .setDescription("Select user.")
                .setRequired(true))
            .addStringOption((option) => option
                .setName("scope")
                .setDescription("Select avatar scope")
                .addChoices({ name: "Global avatar", value: "global_avatar" },
                    { name: "Server profile", value: "server_profile" }))
            .setDMPermission(false)
            .setName("avatar")
            .setDescription("Get the avatar of a user.");
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();

        const targetUser = interaction.options.get("target", true).user;

        if (!targetUser) {
            await interaction.editReply("Could not find user.");
            return;
        }

        const scopeObject = interaction.options.get("scope", false);

        const scopeEnumerator = scopeObject && scopeObject.value === "global_avatar"
            ? AvatarScopes.GLOBAL : AvatarScopes.SERVER;

        if (!interaction.guild) {
            await interaction.editReply("This command is guild only.");
            return;
        }

        const discordFetcher = kernel.get("IDiscordFetcher");

        try {
            const member = await interaction.guild.members.fetch(targetUser);
            const avatarUrl = await discordFetcher.fetchAvatarUrl(member, scopeEnumerator);

            const avatarEmbed = new EmbedBuilder()
                .setColor(leonieConfig.embed_color)
                .setImage(avatarUrl);

            await interaction.editReply({ embeds: [avatarEmbed] });
        } catch (error: any) {
            await interaction.editReply(`Could not fetch avatar: ${error.message}`);
        }
    }
}
