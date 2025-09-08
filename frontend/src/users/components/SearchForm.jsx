export default function SearchForm({ users, setFilteredUsers }) {
  return (
    <input
      className="form-control form-control-sm"
      type="search"
      placeholder="Search..."
      aria-label="Search"
      onChange={(e) => {
        setFilteredUsers(
          users.filter(
            (user) =>
              user.fullname
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
              user.username
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
              user.email.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      }}
    />
  );
}
