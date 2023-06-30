import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommandRunOptions } from "./ICommandRunOptions";

export interface ICommand {
  data: SlashCommandBuilder;
  run(runOptions: ICommandRunOptions, interaction: CommandInteraction): void;
}
