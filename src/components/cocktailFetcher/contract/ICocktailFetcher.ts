import { ICocktail } from "./ICocktail";

export interface ICocktailFetcher {
    fetchCocktails(): Promise<ICocktail>;
}