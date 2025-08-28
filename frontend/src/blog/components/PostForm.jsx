import { Form } from "react-router-dom";

export default function PostForm({ post }) {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          {post ? <h3>Edit post</h3> : <h3>New post</h3>}
          <Form method="post">
            <div className="mb-1">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="title"
                name="title"
                defaultValue={post && post.title}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="body" className="form-label">
                Body
              </label>
              <textarea
                rows="3"
                className="form-control form-control-sm"
                id="body"
                name="body"
                defaultValue={post && post.body}
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
                name="imageUrl"
                defaultValue={post && post.imageUrl}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="author" className="form-label form-label-sm">
                Author
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="author"
                name="author"
                defaultValue={post && post.author}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="published" className="form-label form-label-sm">
                Published
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="published"
                name="published"
                defaultValue={post && post.published}
              />
              <input
                type="text"
                className="form-control form-control-sm"
                id="id"
                name="id"
                defaultValue={post && post.id}
                hidden
              />
            </div>
            <button type="submit" className="btn btn-sm btn-secondary">
              Save
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
