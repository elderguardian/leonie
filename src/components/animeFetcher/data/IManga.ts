import { MediaStatus } from "./MediaStatus";
import { MediaSeason } from "./MediaSeason";

export interface IMangaMetadata {
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
    size: {
        chapters: number;
        volumes: number;
    };
}
