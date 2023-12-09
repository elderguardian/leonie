import * as fs from "fs";
import { IActionLoader } from "./IActionLoader";
import { ICommand } from "../command/ICommand";
import * as process from "process";

export class ActionLoader implements IActionLoader {
    async loadCommands(directory: string): Promise<ICommand[]> {
        const fullDirectoryPath = `${process.cwd()}/${directory}`;
        const directoryExists = fs.existsSync(fullDirectoryPath);
        const isDirectory = fs.lstatSync(fullDirectoryPath).isDirectory();

        if (!directoryExists || !isDirectory) {
            throw new Error("Given path to load command files is not a directory.");
        }

        const commandFiles = fs
            .readdirSync(fullDirectoryPath)
            .filter((commandFile) =>
                commandFile.endsWith(process.env.LEONIE_DEV == "true" ? ".ts" : ".js")
            );

        if (commandFiles.length < 1) {
            throw new Error("Could not find any valid command files.");
        }

        const commandList: ICommand[] = [];

        for (const fileName of commandFiles) {
            const importedModule = await import(`${fullDirectoryPath}/${fileName}`);
            const className = fileName.split(".")[0];
            const commandClass = importedModule[className];
            commandList.push(new commandClass());
        }

        return commandList;
    }
}
