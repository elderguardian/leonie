import { Client, CommandInteraction, Events, IntentsBitField } from "discord.js";
import { InteractionHandler } from "./foundations/interactionHandler/InteractionHandler";
import { ActionLoader } from "./foundations/actionLoader/ActionLoader";
import * as dotenv from "dotenv";
import * as process from "process";
import { ICommand } from "./foundations/command/ICommand";

dotenv.config();

const fileLoader = new ActionLoader();
const interactionHandler = new InteractionHandler();

let commands: ICommand[] | undefined = undefined;

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.once(Events.ClientReady, async (client: Client) => {
    if (!client.user) {
        return;
    }

    console.log(`Logged in as user: ${client.user.username ?? "unknown"}`);

    const commandDir = process.env.LEONIE_DEV == "true" ? "src/commands" : "commands";
    commands = await fileLoader.loadCommands(commandDir);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!commands) {
        return;
    }

    interactionHandler.handle({ client, commands }, <CommandInteraction>interaction);
});

client.login(process.env.LEONIE_BOT_TOKEN).then((r) => {
    console.log("Logging into Discord...");
});
