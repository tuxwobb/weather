import { useParams, Form } from "react-router-dom";
import { blogPosts } from "./data.js";

export default function PostEditForm() {
  const params = useParams();
  const post = blogPosts.find((post) => post.id.toString() === params.postId);

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <h3>Edit post</h3>
            <Form method="post" action="">
              <div className="mb-1">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="title"
                  placeholder="Title"
                  defaultValue={post.title}
                />
              </div>
              <div className="mb-1">
                <label htmlFor="body" className="form-label">
                  Body
                </label>
                <textarea
                  className="form-control form-control-sm"
                  id="body"
                  rows="3"
                  placeholder="Body"
                  defaultValue={post.body}
                ></textarea>
              </div>
              <div className="mb-1">
                <label htmlFor="imageUrl" className="form-label form-label-sm">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="imageUrl"
                  placeholder="Image URL"
                  defaultValue={post.imageUrl}
                />
              </div>
              <button type="submit" className="btn btn-sm btn-primary">
                Upravit
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
