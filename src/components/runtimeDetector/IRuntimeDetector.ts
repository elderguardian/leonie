export interface IRuntimeDetector {
    isDocker(): boolean;
    getVersion(): string;
}