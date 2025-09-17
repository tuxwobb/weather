import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { checkRole } from "../helpers";
import Error from "../error/Error";
import { getRoles, editUserRoles, getMe } from "../http";

export default function UserRoles() {
  const [roles, setRoles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const usr = useLoaderData();
  const { user, login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    async function getAllRoles() {
      setIsLoading(true);
      const allRoles = await getRoles();
      setRoles(allRoles);
      setIsLoading(false);
    }
    getAllRoles();
  }, []);

  if (!checkRole(user, "admin")) {
    return <Error message="You do not have permissions to see the content." />;
  }

  async function handle_submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user_id = formData.get("id");
    const roles = [];
    for (const key of formData.keys()) {
      if (key !== "csrf_token" && key !== "id") {
        roles.push({ user_id: user_id, role_id: key });
      }
    }

    const resData = await editUserRoles(user_id, roles);

    const user = await getMe();
    await login(user, localStorage.getItem("token"));

    return navigate(`/users`);
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h3>{usr.fullname}</h3>
          <p>{usr.email}</p>
          <hr />
          {isLoading && <p>Loading...</p>}
          {!isLoading && !roles && <p>No roles</p>}
          {!isLoading && roles && (
            <form method="post" onSubmit={(e) => handle_submit(e)}>
              {roles.map((role, index) => (
                <p key={index}>
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    name={role.id}
                    id={role.id}
                    defaultChecked={usr.roles.some((u) => role.name === u.name)}
                  />
                  <label htmlFor={role.name}>{role.name}</label>
                  <input type="text" name="id" defaultValue={usr.id} hidden />
                </p>
              ))}
              <p>
                <button type="submit" className="btn btn-sm btn-secondary me-2">
                  Save
                </button>
                <button
                  className="btn btn-sm btn-light me-2"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
