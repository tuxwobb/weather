import { useLoaderData } from "react-router-dom";
import UploadFileForm from "./components/UploadFileForm";
import File from "./File";
import { useAuth } from "../AuthProvider";
import { checkRole } from "../helpers";

export default function Files() {
  const files = useLoaderData();
  const { user } = useAuth();

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h3>Files</h3>
        </div>
      </div>

      {checkRole(user, "files_edit") && <UploadFileForm />}

      <div className="row">
        <div className="col">
          {files.length === 0 && <p>No files found.</p>}
          {files.length > 0 && (
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.name}>
                    <File file={file} />
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
