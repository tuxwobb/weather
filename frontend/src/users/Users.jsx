import { useLoaderData } from "react-router-dom";
import User from "./User";

export default function Users() {
  const users = useLoaderData();

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col"></div>
        <h3>Users</h3>
        {!users && <p>No user found.</p>}
        {users && (
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Fullname</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Active</th>
                  <th scope="col">Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <User user={user} key={user.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
