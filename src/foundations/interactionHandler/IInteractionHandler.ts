import { CommandInteraction } from "discord.js";
import { ICommandRunOptions } from "../command/ICommandRunOptions";

export interface IInteractionHandler {
    handle(runOptions: ICommandRunOptions, interaction: CommandInteraction): void;
}
