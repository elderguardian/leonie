import { IKernel } from "./IKernel";
import { Kernel } from "./Kernel";
import { DiscordFetcher } from "../../components/discordFetcher/DiscordFetcher";
import { AnimeFetcher } from "../../components/animeFetcher/AnimeFetcher";
import { WeatherFetcher } from "../../components/weatherFetcher/WeatherFetcher";
import { GithubFetcher } from "../../components/githubFetcher/GithubFetcher";
import { InteractionHandler } from "../../foundations/interactionHandler/InteractionHandler";
import { ActionLoader } from "../../foundations/actionLoader/ActionLoader";
import { LutherInsulter } from "../../components/lutherInsulter/LutherInsulter";
import { KernelMappings } from "./KernelMappings";
import { RuntimeDetector } from "../../components/runtimeDetector/RuntimeDetector";

export const kernel: IKernel = new Kernel()
    .set(KernelMappings.INTERACTION_HANDLER, () => new InteractionHandler())
    .set(KernelMappings.ACTION_LOADER, () => new ActionLoader())
    .set(KernelMappings.DISCORD_FETCHER, () => new DiscordFetcher())
    .set(KernelMappings.ANIME_FETCHER, () => new AnimeFetcher())
    .set(KernelMappings.WEATHER_FETCHER, () => new WeatherFetcher())
    .set(KernelMappings.GITHUB_FETCHER, () => new GithubFetcher())
    .set(KernelMappings.LUTHER_INSULTER, () => new LutherInsulter())
    .set(KernelMappings.RUNTIME_DETECTOR, () => new RuntimeDetector());