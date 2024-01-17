import * as dotenv from "dotenv";
import { Bot } from "./core/bot/Bot";

dotenv.config();

async function startBot() {
    const bot = new Bot();
    await bot.initialize();
    console.log("Started bot successfully.");
}

startBot();