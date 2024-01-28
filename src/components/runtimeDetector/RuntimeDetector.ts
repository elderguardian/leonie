import { IRuntimeDetector } from "./IRuntimeDetector";
import * as fs from "fs";

export class RuntimeDetector implements IRuntimeDetector {

    private isDockedCached: boolean | undefined = undefined;
    private cachedVersion: string | undefined = undefined;

    private hasDockerEnv(): boolean {
        try {
            fs.statSync('/.dockerenv');
            return true;
        } catch { return false }
    }

    private hasDockerCGroup(): boolean {
        try {
            return fs
                .readFileSync('/proc/self/cgroup', 'utf8')
                .includes('docker');
        } catch { return false }
    }

    public isDocker(): boolean {
        if (this.isDockedCached == undefined) {
            this.isDockedCached = this.hasDockerCGroup() || this.hasDockerEnv()
        }

        return this.isDockedCached;
    }

    public getVersion(): string {
        if (this.cachedVersion === undefined) {
            try {
                this.cachedVersion = this.readVersionFromFile("../package.json");
            } catch (error) {
                this.cachedVersion = this.readVersionFromFile("package.json");
            }
        }

        if (!this.cachedVersion) {
            throw new Error("Could not parse version number.");
        }

        return this.cachedVersion;
    }

    private readVersionFromFile(filePath: string): string {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const parsedJson = JSON.parse(fileContent);
        return parsedJson.version;
    }


}