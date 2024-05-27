import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { leonieConfig } from "../core/config/LeonieConfig";
import { kernel } from "../core/ioc/Container";
import { KernelMappings } from "../core/ioc/KernelMappings";

export class MathCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return <SlashCommandBuilder>new SlashCommandBuilder()
            .setName("math")
            .addStringOption((option) => option
                .setName("equation")
                .setDescription("Enter the equation you want to solve")
                .setRequired(true))
            .setDescription("Calculate a mathematical equation");
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();

        try {
            const expressionOption = interaction.options.get("equation");
            const expression = expressionOption?.value as string;

            const mathSolver = kernel.get(KernelMappings.MATH_SOLVER);
            const result = mathSolver.solve(expression);

            const mathEmbed = new EmbedBuilder()
                .setColor(leonieConfig.embed_color)
                .setTitle(`Equation Result: \`${expression}\``)
                .setDescription(`# ${result}`)
                .setFooter({ text: `Powered by mathjs.org` });

            await interaction.editReply({ embeds: [mathEmbed] });
        } catch (error: any) {
            await interaction.editReply(`Failed executing: ${error.message}`);
        }
    }
}
