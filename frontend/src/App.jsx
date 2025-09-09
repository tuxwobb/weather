import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.jsx";
import { checkAuthLoader, tokenLoader } from "./helpers.js";
import Error from "./error/Error.jsx";
import Home from "./home/Home.jsx";
import Weather from "./weather/Weather.jsx";
import Blog from "./blog/Blog.jsx";
import PostDetail from "./blog/PostDetail.jsx";
import PostEdit, { action as editPostAction } from "./blog/PostEdit.jsx";
import PostNew, { action as newPostAction } from "./blog/PostNew.jsx";
import Files from "./files/Files.jsx";
import Gallery from "./gallery/Gallery.jsx";
import Users from "./users/Users.jsx";
import UserNew, { action as newUserAction } from "./users/UserNew.jsx";
import UserEdit, { action as editUserAction } from "./users/UserEdit.jsx";
import Login, { action as loginAction } from "./auth/Login.jsx";
import { action as logoutAction } from "./auth/Logout.jsx";
import Profile from "./profile/Profile.jsx";
import {
  getPosts as postsLoader,
  getPost as postLoader,
  getUsers as usersLoader,
  getUser as userLoader,
  getMe as meLoader,
} from "./http.js";
import ChangePassword, {
  action as changePasswordAction,
} from "./profile/ChangePassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },

      {
        path: "/logout",
        action: logoutAction,
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
            loader: checkAuthLoader,
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
        loader: checkAuthLoader,
      },

      {
        path: "/gallery",
        element: <Gallery />,
        loader: checkAuthLoader,
      },

      {
        path: "/users",
        children: [
          {
            index: true,
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
          {
            path: "/users/new",
            element: <UserNew />,
            action: newUserAction,
          },
          {
            path: "/users/:userId/edit",
            element: <UserEdit />,
            action: editUserAction,
            loader: ({ params }) => userLoader(params.userId),
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
        path: "/profile",
        children: [
          {
            index: true,
            element: <Profile />,
            loader: meLoader,
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
            path: "/profile/change_password",
            element: <ChangePassword />,
            action: changePasswordAction,
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
