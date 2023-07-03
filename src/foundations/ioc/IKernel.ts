export interface IKernel {
  get(name: string): any;
  singleton(name: string): any;
}