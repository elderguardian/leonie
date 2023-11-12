import { ICommand } from "../command/ICommand";

export interface IActionLoader {
    loadCommands(directory: string): Promise<ICommand[]>;
}
