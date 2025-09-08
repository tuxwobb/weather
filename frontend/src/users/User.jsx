import { Link } from "react-router-dom";

export default function User({ user, handleDeleteUser }) {
  return (
    <>
      <tr>
        <td>{user.fullname}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.active ? "Yes" : "No"}</td>
        <td>{user.admin ? "Yes" : "No"}</td>
        <td>
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
          </button>
        </td>
      </tr>
    </>
  );
}
