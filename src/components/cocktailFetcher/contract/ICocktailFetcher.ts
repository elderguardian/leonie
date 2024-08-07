import { ICocktail } from "./ICocktail";

export interface ICocktailFetcher {
    fetchCocktails(name: string): Promise<ICocktail>;
    fetchRandomCocktail(): Promise<ICocktail>;
}