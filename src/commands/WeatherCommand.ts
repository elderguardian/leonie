import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { kernel } from "../core/ioc/Container";
import { leonieConfig } from "../core/config/LeonieConfig";
import { blacklist_weather_command } from "../core/blacklistManager/blacklists";

export class WeatherCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName("weather")
            .setDescription("Get the weather in different locations")
            .addStringOption((option) => option
                .setName("location")
                .setDescription("Enter one or multiple locations using comma separation")
                .setRequired(true))
            .setDMPermission(true);
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();
        const locationOption = interaction.options.get("location", true);
        const locations = (String(locationOption.value) ?? "").split(",");
        const weatherFetcher = kernel.get("IWeatherFetcher");
        const embedsToSend = [];

        for (const location of locations) {
            try {
                const weather = await weatherFetcher.fetchWeather(location);

                const weatherEmbed = new EmbedBuilder()
                    .setColor(leonieConfig.embed_color)
                    .setTitle(`Weather report for \`${location}\``)
                    .setFooter({ text: "Based on wttr.in | github.com/chubin/wttr.in" })
                    .setDescription(`\`\`\`${weather}\`\`\``);

                embedsToSend.push(weatherEmbed);
            } catch (error: any) {
                await interaction.editReply(`Could not get weather: ${error.message}`);
            }

            await interaction.editReply({ embeds: embedsToSend });
        }
    }
}
