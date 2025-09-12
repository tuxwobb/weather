import { Link } from "react-router-dom";

export default function User({
  user,
  handleDeleteUser,
  handleActivateUser,
  handleAdminUser,
  isAdmin,
}) {
  return (
    <>
      <tr>
        <td>{user.fullname}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.active ? "Yes" : "No"}</td>
        <td>{user.admin ? "Yes" : "No"}</td>
        <td>
          {!isAdmin && <>admin only</>}
          {isAdmin && user.id !== 1 && (
            <>
              <Link
                to={`/users/${user.id}/edit`}
                type="button"
                className="btn btn-sm btn-secondary"
              >
                Edit
              </Link>{" "}
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => {
                  handleDeleteUser(user.id);
                }}
              >
                Delete
              </button>{" "}
              {!user.active && (
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    handleActivateUser(user.id);
                  }}
                >
                  Activate
                </button>
              )}{" "}
              {!user.admin && (
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    handleAdminUser(user.id);
                  }}
                >
                  Admin
                </button>
              )}{" "}
            </>
          )}
        </td>
      </tr>
    </>
  );
}
