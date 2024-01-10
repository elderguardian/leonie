import { Client } from "discord.js";
import { ICommand } from "./ICommand";

export interface ICommandRunOptions {
    client: Client;
    commands: ICommand[];
}
