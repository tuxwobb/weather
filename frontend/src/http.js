export const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
export const OPEN_WEATHER_API_URL =
  "https://api.openweathermap.org/data/2.5/weather?";
export const OPEN_WEATHER_API_DETAIL_URL =
  "https://api.openweathermap.org/data/2.5/forecast?";
export const CUSTOM_API_URL = "http://127.0.0.1:5000";

export async function fetchWeather(apiUrl, apiKey, city) {
  const response = await fetch(
    apiUrl +
      new URLSearchParams({
        q: city,
        appid: apiKey,
        units: "metric",
        lang: "cz",
      }).toString()
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
}

export async function fetchDetailWeather(apiDetailUrl, apiKey, lat, lon) {
  const response = await fetch(
    apiDetailUrl +
      new URLSearchParams({
        lat: lat,
        lon: lon,
        appid: apiKey,
        units: "metric",
        lang: "cz",
      }).toString()
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
}

export async function getCities() {
  const response = await fetch(`${CUSTOM_API_URL}/cities`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function addCity(city) {
  const response = await fetch(`${CUSTOM_API_URL}/cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: city }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function deleteCity(city) {
  const response = await fetch(`${CUSTOM_API_URL}/cities`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: city }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}
