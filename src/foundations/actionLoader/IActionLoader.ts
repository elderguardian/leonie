import { ICommand } from "../ICommand";

export interface IActionLoader {
  loadCommands(directory: string): Promise<ICommand[]>;
}
