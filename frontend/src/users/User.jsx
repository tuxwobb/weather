export default function User({ user }) {
  return (
    <>
      <tr>
        <td>{user.fullname}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.active ? "Yes" : "No"}</td>
        <td>{user.admin ? "Yes" : "No"}</td>
      </tr>
    </>
  );
}
