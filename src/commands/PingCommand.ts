import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/ICommand";
import { ICommandRunOptions } from "../foundations/ICommandRunOptions";

const pingCommand: ICommand = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  run(runOptions: ICommandRunOptions, interaction: CommandInteraction): void {
    const startTime = Date.now();
    interaction.reply("Pong!").then((response) => {
      const endTime = Date.now();
      response.edit(`Pong! *${endTime - startTime}ms*`);
    });
  },
};

module.exports = pingCommand;
