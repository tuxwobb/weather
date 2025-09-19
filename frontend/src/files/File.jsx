import { useRevalidator } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { checkRole } from "../helpers";
import { deleteFile, downloadFile } from "../http";

export default function File({ file }) {
  const { user } = useAuth();
  const revalidator = useRevalidator();

  async function handleDownload(fileName) {
    await downloadFile(fileName);
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    await deleteFile(file.name);
    revalidator.revalidate();
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
          onClick={() => handleDownload(file.name)}
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
