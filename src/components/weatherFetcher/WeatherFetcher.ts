import { IWeatherFetcher } from "./IWeatherFetcher";
import { weather_cache } from "./cache/weather_cache";

export class WeatherFetcher implements IWeatherFetcher {
    private dateIsOlderThanOneHour(date: Date | undefined): boolean {
        if (!date) return true;
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        return date < oneHourAgo;
    }

    async fetchWeather(location: string): Promise<string> {
        const useCachedValue =
            weather_cache.has(location) &&
            !this.dateIsOlderThanOneHour(weather_cache.get(location)?.fetchDate);

        if (useCachedValue) {
            return weather_cache.get(location)?.value ?? "Not Available";
        }

        // 0: only weather, Q: no report line or city name, T: no colors
        const builtUrl = `https://wttr.in/${location}?0QT`;
        const response = await fetch(builtUrl, {
            headers: { "User-Agent": "curl/7.81.0" },
        });

        if (response.status === 404) {
            throw new Error("Could not find this location.");
        }

        if (!response.ok) {
            throw new Error("Response was not okay.");
        }

        const value = await response.text();
        weather_cache.set(location, { fetchDate: new Date(), value });
        return value;
    }
}
