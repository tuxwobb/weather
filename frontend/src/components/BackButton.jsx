import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-sm btn-light me-2"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
}
