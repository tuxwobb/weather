import { useRef } from "react";
import { uploadFile } from "../../http";
import { useNavigate } from "react-router-dom";

export default function UploadFileForm() {
  const fileRef = useRef();
  const navigate = useNavigate();

  function handleUpload() {
    async function upload(fd) {
      return await uploadFile(fd);
    }

    const files = fileRef.current.files;
    const formData = new FormData();
    [...files].forEach((file) => {
      formData.append("file", file);
      upload(formData);
    });

    navigate(".", { replace: true });
  }

  return (
    <div className="row">
      <div className="col-6">
        <div className="mb-2">
          <form>
            <input
              className="form-control form-control-sm mb-2"
              id="file"
              name="file"
              type="file"
              ref={fileRef}
              multiple
            />
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={handleUpload}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
