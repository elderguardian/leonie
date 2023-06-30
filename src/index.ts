import {
  Client,
  CommandInteraction,
  Events,
  IntentsBitField,
} from "discord.js";
import { InteractionHandler } from "./foundations/interactionHandler/InteractionHandler";
import { FileLoader } from "./foundations/fileLoader/FileLoader";
import config from "../config.json"

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

  console.log(`${client.user.username ?? "unknown"} is online`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  interactionHandler.handle({ client }, <CommandInteraction>interaction);
});

client.login(config.bot.token);
