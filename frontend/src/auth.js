import { redirect } from "react-router-dom";
import { getMe } from "./http";

export function getTokenDuration() {
  const storedExiprationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExiprationDate).getTime();
  const now = new Date().getTime();
  const duration = expirationDate - now;
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export async function checkAdminLoader() {
  const admin = await checkAdmin();
  if (!admin) {
    return redirect("/login");
  }
}

export async function checkActiveLoader() {
  const active = await checkActive();
  if (!active) {
    return redirect("/login");
  }
}

export async function checkAdmin() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }

  const me = await getMe();
  if (me.admin) {
    return true;
  } else {
    return false;
  }
}

export async function checkActive() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }

  const me = await getMe();
  if (me.active) {
    return true;
  } else {
    return false;
  }
}
