export const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
export const OPEN_WEATHER_API_URL =
  "https://api.openweathermap.org/data/2.5/weather?";
export const CUSTOM_API_URL = "http://127.0.0.1:5000";

export async function fetchWeather(apiUrl, apiKey, city) {
  const result = await fetch(
    apiUrl +
      new URLSearchParams({
        q: city,
        appid: apiKey,
        units: "metric",
        lang: "cz",
      }).toString()
  );
  const data = await result.json();
  return data;
}

export async function getCities() {
  const response = await fetch(`${CUSTOM_API_URL}/cities`);
  const data = await response.json();
  return data;
}

export async function addCity(city) {
  const response = await fetch(`${CUSTOM_API_URL}/cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city: city }),
  });
  const data = await response.json();
  return data;
}

export async function deleteCity(city) {
  const response = await fetch(`${CUSTOM_API_URL}/cities`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city: city }),
  });
  const data = await response.json();
  return data;
}
