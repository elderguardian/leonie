import * as dotenv from "dotenv";
import { KernelMappings } from "./core/ioc/KernelMappings";
import { kernel } from "./core/ioc/Container";

dotenv.config();

async function startBot() {
    try {
        const bot = kernel.singleton(KernelMappings.BOT);
        await bot.initialize();
        console.log("Started bot successfully.");
    } catch (error: any) {
        console.log(`Unhandled error: ${error.message}\nRestarting...`);
        await startBot();
    }
}

startBot();
