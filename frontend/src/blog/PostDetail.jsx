import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { deletePost } from "../http";

export default function PostDetail() {
  const navigate = useNavigate();
  const post = useLoaderData();

  async function handleDeletePost(post_id) {
    const resData = await deletePost(post_id);

    navigate("/blog");
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h3>{post.title}</h3>
          <img src={post.imageUrl} alt="react-img" className="img-fluid" />
          <p>{post.body}</p>
          <p>
            {post.author} | {post.published}
          </p>
          <p>
            <Link className="btn btn-sm btn-light" to="/blog">
              Back
            </Link>{" "}
            <Link
              className="btn btn-sm btn-primary"
              to={`/blog/${post.id}/edit`}
            >
              Edit
            </Link>{" "}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                handleDeletePost(post.id);
              }}
            >
              Delete
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export async function deletePostAction({ params }) {
  await deletePost(params.productId);
  return redirect("/blog");
}
