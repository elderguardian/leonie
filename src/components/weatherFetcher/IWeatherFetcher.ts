export interface IWeatherFetcher {
    fetchWeather(location: string): Promise<string>;
}
