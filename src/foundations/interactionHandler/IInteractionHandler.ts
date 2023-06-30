import { CommandInteraction } from "discord.js";
import { ICommandRunOptions } from "../ICommandRunOptions";

export interface IInteractionHandler {
  handle(runOptions: ICommandRunOptions, interaction: CommandInteraction): void;
}
