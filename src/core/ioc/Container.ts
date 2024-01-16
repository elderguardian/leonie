import { IKernel } from "./IKernel";
import { Kernel } from "./Kernel";
import { DiscordFetcher } from "../../components/discordFetcher/DiscordFetcher";
import { AnimeFetcher } from "../../components/animeFetcher/AnimeFetcher";
import { WeatherFetcher } from "../../components/weatherFetcher/WeatherFetcher";
import { GithubFetcher } from "../../components/githubFetcher/GithubFetcher";
import { InteractionHandler } from "../../foundations/interactionHandler/InteractionHandler";

export const kernel: IKernel = new Kernel()
    .set('IInteractionHandler', () => new InteractionHandler())
    .set("IDiscordFetcher", () => new DiscordFetcher())
    .set("IAnimeFetcher", () => new AnimeFetcher())
    .set("IWeatherFetcher", () => new WeatherFetcher())
    .set("IGitHubFetcher", () => new GithubFetcher());