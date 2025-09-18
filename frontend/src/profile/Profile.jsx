import { useLoaderData, Link } from "react-router-dom";

export default function Profile() {
  const user = useLoaderData();

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <h3>User profile</h3>
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>Fullname</td>
                  <td>{user.fullname}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Active</td>
                  <td>{user.active ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link
              to={`/profile/change_password`}
              type="button"
              className="btn btn-sm btn-secondary"
            >
              Change password
            </Link>{" "}
            <Link
              to={`/profile/edit`}
              type="button"
              className="btn btn-sm btn-secondary"
            >
              Edit profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
