import { CommandInteraction, SlashCommandBuilder, User } from "discord.js";
import { ICommand } from "../foundations/ICommand";
import { ICommandRunOptions } from "../foundations/ICommandRunOptions";
import * as config from "../../config.json";

async function fetchAvatarUrl(
    target: User,
    scope: string,
    guildId: string
): Promise<string> {
    return ''
}

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
      await interaction.deferReply();

      const target = interaction.options.getUser("target", true);
      const scopeObject = interaction.options.get("scope", false);

      const scopeValue = scopeObject ? scopeObject.value : "";
      const scope = scopeObject && scopeValue ? scopeValue : "global_avatar";

      if (!interaction.guild) {
          await interaction.editReply("This command is guild only.");
          return;
      }

      await fetchAvatarUrl(target, scope.toString(), interaction.guild.id ?? "")
          .then(async (avatarUrl) => {
              await interaction.editReply(avatarUrl);
          })
          .catch(async (err) => {
              await interaction.editReply(
                  `Error while fetching avatar: ${err.message}`
              );
          });
  },
};

module.exports = pingCommand;
