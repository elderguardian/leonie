import { ILutherInsulter } from "./ILutherInsulter";
import { ILutherInsult } from "./ILutherInsult";
import insults from "./insults";

export class LutherInsulter implements ILutherInsulter {

    private generateRandomNum(max: number): number {
        return Math.round(Math.random() * max);
    }

    async generateInsult(): Promise<ILutherInsult> {
        try {
            const amountOfBooks = insults.length;
            const randomNum = this.generateRandomNum(amountOfBooks);
            const randomBook = insults[randomNum];

            const amountOfInsults = randomBook.quotes.length;
            const randomInsult = randomBook.quotes[this.generateRandomNum(amountOfInsults)];

            return {
                book: randomBook.work,
                content: randomInsult.quote,
                page: randomInsult.page,
            }

        } catch (error: any) {
            throw new Error(`Could not parse insult: ${error.message}`)
        }


    }

}