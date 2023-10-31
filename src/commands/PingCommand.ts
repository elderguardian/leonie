import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";

export class PingCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Pong!");
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        const startTime = Date.now();
        await interaction.reply("Pong!");
        const endTime = Date.now();
        await interaction.editReply(`Pong! *${endTime - startTime}ms*`);
    }
}
