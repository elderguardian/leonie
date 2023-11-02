import { MediaStatus } from "./MediaStatus";
import { MediaSeason } from "./MediaSeason";

export interface IAnime {
    title: string;
    startDate: Date;
    endDate: Date | null;
    images: {
        cover: string;
        banner: string;
    };
    status: MediaStatus;
    season: MediaSeason;
    description: string;
    genres: string[];
    isAdult: boolean;
    siteUrl: string;
    episodes: {
        amount: number;
        duration: number;
    };
    nextAiringEpisode: {
        airingAt: Date;
        timeUntilAiring: number;
        episode: number;
    } | null;
}
