import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import MainNavigation from "./navigation/MainNavigation.jsx";
import { getTokenDuration } from "./auth.js";
import { useAuth } from "./AuthProvider.jsx";

export default function Root() {
  const token = useLoaderData();
  const { logout } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      await logout();
      return nav("/login");
    }

    if (!token) return;

    if (token === "EXPIRED") {
      handleLogout();
      return;
    }

    const tokenDuration = getTokenDuration(token);
    setTimeout(() => {
      handleLogout();
      return;
    }, tokenDuration);
  }, [token]);

  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}
