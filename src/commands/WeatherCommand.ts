import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { kernel } from "../core/ioc/Container";
import { leonieConfig } from "../core/config/LeonieConfig";
import { blacklist_weather_command } from "../core/blacklistManager/blacklists";

export class WeatherCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return <SlashCommandBuilder>new SlashCommandBuilder()
            .setName("weather")
            .setDescription("Get the weather in different locations")
            .addStringOption((option) => option
                .setName("location")
                .setDescription("Enter one or multiple locations using comma separation")
                .setRequired(true))
            .setDMPermission(true);
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        const userIsOnCooldown = blacklist_weather_command.isBlacklisted(interaction.user.id);

        if (userIsOnCooldown) {
            const cooldownTimeLeft = blacklist_weather_command.getSecondsLeft(interaction.user.id);

            await interaction.reply({
                ephemeral: true,
                content: `You are on cooldown! Wait an additional ${cooldownTimeLeft}s.`,
            });
            return;
        }

        await interaction.deferReply();
        const locationOption = interaction.options.get("location", true);
        const locations = (String(locationOption.value) ?? "").split(",");
        const weatherFetcher = kernel.get("IWeatherFetcher");
        const embedsToSend = [];

        for (const location of locations) {
            try {
                const weather = await weatherFetcher.fetchWeather(location);
                blacklist_weather_command.addToBlacklist(interaction.user.id);

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
