import { CommandInteraction } from "discord.js";
import { ICommand } from "../command/ICommand";
import { ICommandRunOptions } from "../command/ICommandRunOptions";
import { IInteractionHandler } from "./IInteractionHandler";

export class InteractionHandler implements IInteractionHandler {

    handle(runOptions: ICommandRunOptions, interaction: CommandInteraction): void {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        const { commandName } = interaction;
        const commandInstance = runOptions.commands.filter(
            (command: ICommand) => command.getMetadata().name === commandName
        )[0];

        if (!commandInstance) {
            throw new Error("This command does not exists.");
        }

        commandInstance.run(runOptions, interaction);
    }
}
