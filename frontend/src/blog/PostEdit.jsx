import { useLoaderData, redirect } from "react-router-dom";
import PostForm from "./components/PostForm.jsx";
import { editPost } from "../http.js";
import Error from "../error/Error.jsx";
import { useAuth } from "../AuthProvider.jsx";
import { checkRole } from "../helpers.js";

export default function PostEdit() {
  const post = useLoaderData();
  const { user } = useAuth();

  if (!checkRole(user, "blog_edit")) {
    return <Error message="You do not have permissions to see the content." />;
  }

  return <PostForm post={post} />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const editedPost = {
    id: formData.get("id"),
    title: formData.get("title"),
    body: formData.get("body"),
    imageUrl: formData.get("imageUrl"),
    author: formData.get("author"),
    published: formData.get("published"),
  };
  const resData = await editPost(editedPost);

  return redirect("/blog");
}
