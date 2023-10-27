import {
  Client,
  CommandInteraction,
  Events,
  IntentsBitField,
} from "discord.js";
import { InteractionHandler } from "./foundations/interactionHandler/InteractionHandler";
import { FileLoader } from "./foundations/fileLoader/FileLoader";
import * as dotenv from 'dotenv';
import * as process from "process";

dotenv.config();

const fileLoader = new FileLoader();
const interactionHandler = new InteractionHandler(fileLoader);

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.once(Events.ClientReady, (client: Client) => {
  if (!client.user) {
    return;
  }

  console.log(`Logged in as user: ${client.user.username ?? "unknown"}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  interactionHandler.handle({ client }, <CommandInteraction>interaction);
});

client.login(process.env.LEONIE_BOT_TOKEN).then(r => {
  console.log('Logging into Discord...')
});
