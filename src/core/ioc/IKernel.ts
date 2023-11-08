import { ClassFactory } from "./ClassFactory";

export interface IKernel {
    get(name: string): any;
    set(name: string, factory: ClassFactory): IKernel;
    singleton(name: string): any;
}
