import { ClassFactory } from "./ClassFactory";
import { IKernel } from "./IKernel";

export class Kernel implements IKernel {
  mappings: Map<string, ClassFactory>;
  instances: Map<string, any>;

  constructor() {
    this.mappings = new Map<string, ClassFactory>();
    this.instances = new Map<string, any>();
  }

  set(name: string, factory: ClassFactory): IKernel {
    this.mappings.set(name, factory);
    return this;
  }

  get(name: string) {
    if (!this.mappings.has(name)) {
      throw new Error("Could not find a factory for this name.");
    }

    const factory = this.mappings.get(name);

    if (!factory) {
      throw new Error("The factory for that name is invalid.");
    }

    return factory();
  }
}
