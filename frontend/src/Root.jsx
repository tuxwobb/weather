import { Outlet } from "react-router-dom";
import MainNavigation from "./navigation/MainNavigation";

export default function Root() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}
