import { useAuth } from "../AuthProvider";
import { checkRole } from "../helpers";

export default function File({ file }) {
  const { user } = useAuth();

  function handleDownload() {
    console.log("handleDownload");
  }

  function handleDelete() {
    console.log("handleDelete");
  }

  return (
    <>
      <td>{file.name}</td>
      <td>{file.size}</td>
      <td>
        {file.created_date.slice(0, 10)} {file.created_date.slice(11, 19)}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-light me-2"
          onClick={handleDownload}
        >
          Download
        </button>
        {checkRole(user, "files_edit") && (
          <button
            type="button"
            className="btn btn-sm btn-danger me-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </td>
    </>
  );
}
