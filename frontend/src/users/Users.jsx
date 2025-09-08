import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import User from "./User";
import SearchForm from "./components/SearchForm";
import { useState } from "react";
import { activateUser, deleteUser } from "../http";

export default function Users() {
  const users = useLoaderData();
  const revalidator = useRevalidator();
  const [filteredUsers, setFilteredUsers] = useState(users);

  async function handleDeleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await deleteUser(id);
    const newUsers = users.filter((user) => user.id !== id);
    setFilteredUsers(newUsers);
  }

  async function handleActivateUser(id) {
    if (!window.confirm("Are you sure you want to activate this user?")) return;
    await activateUser(id);
    revalidator.revalidate();
    setFilteredUsers(users);
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col"></div>
        <h3>Users</h3>
        {!users && <p>No user found.</p>}
        {users && (
          <>
            <div className="row mb-2">
              <div className="col-md-6 col-xl-3">
                <SearchForm users={users} setFilteredUsers={setFilteredUsers} />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col">
                <Link className="btn btn-sm btn-secondary" to="/users/new">
                  New user
                </Link>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Fullname</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Active</th>
                      <th scope="col">Admin</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <User
                        handleDeleteUser={handleDeleteUser}
                        handleActivateUser={handleActivateUser}
                        user={user}
                        key={user.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
