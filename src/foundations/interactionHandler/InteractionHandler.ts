import { CommandInteraction } from "discord.js";
import { ICommand } from "../ICommand";
import { ICommandRunOptions } from "../ICommandRunOptions";
import { IFileLoader } from "../fileLoader/IFileLoader";
import { IInteractionHandler } from "./IInteractionHandler";

export class InteractionHandler implements IInteractionHandler {
  private commands: ICommand[];
  private fileLoader: IFileLoader;

  constructor(fileLoader: IFileLoader) {
    this.fileLoader = fileLoader;
    this.commands = fileLoader.loadCommands("commands");
  }

  handle(
    runOptions: ICommandRunOptions,
    interaction: CommandInteraction
  ): void {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const { commandName } = interaction;
    const commandInstance = this.commands.filter(
      (command: ICommand) => command.data.name === commandName
    )[0];

    if (!commandInstance) {
      throw new Error("This command does not exists.");
    }

    commandInstance.run(runOptions, interaction);
  }
}
