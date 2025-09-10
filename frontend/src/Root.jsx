import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "./navigation/MainNavigation.jsx";
import { getTokenDuration } from "./auth.js";

export default function Root() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) return;

    if (token === "EXPIRED") {
      submit(null, { method: "post", action: "/logout" });
      return;
    }

    const tokenDuration = getTokenDuration(token);
    setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}
