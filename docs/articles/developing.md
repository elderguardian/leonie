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
