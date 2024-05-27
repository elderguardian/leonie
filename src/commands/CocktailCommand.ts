import { ICommand } from "../foundations/command/ICommand";
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { kernel } from "../core/ioc/Container";
import { leonieConfig } from "../core/config/LeonieConfig";
import { KernelMappings } from "../core/ioc/KernelMappings";

export class CocktailCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return <SlashCommandBuilder>new SlashCommandBuilder()
            .setName("cocktail")
            .addStringOption((option) => option
                .setName("query")
                .setDescription("Enter the cocktail name.")
                .setRequired(true))
            .setDescription("Get instructions for a cocktail.");
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();

        try {
            const queryOption = interaction.options.get("query");
            const query = queryOption?.value as string;

            const cocktailFetcher = kernel.singleton(KernelMappings.COCKTAIL_FETCHER);
            const cocktail = await cocktailFetcher.fetchCocktails(query);

            const ingredients = cocktail.ingredients.join(", ");
            const instructions = cocktail.instructions;

            const embed = new EmbedBuilder()
                .setColor(leonieConfig.embed_color)
                .setTitle(`Cocktail: ${cocktail.name} (${cocktail.category})`)
                .setDescription(`Ingredients: ${ingredients}\n\nInstructions: ${instructions}`)
                .setThumbnail(cocktail.thumbnail);

            await interaction.editReply({ embeds: [embed] });
        } catch (error: any) {
            console.log(error);
            await interaction.editReply(`Failed executing: ${error.message}`);
        }
    }
}