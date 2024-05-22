import { ICocktailFetcher } from "../contract/ICocktailFetcher";
import { ICocktail } from "../contract/ICocktail";

export class CocktailFetcher implements ICocktailFetcher {

    async fetchCocktails(name: string): Promise<ICocktail> {
        const response = await fetch("https://api.api-ninjas.com/v1/cocktail?name=" + name);

        if (!response.ok) {
            throw new Error("Failed to fetch cocktail.");
        }

        const data: any = await response.json();

        return {
            ingredients: data.ingredients ?? [],
            instructions: data.instructions ?? "No instructions available.",
            name: data.name ?? "No name available."
        };
    }

}