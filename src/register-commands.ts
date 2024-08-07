import { Client, Events, REST, Routes } from "discord.js";
import { ActionLoader } from "./foundations/actionLoader/ActionLoader";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

const client = new Client({ intents: [] });

client.once(Events.ClientReady, async (client) => {
    console.log("Client ready.");

    const { loadCommands } = new ActionLoader();
    const clientId = client.user.id;
    const commands = await loadCommands("src/commands");

    const rest = new REST({ version: "10" }).setToken(process.env.LEONIE_BOT_TOKEN ?? "");

    const rawCommandData = commands.map((command) => command.getMetadata().toJSON());

    console.log("Deleting existing commands...");
    rest.put(Routes.applicationCommands(clientId), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);

    console.log("Registering new commands...");

    await rest.put(Routes.applicationCommands(clientId), {
        body: rawCommandData,
    });

    console.log("Registered application command.");
    await client.destroy();
});

client.login(process.env.LEONIE_BOT_TOKEN).then((r) => {
    console.log("Logged in.");
});
