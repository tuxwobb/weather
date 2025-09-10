import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Posts from "./Posts";
import { getAuthToken } from "../auth";

export default function Blog() {
  const [filterText, setFilterText] = useState("");
  const blogPosts = useLoaderData();
  const loggedIn = getAuthToken() ? true : false;

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h3>Blog</h3>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-3">
          <SearchBar filterText={filterText} setFilterText={setFilterText} />
        </div>
      </div>

      {loggedIn && (
        <div className="row">
          <div className="col-3">
            <Link className="btn btn-sm btn-secondary" to="/blog/new">
              New post
            </Link>
          </div>
        </div>
      )}

      <div className="row">
        <Posts filterText={filterText} blogPosts={blogPosts} />
      </div>
    </div>
  );
}
