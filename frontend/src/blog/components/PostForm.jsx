import { Form } from "react-router-dom";
import { useRef } from "react";
import { toIsoString } from "../../helpers";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Underline,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link as CKLink,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

export default function PostForm({ post }) {
  const bodyRef = useRef(null);
  const dt = new Date();

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
                ref={bodyRef}
                rows="15"
                className="form-control form-control-sm"
                id="body"
                name="body"
                defaultValue={post && post.body}
                hidden
              ></textarea>
              <CKEditor
                data={post && post.body}
                onChange={(event, editor) =>
                  (bodyRef.current.value = editor.getData())
                }
                editor={ClassicEditor}
                config={{
                  licenseKey: "GPL",
                  toolbar: [
                    "undo",
                    "redo",
                    "|",
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "|",
                    "link",
                    "insertTable",
                    "mediaEmbed",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "indent",
                    "outdent",
                  ],
                  plugins: [
                    Bold,
                    Essentials,
                    Heading,
                    Indent,
                    IndentBlock,
                    Italic,
                    Underline,
                    List,
                    CKLink,
                    MediaEmbed,
                    Paragraph,
                    Table,
                    Undo,
                  ],
                  initialData: "",
                }}
              />
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
                type="datetime-local"
                className="form-control form-control-sm"
                id="published"
                name="published"
                defaultValue={
                  post ? post.published : toIsoString(dt).slice(0, 16)
                }
              />
              <label htmlFor="created" className="form-label form-label-sm">
                Created
              </label>
              <input
                type="datetime-local"
                className="form-control form-control-sm"
                id="created"
                name="created"
                defaultValue={toIsoString(dt).slice(0, 16)}
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
