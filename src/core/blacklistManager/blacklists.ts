import { TimeBlacklistManager } from "./TimeBlacklistManager";

export const blacklist_weather_command = new TimeBlacklistManager(10);
export const blacklist_media_command = new TimeBlacklistManager(10);
export const blacklist_cocktail_command = new TimeBlacklistManager(10);