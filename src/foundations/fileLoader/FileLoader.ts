import * as fs from "fs";
import { IFileLoader } from "./IFileLoader";
import { ICommand } from "../ICommand";
import * as process from "process";

export class FileLoader implements IFileLoader {
  async loadCommands(directory: string): Promise<ICommand[]> {
    const fullDirectoryPath = `${process.cwd()}/${directory}`;
    const directoryExists = fs.existsSync(fullDirectoryPath);
    const isDirectory = fs.lstatSync(fullDirectoryPath).isDirectory();

    if (!directoryExists || !isDirectory) {
      throw new Error("Given path to load command files is not a directory.");
    }

    const commandFiles = fs
        .readdirSync(fullDirectoryPath)
        .filter((commandFile) => commandFile.endsWith(".ts"));

    if (commandFiles.length < 1) {
      throw new Error("Could not find any valid command files.");
    }

    const commandList: ICommand[] = [];

    for (const commandFile of commandFiles) {
      const command: ICommand = await import(
          `${fullDirectoryPath}/${commandFile}`
          );
      commandList.push(command);
    }

    return commandList;
  }
}
