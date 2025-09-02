import { redirect } from "react-router-dom";
import { getAuthToken } from "./helpers";

export const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
export const OPEN_WEATHER_API_URL =
  "https://api.openweathermap.org/data/2.5/weather?";
export const OPEN_WEATHER_API_DETAIL_URL =
  "https://api.openweathermap.org/data/2.5/forecast?";
export const CUSTOM_API_URL = "http://127.0.0.1:8000";

export async function fetchWeather(apiUrl, apiKey, city_name) {
  const response = await fetch(
    apiUrl +
      new URLSearchParams({
        q: city_name,
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

export async function addCity(city_name) {
  const response = await fetch(`${CUSTOM_API_URL}/cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ name: city_name }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function deleteCity(city_id) {
  const response = await fetch(`${CUSTOM_API_URL}/cities/${city_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken}`,
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

// in loader
export async function getPosts() {
  const response = await fetch(`${CUSTOM_API_URL}/posts`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

// in loader
export async function getPost(post_id) {
  const response = await fetch(`${CUSTOM_API_URL}/posts/${post_id}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function createPost(post) {
  const response = await fetch(`${CUSTOM_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(post),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function editPost(post) {
  const response = await fetch(`${CUSTOM_API_URL}/posts/${post.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(post),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function deletePost(post_id) {
  const response = await fetch(`${CUSTOM_API_URL}/posts/${post_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function getUsers() {
  const response = await fetch(`${CUSTOM_API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function getMe() {
  const response = await fetch(`${CUSTOM_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}
