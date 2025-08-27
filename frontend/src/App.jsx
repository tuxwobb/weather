import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.jsx";
import Error from "./error/Error.jsx";
import Home from "./home/Home.jsx";
import Weather from "./weather/Weather.jsx";
import Blog from "./blog/Blog.jsx";
import PostDetail from "./blog/PostDetail.jsx";
import PostEdit from "./blog/PostEdit.jsx";
import { action as editPostAction } from "./blog/PostEdit.jsx";
import Files from "./files/Files.jsx";
import Gallery from "./gallery/Gallery.jsx";

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
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:postId",
        element: <PostDetail />,
      },
      {
        path: "/blog/edit/:postId",
        element: <PostEdit />,
        action: editPostAction,
      },
      {
        path: "/files",
        element: <Files />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
