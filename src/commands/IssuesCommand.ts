import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { kernel } from "../core/ioc/Container";
import { RepositoryIssues } from "../components/githubFetcher/RepositoryIssues";
import { leonieConfig } from "../core/config/LeonieConfig";

export class IssuesCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName("issues")
            .setDescription("Get the current issues of this bot")
            .setDMPermission(true);
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();

        const githubFetcher = kernel.get("IGithubFetcher");
        const issues: RepositoryIssues = await githubFetcher.fetchIssues("elderguardian", "leonie");
        const openIssues = issues.filter((issue) => issue.state === "open");

        if (openIssues.length === 0) {
            await interaction.editReply({
                content: "There are currently no open issues.",
            });
            return;
        }

        const embedDescription = openIssues
            .map((issue) => `#${issue.number} | [${issue.title}](${issue.url}) by [${issue.author.name}](${issue.author.url})`)
            .join("\n");

        const issueEmbed = new EmbedBuilder()
            .setColor(leonieConfig.embed_color)
            .setTitle(`Issues for elderguardian/leonie.`)
            .setURL("https://github.com/elderguardian/leonie/issues")
            .setDescription(embedDescription);

        await interaction.editReply({ embeds: [issueEmbed] });
    }
}
