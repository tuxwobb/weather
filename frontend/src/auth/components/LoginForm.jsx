import { Form, useActionData } from "react-router-dom";

export default function LoginForm() {
  const data = useActionData();

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <h3>Login</h3>
          {data && <p className="alert alert-danger">{data.detail}</p>}
          <Form method="post">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control form-control-sm"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-sm"
              />
            </div>
            <button type="submit" className="btn btn-sm btn-secondary">
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
