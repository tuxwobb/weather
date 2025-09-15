import { Link, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { deletePost } from "../http";
import parse from "html-react-parser";
import { useAuth } from "../AuthProvider";
import { checkRole } from "../helpers";

export default function PostDetail() {
  const navigate = useNavigate();
  const post = useLoaderData();
  const { user } = useAuth();

  async function handleDeletePost(post_id) {
    if (confirm("Are you sure to delete post?")) {
      const resData = await deletePost(post_id);
      navigate("/blog");
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <p>
            <img src={post.imageUrl} alt="react-img" className="img-fluid" />
          </p>
          <h3>{post.title}</h3>
          <hr />
          {parse(post.body)}
          <hr />
          <p>
            {post.author} | {post.published.slice(0, 10)}
          </p>
          <p>
            <Link className="btn btn-sm btn-light" to="/blog">
              Back
            </Link>{" "}
            {checkRole(user, "blog_edit") && (
              <>
                <Link
                  className="btn btn-sm btn-secondary"
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
              </>
            )}
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
