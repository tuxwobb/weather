import { redirect } from "react-router-dom";

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

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }
}
