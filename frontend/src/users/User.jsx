import { Link } from "react-router-dom";
import { checkRole } from "../helpers";
import { useAuth } from "../AuthProvider";
import Error from "../error/Error";

export default function User({ usr, handleDeleteUser, handleActivateUser }) {
  const { user } = useAuth();

  if (!checkRole(user, "admin")) {
    return <Error message="You do not have permissions to see the content." />;
  }

  return (
    <>
      <tr>
        <td>{usr.id}</td>
        <td>{usr.fullname}</td>
        <td>{usr.username}</td>
        <td>{usr.email}</td>
        <td>{usr.active ? "Yes" : "No"}</td>
        <td>
          <Link
            to={`/users/${usr.id}/roles`}
            type="button"
            className="btn btn-sm btn-light"
          >
            {usr.roles.length}
          </Link>
        </td>
        <td>
          <>
            <Link
              to={`/users/${usr.id}/edit`}
              type="button"
              className="btn btn-sm btn-secondary"
            >
              Edit
            </Link>{" "}
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => {
                handleDeleteUser(usr.id);
              }}
            >
              Delete
            </button>{" "}
            {!usr.active && (
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={() => {
                  handleActivateUser(usr.id);
                }}
              >
                Activate
              </button>
            )}
          </>
        </td>
      </tr>
    </>
  );
}
