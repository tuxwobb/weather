import { useState, useEffect } from "react";
import Posts from "./Posts";
import SearchBar from "./components/SearchBar";
import { getPosts } from "../http";

export default function Blog() {
  const [filterText, setFilterText] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setIsError(null);
      setIsLoading(true);
      try {
        const data = await getPosts();
        setBlogPosts(data);
      } catch {
        setIsLoading(false);
        setIsError({ message: "Error while fetching cities" });
      }
    }
    fetchPosts();
    setIsLoading(false);
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h3>Blog</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <SearchBar filterText={filterText} setFilterText={setFilterText} />
        </div>
      </div>

      {isLoading && (
        <div className="row">
          <div className="col">
            <p>Loading...</p>
          </div>
        </div>
      )}
      {isError && (
        <div className="row">
          <div className="col">
            <p>{isError.message}</p>
          </div>
        </div>
      )}
      {!isLoading && !isError && blogPosts.length > 0 && (
        <div className="row">
          <Posts filterText={filterText} blogPosts={blogPosts} />
        </div>
      )}
    </div>
  );
}
