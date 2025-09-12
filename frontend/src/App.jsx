import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.jsx";
import Error from "./error/Error.jsx";
import PageNotFoundError from "./error/PageNotFoundError.jsx";
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
import ChangePassword, {
  action as changePasswordAction,
} from "./profile/ChangePassword.jsx";

import { checkAdminLoader, getAuthToken } from "./auth.js";
import {
  getPosts as postsLoader,
  getPost as postLoader,
  getUsers as usersLoader,
  getUser as userLoader,
  getMe as meLoader,
} from "./http.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFoundError />,
    id: "root",
    loader: getAuthToken,
    children: [
      // Home
      {
        index: true,
        element: <Home />,
      },

      // Weather
      {
        path: "/weather",
        element: <Weather />,
      },

      // Blog
      {
        path: "/blog",
        children: [
          {
            index: true,
            element: <Blog />,
            loader: postsLoader,
            errorElement: <Error message="Error during fetching data" />,
          },
          {
            path: "/blog/:postId",
            element: <PostDetail />,
            loader: ({ params }) => postLoader(params.postId),
            errorElement: <Error message="Error during fetching data" />,
          },
          {
            path: "/blog/:postId/edit",
            element: <PostEdit />,
            loader: ({ params }) => postLoader(params.postId),
            action: editPostAction,
            errorElement: <Error message="Error during pushing data" />,
          },
          {
            path: "/blog/new",
            element: <PostNew />,
            action: newPostAction,
            loader: checkAdminLoader,
            errorElement: <Error message="Error during pushing data" />,
          },
        ],
      },

      // Files
      {
        path: "/files",
        element: <Files />,
        loader: checkAdminLoader,
      },

      // Gallery
      {
        path: "/gallery",
        element: <Gallery />,
        loader: checkAdminLoader,
      },

      // Users
      {
        path: "/users",
        children: [
          {
            index: true,
            element: <Users />,
            loader: usersLoader,
            errorElement: <Error message="Error during fetching data" />,
          },
          {
            path: "/users/new",
            element: <UserNew />,
            action: newUserAction,
            loader: checkAdminLoader,
          },
          {
            path: "/users/:userId/edit",
            element: <UserEdit />,
            action: editUserAction,
            loader: ({ params }) => userLoader(params.userId),
            errorElement: <Error message="Error during pushing data" />,
          },
        ],
      },

      // Profile
      {
        path: "/profile",
        children: [
          {
            index: true,
            element: <Profile />,
            loader: meLoader,
            errorElement: <Error message="Error during fetching data" />,
          },
          {
            path: "/profile/change_password",
            element: <ChangePassword />,
            action: changePasswordAction,
            errorElement: <Error message="Error during pushing data" />,
          },
        ],
      },

      // Auth
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },

      // Auth
      {
        path: "/logout",
        action: logoutAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
