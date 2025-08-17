import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from "../constants/api";
import type { Location } from "../types/Location";

export async function fetchLocation(city: string): Promise<Location> {
  if (!OPEN_WEATHER_API_KEY) {
    throw new Error("OpenWeatherMap API key is not set. Please check your .env file.");
  }

  const url = `${OPEN_WEATHER_BASE_URL}/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`City '${city}' not found.`);
    }
    throw new Error(`Failed to fetch data: ${response.statusText} (Status: ${response.status})`);
  }

  const data: Location = await response.json();
  return data;
}
