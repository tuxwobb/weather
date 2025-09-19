import { useRef } from "react";
import { useRevalidator } from "react-router-dom";
import { uploadFiles } from "../../http";

export default function UploadFileForm() {
  const fileRef = useRef();
  const revalidator = useRevalidator();

  async function handleUpload(files) {
    if (files.length === 0) {
      window.alert("Please select at least one file.");
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    await uploadFiles(formData);

    fileRef.current.value = null;
    revalidator.revalidate();
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
              onClick={() => handleUpload(fileRef.current.files)}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
