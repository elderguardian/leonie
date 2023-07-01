import { Client, Events, REST, Routes } from "discord.js";
import * as config from "../config.json";
import { FileLoader } from "./foundations/fileLoader/FileLoader";

const client = new Client({ intents: [] });

client.once(Events.ClientReady, async (client) => {
  console.log("Client ready.");

  const { loadCommands } = new FileLoader();
  const clientId = client.user.id;
  const commands = loadCommands("commands");

  const rest = new REST({ version: "10" }).setToken(config.bot.token);

  console.log("Registering commands...");

  const rawCommandData = commands.map((command) => command.data.toJSON());

  await rest.put(Routes.applicationCommands(clientId), {
    body: rawCommandData,
  });

  console.log("Registered application commands.");
  client.destroy();
});

client.login(config.bot.token).then((r) => {
  console.log("Logged in.");
});
