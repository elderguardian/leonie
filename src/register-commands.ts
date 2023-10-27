import { Client, Events, REST, Routes } from "discord.js";
import { ActionLoader } from "./foundations/actionLoader/ActionLoader";
import * as dotenv from 'dotenv';
import * as process from "process";

dotenv.config();

const client = new Client({ intents: [] });

client.once(Events.ClientReady, async (client) => {
  console.log("Client ready.");

  const { loadCommands } = new ActionLoader();
  const clientId = client.user.id;
  const commands = await loadCommands("commands");

  const rest = new REST({ version: "10" }).setToken(process.env.LEONIE_BOT_TOKEN ?? '');

  console.log("Registering commands...");

  const rawCommandData = commands.map((command) => command.data.toJSON());

  await rest.put(Routes.applicationCommands(clientId), {
    body: rawCommandData,
  });

  console.log("Registered application commands.");
  client.destroy();
});

client.login(process.env.LEONIE_BOT_TOKEN).then((r) => {
  console.log("Logged in.");
});
