export interface IWeatherCacheObject {
    fetchDate: Date;
    value: string;
}

export let weather_cache: Map<string, IWeatherCacheObject> = new Map();
