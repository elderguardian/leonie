import { CommandInteraction } from "discord.js";
import { ICommand } from "../ICommand";
import { ICommandRunOptions } from "../ICommandRunOptions";
import { IActionLoader } from "../actionLoader/IActionLoader";
import { IInteractionHandler } from "./IInteractionHandler";
import process from "process";

export class InteractionHandler implements IInteractionHandler {
  private commands: ICommand[];
  private fileLoader: IActionLoader;

  constructor(fileLoader: IActionLoader) {
    this.fileLoader = fileLoader;
    this.commands = [];
    fileLoader
      .loadCommands(
        process.env.LEONIE_DEV == "true" ? "src/commands" : "commands"
      )
      .then((commands) => (this.commands = commands));
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
