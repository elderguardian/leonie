#### 🚀 Quick Start on Developing

##### 📦 Structure

The bot is structured in a layered architecture. Each layer provides a specific set of functionality and is built on top
of the previous layer. A layer can be described as an abstraction of the layers below it.

| ID  | Layer             | Description                                     |
|-----|-------------------|-------------------------------------------------|
| 1   | `src/core`        | Crucial definitions for example the bot itself  |
| 2   | `src/foundations` | Modules that provide a framework for the bot    |
| 3.1 | `src/components`  | Modules that provide specific bot functionality |
| 3.2 | `src/commands`    | Code for the specific commands and subcommands  |

When developing a new command like a Weather command, L3.1 should provide a weather module which is used in a L3.2
command.
L1 and L2 are not important for most features. Similar to how the OSI model abstracts stuff into black boxes.

##### 🤖 Command Creation

- Commands are created in the `src/commands` directory.
- A command is a class implementing the `ICommand` interface provided by L2.
- The command class should be named after the command it provides, for example `PingCommand` for `/ping`.
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

Through the `run(...)` method's `ICommandRunOptions` object, the command can access state information such as the discord.js client and the
currently loaded commands. The discord.js `CommandInteraction` object is the interaction that triggered the command.

##### 📦 Dependencies

As described before, a command can rely on a module provided by L3.1. For example, the Weather command could rely on
a `weatherFetcher`.
For that new modules can be created in the `src/components` directory. A module should consist of a folder providing
interfaces and corresponded implementations.
It is recommended to keep these seperated in a `contract` and `impl` folder. After creating a module the implementations
can be mapped to the interfaces in the di container.
Just add your mappings to `src/core/ioc/Container.ts`. Keep in mind that this uses the `KernelMappings` enum and
requires you to add a new entry to it.

Your module can now be used in the command by asking the DI container for an implementation.
```ts
const myStaticImplementation = kernel.singleton(KernelMappings.MY_INTERFACE); // Always returns the same instance
const myImplementation = kernel.get(KernelMappings.MY_INTERFACE); // Always creates a new instance
```

> Just look at an existing module for reference.
