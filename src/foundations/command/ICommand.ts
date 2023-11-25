import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommandRunOptions } from "./ICommandRunOptions";

export interface ICommand {
    getMetadata(): SlashCommandBuilder;
    run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void>;
}
