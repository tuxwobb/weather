import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "./data";

export default function PostDetail() {
  const params = useParams();

  const post = blogPosts.find((post) => post.id.toString() === params.postId);

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
              to={`/blog/edit/${post.id}`}
            >
              Edit
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
