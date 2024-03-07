#### 🚀 Quick Start on Developing

##### 📦 Structure

The bot is structured in a layered architecture. Each layer provides a specific set of functionality and is built on top
of the previous layer.

| Layer                | Description                                     |
|----------------------|-------------------------------------------------|
| 1 `src/core`         | Crucial definitions for example the bot itself  |
| 2 `src/foundations`  | Modules that provide a framework for the bot    |
| 3.1 `src/components` | Modules that provide specific bot functionality |
| 3.2 `src/commands`   | Code for the specific commands and subcommands  |

When developing a new command like a Weather command, L3.1 should provide a weather module which is used in a L3.2
command.
L1 and L2 are not important for most features. Similar to how the OSI model abstracts stuff into black boxes.

##### 🤖 Command Creation

- Commands are created in the `src/commands` directory.
- A command is a class implementing the `ICommand` interface provided by L2.
- The command class should be named after the command it provides, for example `PingCommand` for the `/ping` command.
- The command class should be exported as the default export of the file.
- As the `ICommand` defines, each command should have a `getMetadata` method that returns a `SlashCommandBuilder` object
  provided by the [discord.js](https://discord.js.org/) library.

###### 📜 Example

```ts
export class PingCommand implements ICommand {
    getMetadata(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Replies with Pong!');
    }

    async run(runOptions: ICommandRunOptions, interaction: CommandInteraction): Promise<void> {
        // Respond to the interaction
    }
}
```