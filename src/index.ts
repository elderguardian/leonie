import { Client, CommandInteraction, Events, IntentsBitField } from "discord.js";
import * as dotenv from "dotenv";
import * as process from "process";
import { ActionLoader } from "./foundations/actionLoader/ActionLoader";
import { kernel } from "./core/ioc/Container";

dotenv.config();

new (class {

    private createClient() {
        return new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
            ],
        });
    }

    public async initialize() {
        const client = this.createClient();

        const commandDir = process.env.LEONIE_DEV == "true" ? "src/commands" : "commands";
        const commands = await (new ActionLoader()).loadCommands(commandDir);

        const interactionHandler = kernel.get("IInteractionHandler");

        const token = process.env.LEONIE_BOT_TOKEN;

        client.once(Events.ClientReady, client => {
            if (!client.user) return;
            console.log(`Logged in as user: ${client.user.username ?? "unknown"}`);
        });

        client.on(Events.InteractionCreate, async interaction => {
            if (!commands) return;
            interactionHandler.handle({ client, commands }, <CommandInteraction>interaction);
        })

        await client.login(token)
        console.log("Logging into Discord...");
    }

})().initialize().then(r => console.log("Started bot successfully."));