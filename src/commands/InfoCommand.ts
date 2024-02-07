import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { kernel } from "../core/ioc/Container";
import { KernelMappings } from "../core/ioc/KernelMappings";
import { leonieConfig } from "../core/config/LeonieConfig";

export class InfoCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName("info")
            .setDescription("Get information about the bot hosting environment.");
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        const runtimeDetector = kernel.singleton(KernelMappings.RUNTIME_DETECTOR);

        try {
            const isDocker = runtimeDetector.isDocker();
            const version = runtimeDetector.getVersion();

            const embedDescription = "Version " + version + "\n" +
                (isDocker ? "\\✅" : "\\❌") + " Docker"

            const infoEmbed = new EmbedBuilder()
                .setColor(leonieConfig.embed_color)
                .setTitle(`:man_running: Runtime Information`)
                .setDescription(embedDescription)
                .setFooter({ text: "github.com/elderguardian/leonie" });

            await interaction.reply({ embeds: [infoEmbed] });
        } catch (error: any) {
            await interaction.reply("Error getting runtime information: " + error.message);
        }

    }
}
