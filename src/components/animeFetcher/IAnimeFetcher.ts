import { IAnime } from "./data/IAnime";
import { IManga } from "./data/IManga";
import { ICharacter } from "./data/ICharacter";

export interface IAnimeFetcher {
    fetchAnime(name: string): Promise<IAnime>;
    fetchManga(name: string): Promise<IManga>;
    fetchCharacter(name: string): Promise<ICharacter>;
}
