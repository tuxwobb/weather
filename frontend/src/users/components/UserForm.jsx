import { Form } from "react-router-dom";

export default function UserForm({ user }) {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          {user && <h3>{user.fullname}</h3>}
          {!user && <h3>New user</h3>}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form method="post">
            <div className="mb-2">
              <label className="form-label">Fullname</label>
              <input
                type="text"
                name="fullname"
                className="form-control form-control-sm"
                defaultValue={user && user.fullname}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control form-control-sm"
                defaultValue={user && user.username}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control form-control-sm"
                defaultValue={user && user.email}
              />
            </div>
            <input
              type="text"
              name="id"
              defaultValue={user && user.id}
              hidden
            />
            <button type="submit" className="btn btn-sm btn-secondary">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
