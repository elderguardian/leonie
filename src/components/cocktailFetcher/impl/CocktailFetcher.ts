import { ICocktailFetcher } from "../contract/ICocktailFetcher";
import { ICocktail } from "../contract/ICocktail";

export class CocktailFetcher implements ICocktailFetcher {

    private cocktails: Map<string, ICocktail>;

    constructor() {
        this.cocktails = new Map<string, ICocktail>();
    }

    async fetchCocktails(name: string): Promise<ICocktail> {

        if (!this.cocktails) {
            this.cocktails = new Map<string, ICocktail>();
        }

        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const data: any = await response.json();

        if (!data.drinks) {
            throw new Error("No drinks found.");
        }

        const drink = data.drinks[0];
        const ingredients = this.getIngredients(drink);
        const instructions = drink.strInstructions;

        const cocktail = {
            name: drink.strDrink,
            ingredients,
            instructions,
            category: drink.strCategory,
            thumbnail: drink.strDrinkThumb
        };

        this.cocktails.set(name, cocktail);
        return cocktail;
    }

    private getIngredients(drink: any) {
        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];

            if (!ingredient) {
                break;
            }

            ingredients.push(`${ingredient} ${measure}`);
        }

        return ingredients;
    }
}