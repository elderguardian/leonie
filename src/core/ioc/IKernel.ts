import { ClassFactory } from "./ClassFactory";
import { KernelMappings } from "./KernelMappings";

export interface IKernel {
    get(name: string|KernelMappings): any;
    set(name: string|KernelMappings, factory: ClassFactory): IKernel;
    singleton(name: string|KernelMappings): any;
}
