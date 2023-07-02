import { CommandInteraction, SlashCommandBuilder, User } from "discord.js";
import { ICommand } from "../foundations/ICommand";
import { ICommandRunOptions } from "../foundations/ICommandRunOptions";
import * as config from "../../config.json";

const pingCommand: ICommand = {
  data: new SlashCommandBuilder()
      .addUserOption((option) =>
          option.setName("target").setDescription("Select user.").setRequired(true)
      )
      .addStringOption((option) =>
          option
              .setName("scope")
              .setDescription("Select avatar scope")
              .addChoices(
                  { name: "Global avatar", value: "global_avatar" },
                  { name: "Server profile", value: "server_profile" }
              )
      )
      .setDMPermission(false)
      .setName("avatar")
      .setDescription("Get the avatar of a user."),
  async run(
      runOptions: ICommandRunOptions,
      interaction: CommandInteraction
  ): Promise<void> {

  },
};

module.exports = pingCommand;
