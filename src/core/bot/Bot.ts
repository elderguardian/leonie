import { Client, CommandInteraction, Events, IntentsBitField } from "discord.js";
import { kernel } from "../ioc/Container";
import process from "process";
import { ActionLoader } from "../../foundations/actionLoader/ActionLoader";

export class Bot {

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

    private async handleImportantEvents(client: Client) {
        const interactionHandler = kernel.get("IInteractionHandler");

        client.once(Events.ClientReady, client => {
            if (!client.user) return;
            console.log(`Logged in as user: ${client.user.username ?? "unknown"}`);
        });

        const commandDir = process.env.LEONIE_DEV == "true" ? "src/commands" : "commands";
        const commands = await (new ActionLoader()).loadCommands(commandDir);

        client.on(Events.InteractionCreate, async interaction => {
            if (!commands) return;
            interactionHandler.handle({ client, commands }, <CommandInteraction>interaction);
        })
    }

    public async initialize() {
        const token = process.env.LEONIE_BOT_TOKEN;
        const client = this.createClient();
        await this.handleImportantEvents(client);
        console.log("Logging into Discord...");
        await client.login(token)
    }
}