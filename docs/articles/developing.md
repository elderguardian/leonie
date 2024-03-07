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
