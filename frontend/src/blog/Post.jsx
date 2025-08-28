import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="col-4">
      <hr />
      <h4>{post.title}</h4>
      <img
        src={post.imageUrl}
        alt="react-img"
        className="img-fluid img-thumbnail"
      />
      <p>
        <Link className="btn btn-sm btn-light" to={`/blog/${post.id}`}>
          Přečíst
        </Link>
        <span className="float-end">
          <em>
            {post.author} | {post.published}
          </em>
        </span>
      </p>
    </div>
  );
}
