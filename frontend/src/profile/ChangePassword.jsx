import { Form, redirect, useActionData } from "react-router-dom";
import { changePassword } from "../http";

export default function ChangePassword() {
  const data = useActionData();

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h3>Change password</h3>
        </div>
      </div>
      {data && (
        <div className="row">
          <div className="col-md-6 ">
            <p className="alert alert-danger">{data.detail}</p>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <Form method="post">
            <div className="mb-2">
              <label className="form-label">New password</label>
              <input
                type="password"
                name="newPassword"
                className="form-control form-control-sm"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Confirm new password</label>
              <input
                type="password"
                name="newPassword2"
                className="form-control form-control-sm"
              />
            </div>
            <button type="submit" className="btn btn-sm btn-secondary">
              Change password
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = {
    newPassword: formData.get("newPassword"),
    newPassword2: formData.get("newPassword2"),
  };

  if (data.newPassword !== data.newPassword2) {
    return { detail: "New passwords do not match" };
  }

  if (data.newPassword.length < 8) {
    return { detail: "Password must be at least 8 characters long" };
  }

  //TODO logic to change password here
  const response = await changePassword(data.newPassword);
  window.alert("Password changed successfully.");
  return redirect("/profile");
}
