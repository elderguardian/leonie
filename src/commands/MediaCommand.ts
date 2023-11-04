import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";

export class MediaCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .addStringOption((option) => option
                .setName("title")
                .setDescription("Enter your title query")
                .setRequired(true))
            .addStringOption((option) => option
                .setName("type")
                .setDescription("Select the media type")
                .addChoices({ name: "Anime", value: "anime" },
                    { name: "Manga", value: "manga" },
                    { name: "Character", value: "character"}))
            .setName("media")
            .setDescription("Get metadata about different media");
    }

}
