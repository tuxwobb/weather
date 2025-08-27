export default function SearchBar({ filterText, setFilterText }) {
  return (
    <input
      onChange={(e) => {
        setFilterText(e.target.value.toLowerCase());
      }}
      className="form-control form-control-sm me-2"
      type="search"
      placeholder="Search..."
      aria-label="Search"
      value={filterText}
    />
  );
}
