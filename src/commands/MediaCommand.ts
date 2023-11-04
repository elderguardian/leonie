import { CommandInteraction, EmbedBuilder, escapeBold, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../foundations/command/ICommand";
import { ICommandRunOptions } from "../foundations/command/ICommandRunOptions";
import { leonieConfig } from "../core/config/LeonieConfig";
import { kernel } from "../core/ioc/Container";
import { IBirthday } from "../components/animeFetcher/data/IBirthday";

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

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();

        const mediaTitleOption = interaction.options.get("title", true);
        const mediaTypeOptions = interaction.options.get("type", false);

        const typeAsString = mediaTypeOptions?.value || "anime";
        const mediaTitle = String(mediaTitleOption.value);

        try {
            switch (typeAsString) {
                case "anime": await this.handleAnimeOption(interaction, mediaTitle); break;
                case "manga": await this.handleMangaOption(interaction, mediaTitle); break;
                case "character": await this.handleCharacterOption(interaction, mediaTitle); break;
            }
        } catch (error: any) {
            await interaction.editReply({
                content: `Failed executing: ${error.message}`
            })
        }
    }

    private async handleCharacterOption(interaction: CommandInteraction, name: string): Promise<void> {
        const animeFetcher = kernel.get("IAnimeFetcher");
        const metadata = await animeFetcher.fetchCharacter(name);

        let embedDescription = `## ${metadata.name}\n`
        if (metadata.gender) embedDescription += `### Gender: \`${metadata.gender}\`\n`;
        if (metadata.age) embedDescription += `### Age: \`${metadata.age}\`\n`
        if (metadata.likes) embedDescription += `### Likes: \`${metadata.likes}\`\n`;
        if (metadata.bloodType) embedDescription += `### Blood Type: \`${metadata.bloodType}\`\n`;
        if (metadata.dateOfBirth) embedDescription += `### Birthday: \`${this.formatBirthday(metadata.dateOfBirth)}\`\n`;

        const metadataEmbed = this.buildAniListEmbed()
            .setURL(metadata.url)
            .setDescription(embedDescription)
            .setThumbnail(metadata.image);

        await interaction.editReply({ embeds: [metadataEmbed], });
    }

    private async handleMangaOption(interaction: CommandInteraction, mediaTitle: string): Promise<void> {
        const animeFetcher = kernel.get("IAnimeFetcher");
        const metadata = await animeFetcher.fetchManga(mediaTitle);

        const displayedEndDate = metadata.endDate
            ? this.formatDateToShortDate(metadata.endDate)
            : "Not available";

        const displayedStartDate = this.formatDateToShortDate(metadata.startDate);

        let embedDescription = `## ${metadata.title}\n` +
            `\`${metadata.genres.join(", ")}\`\n` +
            `### \`${displayedStartDate}\` to \`${displayedEndDate}\`\n` +
            `\nVolumes: \`${metadata.size.volumes}\`\n` +
            `Chapters: \`${metadata.size.chapters}\`\n`;

        const metadataEmbed = this.buildAniListEmbed()
            .setURL(metadata.siteUrl)
            .setDescription(embedDescription)
            .setThumbnail(metadata.images.cover)
            .setImage(metadata.images.banner);

        await interaction.editReply({ embeds: [metadataEmbed], });
    }

    private async handleAnimeOption(interaction: CommandInteraction, mediaTitle: string): Promise<void> {
        const animeFetcher = kernel.get("IAnimeFetcher");
        const metadata = await animeFetcher.fetchAnime(mediaTitle);

        const displayedEndDate = metadata.endDate
            ? this.formatDateToShortDate(metadata.endDate)
            : "Not available";

        const displayedStartDate = this.formatDateToShortDate(metadata.startDate);

        let embedDescription = `## ${metadata.title}\n` +
            `\`${metadata.genres.join(", ")}\`\n` +
            `### \`${displayedStartDate}\` to \`${displayedEndDate}\`\n` +
            `\nEpisodes: \`${metadata.episodes.amount}\`\n` +
            `Episode Duration: \`${metadata.episodes.duration}m\`\n`;

        if (metadata.nextAiringEpisode) {
            embedDescription +=
                `\nNext Episode: \`${metadata.nextAiringEpisode.episode}\`\n` +
                `Airing at: \`${metadata.episodes.airingAt.toISOString()}\`\n` +
                `Airing in: \`${this.formatDeltaTime(metadata.episodes.timeUntilAiring)}\`\n`;
        }

        const metadataEmbed = this.buildAniListEmbed()
            .setURL(metadata.siteUrl)
            .setDescription(embedDescription)
            .setThumbnail(metadata.images.cover)
            .setImage(metadata.images.banner);

        await interaction.editReply({ embeds: [metadataEmbed], });
    }

    private buildAniListEmbed(): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(leonieConfig.embed_color)
            .setTitle("AniList Page")
            .setAuthor({
                name: "AniList Search",
                url: "https://anilist.co/",
                iconURL: "https://anilist.co/img/icons/favicon-32x32.png",
            })
            .setFooter({
                text: "If this is not what you wanted, complain to AniList",
            });
    }

    private formatBirthday(birthday: IBirthday): string {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",]

        return birthday.year
            ? `${birthday.day} ${months[birthday.month]}, ${birthday.year}`
            : `${birthday.day} ${months[birthday.month]}`;
    }

    private formatDateToShortDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        return date.toLocaleDateString(undefined, options);
    }

    private formatDeltaTime(deltaTime: number) {
        let deltaRest = deltaTime;

        const days = Math.floor(deltaRest / 86400);
        deltaRest -= days * 86400;

        const hours = Math.floor(deltaRest / 3600) % 24;
        deltaRest -= hours * 3600;

        const minutes = Math.floor(deltaRest / 60) % 60;
        deltaRest -= minutes * 60;

        const seconds = deltaRest % 60;

        return `${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s`;
    }
}
