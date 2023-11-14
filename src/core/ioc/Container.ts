import { IKernel } from "./IKernel";
import { Kernel } from "./Kernel";
import { DiscordFetcher } from "../../components/discordFetcher/DiscordFetcher";
import { AnimeFetcher } from "../../components/animeFetcher/AnimeFetcher";

export const kernel: IKernel = new Kernel()
    .set("IDiscordFetcher", () => new DiscordFetcher())
    .set("IAnimeFetcher", () => new AnimeFetcher())
    .set("IWeatherFetcher", () => new WeatherFetcher());
