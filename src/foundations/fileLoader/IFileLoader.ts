import { ICommand } from "../ICommand";

export interface IFileLoader {
  loadCommands(directory: string): ICommand[];
}
