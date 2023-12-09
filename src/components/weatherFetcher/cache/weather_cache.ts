export interface IWeatherCacheObject {
    fetchDate: Date;
    value: string;
}

export const weather_cache: Map<string, IWeatherCacheObject> = new Map();
