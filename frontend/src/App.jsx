import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.jsx";
import Error from "./error/Error.jsx";
import Home from "./home/Home.jsx";
import Weather from "./weather/Weather.jsx";
import Blog from "./blog/Blog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/weather",
        element: <Weather />,
      },
      {
        path: "/Blog",
        element: <Blog />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
