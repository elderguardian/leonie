import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { kernel } from "../core/ioc/Container";
import { leonieConfig } from "../core/config/LeonieConfig";

export class LutherCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName("luther")
            .setDescription("Get insulted by Luther");
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        const insulter = kernel.get("ILutherInsulter");
        const insult = await insulter.generateInsult();

        const insultEmbed = new EmbedBuilder()
            .setColor(leonieConfig.embed_color)
            .setTitle("Random Luther Insult")
            .setDescription(insult.content)
            .setFooter({ text: `From ${insult.book} on Page ${insult.page}` });

        await interaction.reply({ embeds: [insultEmbed] });
    }
}
