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
            };
        } catch (error: any) {
            throw new Error(`Could not fetch information: ${error.message}`);
        }
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
