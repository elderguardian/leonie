import { ICommand } from "../foundations/command/ICommand";
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { kernel } from "../core/ioc/Container";
import { leonieConfig } from "../core/config/LeonieConfig";
import { KernelMappings } from "../core/ioc/KernelMappings";
import { blacklist_weather_command } from "../core/blacklistManager/blacklists";

export class CocktailCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return <SlashCommandBuilder>new SlashCommandBuilder()
            .setName("cocktail")
            .setDescription("Get instructions for a cocktail.")
            .addSubcommand(subcommand =>
                subcommand
                    .setName("name")
                    .setDescription("Search for a cocktail by name.")
                    .addStringOption(option => option
                        .setName("query")
                        .setDescription("Enter the cocktail name.")
                        .setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand
                    .setName("random")
                    .setDescription("Get a random cocktail."));
    }

    private async sendCocktailEmbed(interaction: CommandInteraction, cocktail: any) {
        const ingredients = cocktail.ingredients.join(", ");
        const instructions = cocktail.instructions;

        const embed = new EmbedBuilder()
            .setColor(leonieConfig.embed_color)
            .setTitle(`Cocktail: ${cocktail.name} (${cocktail.category})`)
            .setDescription(`Ingredients: ${ingredients}\n\nInstructions: ${instructions}`)
            .setThumbnail(cocktail.thumbnail);

        await interaction.editReply({ embeds: [embed] });
    }

    private async executeName(interaction: CommandInteraction) {
        const queryOption = interaction.options.get("query");
        const query = queryOption?.value as string;

        const cocktailFetcher = kernel.singleton(KernelMappings.COCKTAIL_FETCHER);
        const cocktail = await cocktailFetcher.fetchCocktails(query);
        await this.sendCocktailEmbed(interaction, cocktail);
    }

    private async executeRandom(interaction: CommandInteraction) {
        const cocktailFetcher = kernel.singleton(KernelMappings.COCKTAIL_FETCHER);
        const cocktail = await cocktailFetcher.fetchRandomCocktail();
        await this.sendCocktailEmbed(interaction, cocktail);
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
        if (!interaction.isChatInputCommand()) return;

        const subcommand = interaction.options.getSubcommand();

        const map: { [key: string]: () => Promise<void> } = {
            "name": async () => await this.executeName(interaction),
            "random": async () => await this.executeRandom(interaction)
        };

        try {
            await map[subcommand]();
            blacklist_weather_command.addToBlacklist(interaction.user.id);
        } catch (error: any) {
            await interaction.editReply(`Failed executing: ${error.message}`);
        }
    }
}