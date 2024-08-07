import { ICocktailFetcher } from "../contract/ICocktailFetcher";
import { ICocktail } from "../contract/ICocktail";

export class CocktailFetcher implements ICocktailFetcher {

    private cocktails: Map<string, ICocktail>;

    constructor() {
        this.cocktails = new Map<string, ICocktail>();
    }

    private async fetchWithTimeout(url: string, timeout: number): Promise<Response> {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            return await fetch(url, { signal: controller.signal });
        } finally {
            clearTimeout(id);
        }
    }

    async fetchCocktails(name: string): Promise<ICocktail> {

        if (!this.cocktails) {
            this.cocktails = new Map<string, ICocktail>();
        }

        const cachedCocktail = this.cocktails.get(name);
        if (cachedCocktail) return cachedCocktail;

        let response: Response;
        try {
            response = await this.fetchWithTimeout(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`, 5000);
        } catch (error) {
            throw new Error("Failed to fetch cocktail data.");
        }

        const data: any = await response.json();

        if (!data.drinks) {
            throw new Error("No drinks found.");
        }

        const drink = data.drinks[0];
        const ingredients = this.getIngredients(drink);
        const instructions = drink.strInstructions;

        const cocktail: ICocktail = {
            name: drink.strDrink,
            ingredients,
            instructions,
            category: drink.strCategory,
            thumbnail: drink.strDrinkThumb
        };

        this.cocktails.set(name, cocktail);
        return cocktail;
    }

    private getIngredients(drink: any): string[] {
        const ingredients: string[] = [];

        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];

            if (!ingredient) {
                break;
            }

            ingredients.push(`${ingredient} ${measure || ''}`.trim());
        }

        return ingredients;
    }

    async fetchRandomCocktail(): Promise<ICocktail> {
        let response: Response;
        try {
            response = await this.fetchWithTimeout(`https://www.thecocktaildb.com/api/json/v1/1/random.php`, 5000);
        } catch (error) {
            throw new Error("Failed to fetch random cocktail data.");
        }

        const data: any = await response.json();

        if (!data.drinks) {
            throw new Error("No drinks found.");
        }

        const drink = data.drinks[0];
        const name = drink.strDrink;

        const cocktail = this.cocktails.get(name);
        return cocktail || await this.fetchCocktails(name);
    }
}
