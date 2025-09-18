import { redirect } from "react-router-dom";
import { getAuthToken } from "./auth.js";

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
  const response = await fetch(`${CUSTOM_API_URL}/cities/`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function createCity(city_name) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/cities/`, {
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
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/cities/${city_id}`, {
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

export async function getPosts() {
  const response = await fetch(`${CUSTOM_API_URL}/posts/`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function getPost(post_id) {
  const response = await fetch(`${CUSTOM_API_URL}/posts/${post_id}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function createPost(post) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/posts/`, {
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
  if (!getAuthToken()) return redirect("/login");

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
  if (!getAuthToken()) return redirect("/login");

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
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/users/`, {
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

export async function getUser(user_id) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/users/${user_id}`, {
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

export async function createUser(user) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(user),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function editUser(user) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function deleteUser(user_id) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/users/${user_id}`, {
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

export async function activateUser(user_id) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(
    `${CUSTOM_API_URL}/users/activate_user/${user_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function getMe() {
  if (!getAuthToken()) return redirect("/login");

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

export async function changePassword(newPassword) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(
    `${CUSTOM_API_URL}/auth/change_password?new_password=${newPassword}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function editProfile(user) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/auth/edit_profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(user),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function getRoles() {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/roles/`, {
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

export async function editUserRoles(user_id, roles) {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch(`${CUSTOM_API_URL}/user_roles/${user_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(roles),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  return resData;
}

export async function uploadFile(formData) {
  const response = await fetch("http://localhost:8000/files/file", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: formData,
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return resData;
}

export async function getFiles() {
  if (!getAuthToken()) return redirect("/login");

  const response = await fetch("http://localhost:8000/files/", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return resData;
}
