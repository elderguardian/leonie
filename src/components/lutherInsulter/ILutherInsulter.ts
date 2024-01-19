import { ILutherInsult } from "./ILutherInsult";

export interface ILutherInsulter {
    generateInsult(): Promise<ILutherInsult>;
}