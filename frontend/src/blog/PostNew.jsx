import { redirect } from "react-router-dom";
import PostForm from "./components/PostForm";
import { createPost } from "../http";
import { useAuth } from "../AuthProvider";
import Error from "../error/Error";

export default function PostNew() {
  const { user } = useAuth();

  if (!user.isAdmin) {
    return <Error message="You are not an admin" />;
  }

  return <PostForm />;
}

// action to process new post
export async function action({ request }) {
  const formData = await request.formData();
  const newPost = {
    title: formData.get("title"),
    body: formData.get("body"),
    imageUrl: formData.get("imageUrl"),
    author: formData.get("author"),
    published: formData.get("published"),
  };
  const resData = await createPost(newPost);

  return redirect("/blog");
}
