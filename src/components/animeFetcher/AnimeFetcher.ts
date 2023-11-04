import { IAnimeFetcher } from "./IAnimeFetcher";
import { IAnime } from "./data/IAnime";
import { IManga } from "./data/IManga";
import { query_mediaByType } from "./queries/query_mediaByType";
import { MediaStatus } from "./data/MediaStatus";
import { MediaSeason } from "./data/MediaSeason";
import { ICharacter } from "./data/ICharacter";
import { query_character } from "./queries/query_character";

export class AnimeFetcher implements IAnimeFetcher {
    private apiUrl = "https://graphql.anilist.co";

    async fetchCharacter(name: string): Promise<ICharacter> {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: query_character,
                variables: { search: name, },
            }),
        };

        try {
            const response = await fetch(this.apiUrl, options);

            if (!response.ok) {
                throw new Error("Response was not okay!");
            }

            const jsonData: any = await response.json();
            const rawCharacterData = jsonData["data"]["Character"];

            if (!rawCharacterData || rawCharacterData.length <= 0) {
                throw new Error("Could not find this character.");
            }

            return {
                name: rawCharacterData.name.userPreferred,
                url: rawCharacterData.siteUrl,
                image: rawCharacterData.image.large,
                likes: rawCharacterData.favourites,
                gender: rawCharacterData.dategenderOfBirth,
                dateOfBirth: rawCharacterData.dateOfBirth,
                age: rawCharacterData.age,
                bloodType: rawCharacterData.bloodType,
            };
        } catch (error: any) {
            throw new Error(`Could not fetch information: ${error.message}`);
        }
    }

    async fetchAnime(name: string): Promise<IAnime> {
        const variables = {
            search: name,
            page: 1,
            perPage: 1,
            type: "ANIME",
        };

        const rawMedia = await this.fetchRawMedia(query_mediaByType, variables);

        const title =
            rawMedia.title.english ||
            rawMedia.title.romaji ||
            rawMedia.title.native ||
            "Title is unknown";

        const startDate = new Date(
            `${rawMedia.startDate.month}.${rawMedia.startDate.day}.${rawMedia.startDate.year}`
        );
        const endDate = rawMedia.endDate
            ? new Date(`${rawMedia.endDate.month}.${rawMedia.endDate.day}.${rawMedia.endDate.year}`)
            : null;

        return {
            title,
            startDate,
            endDate,
            images: {
                cover: rawMedia.coverImage.large,
                banner: rawMedia.bannerImage,
            },
            status: rawMedia.status as MediaStatus,
            season: rawMedia.season as MediaSeason,
            description: rawMedia.description,
            genres: String(rawMedia.genres).split(","),
            isAdult: rawMedia.isAdult ?? false,
            siteUrl: rawMedia.siteUrl ?? null,
            episodes: {
                amount: rawMedia.episodes,
                duration: rawMedia.duration,
            },
            nextAiringEpisode: rawMedia.nextAiringEpisode
                ? {
                    airingAt: new Date(rawMedia.nextAiringEpisode.airingAt),
                    timeUntilAiring: rawMedia.nextAiringEpisode.timeUntilAiring,
                    episode: rawMedia.nextAiringEpisode.episode,
                }
                : null,
        };
    }

    async fetchManga(name: string): Promise<IManga> {
        const variables = {
            search: name,
            page: 1,
            perPage: 1,
            type: "MANGA",
        };

        const rawMedia = await this.fetchRawMedia(query_mediaByType, variables);

        const title =
            rawMedia.title.english ||
            rawMedia.title.romaji ||
            rawMedia.title.native ||
            "Title is unknown";

        const startDate = new Date(
            `${rawMedia.startDate.month}.${rawMedia.startDate.day}.${rawMedia.startDate.year}`
        );
        const endDate = rawMedia.endDate
            ? new Date(`${rawMedia.endDate.month}.${rawMedia.endDate.day}.${rawMedia.endDate.year}`)
            : null;

        return {
            title,
            startDate,
            endDate,
            images: {
                cover: rawMedia.coverImage.large,
                banner: rawMedia.bannerImage,
            },
            status: rawMedia.status as MediaStatus,
            season: rawMedia.season as MediaSeason,
            description: rawMedia.description,
            genres: String(rawMedia.genres).split(","),
            isAdult: rawMedia.isAdult ?? false,
            siteUrl: rawMedia.siteUrl ?? null,
            size: {
                chapters: rawMedia.chapters,
                volumes: rawMedia.volumes,
            },
        };
    }

    private async fetchRawMedia(query: string, variables: any): Promise<any> {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        };

        try {
            const response = await fetch(this.apiUrl, options);

            if (!response.ok) {
                throw new Error("API Response was not okay!");
            }

            const jsonData: any = await response.json();
            const mediaData = jsonData["data"]["Page"]["media"];

            if (!mediaData || mediaData.length <= 0) {
                throw new Error("Could not find media with that name.");
            }

            return mediaData[0];
        } catch (error: any) {
            throw new Error(`Could not fetch API: ${error.message}`);
        }
    }
}
