import * as dotenv from "dotenv";
import { Bot } from "./core/bot/Bot";

dotenv.config();

async function startBot() {
    try {
        const bot = new Bot();
        await bot.initialize();
        console.log("Started bot successfully.");
    } catch (error: any) {
        console.log(`Unhandled error: ${error.message}\nRestarting...`);
        await startBot();
    }
}

startBot();
