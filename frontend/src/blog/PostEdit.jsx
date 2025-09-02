import { useLoaderData, redirect } from "react-router-dom";
import PostForm from "./components/PostForm.jsx";
import { editPost } from "../http.js";

function PostEdit() {
  const post = useLoaderData();

  return <PostForm post={post} />;
}

export default PostEdit;

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
