import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.jsx";
import Error from "./error/Error.jsx";
import Home from "./home/Home.jsx";
import Weather from "./weather/Weather.jsx";
import Blog from "./blog/Blog.jsx";
import { getPosts as postsLoader } from "./http.js";
import PostDetail from "./blog/PostDetail.jsx";
import { getPost as postLoader } from "./http.js";
import PostEdit from "./blog/PostEdit.jsx";
import { editPostAction } from "./blog/PostEdit.jsx";
import PostNew from "./blog/PostNew.jsx";
import { newPostAction } from "./blog/PostNew.jsx";
import Files from "./files/Files.jsx";
import Gallery from "./gallery/Gallery.jsx";
import Users from "./users/Users.jsx";
import { getUsers as usersLoader } from "./http.js";

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
        children: [
          {
            index: true,
            element: <Blog />,
            loader: postsLoader,
            errorElement: (
              <div className="row">
                <div className="col">
                  <p>Error during fetching data</p>
                </div>
              </div>
            ),
          },
          {
            path: "/blog/:postId",
            element: <PostDetail />,
            loader: ({ params }) => postLoader(params.postId),
            errorElement: (
              <div className="container">
                <div className="row mt-3">
                  <div className="col">
                    <p>Error during fetching data</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            path: "/blog/:postId/edit",
            element: <PostEdit />,
            loader: ({ params }) => postLoader(params.postId),
            action: editPostAction,
            errorElement: (
              <div className="container">
                <div className="row mt-3">
                  <div className="col">
                    <p>Error during pushing data</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            path: "/blog/new",
            element: <PostNew />,
            action: newPostAction,
            errorElement: (
              <div className="container">
                <div className="row mt-3">
                  <div className="col">
                    <p>Error during pushing data</p>
                  </div>
                </div>
              </div>
            ),
          },
        ],
      },

      {
        path: "/files",
        element: <Files />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/users",
        element: <Users />,
        loader: usersLoader,
        errorElement: (
          <div className="container">
            <div className="row mt-3">
              <div className="col">
                <p>Error during fetching data</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
